"""Photographs for notshant.xyz: resize camera JPEGs and upload them to Cloudflare R2.

Spec: design/system.md → Content structure → Photographs. Runbook: docs/domain-dns-and-photo-hosting.md.

Setup, once:   python3 -m venv .venv && .venv/bin/pip install Pillow
               aws configure --profile r2        (keys from Cloudflare → R2 → API tokens; never commit them)

make     .venv/bin/python scripts/photos.py make <series-folder> <photo or folder>...
         Writes three sizes of each photo to .photos-build/<series-folder>/ and prints draft YAML entries.
         Folders are read in capture-time order; single photos keep the order given. Each file is named after
         the camera's file name (DSCF1229.JPG → dscf1229.jpg), so a name never changes when photos are
         added, removed or reordered. That matters: R2 files are cached for a year.
           dscf1229-s.jpg   720px long edge    grid thumbnails
           dscf1229.jpg    1600px long edge    viewer on ordinary screens
           dscf1229-l.jpg  3200px long edge    viewer on large and high-resolution screens
         All metadata is dropped (EXIF, GPS, camera serial, maker notes); the photo is rotated upright first.

upload   .venv/bin/python scripts/photos.py upload <series-folder>
         Copies .photos-build/<series-folder>/ to the bucket, with a one-year immutable cache header.
"""
import subprocess
import sys
from fractions import Fraction
from pathlib import Path

from PIL import Image, ImageOps

BUCKET = "notshant-photos"
ENDPOINT = "https://923afb037abddcf315d1eeaeb1854434.r2.cloudflarestorage.com"  # account ID, not a secret
PROFILE = "r2"
BUILD = Path(__file__).resolve().parent.parent / ".photos-build"
SIZES = [("-s", 720, 82), ("", 1600, 84), ("-l", 3200, 84)]  # suffix, long edge, JPEG quality


def taken(path):
    with Image.open(path) as im:
        return im.getexif().get_ifd(0x8769).get(0x9003) or "", path.name  # DateTimeOriginal, then name


def sources(args):
    for a in map(Path, args):
        if a.is_dir():
            yield from sorted((p for p in a.iterdir() if p.suffix.lower() in (".jpg", ".jpeg")), key=taken)
        else:
            yield a


def ratio(w, h):
    f = Fraction(w, h).limit_denominator(12)
    return f"{f.numerator} / {f.denominator}"


def make(series, args):
    out = BUILD / series
    out.mkdir(parents=True, exist_ok=True)
    for src in sources(args):
        stem = src.stem.lower()
        with Image.open(src) as im:
            icc = im.info.get("icc_profile")
            im = ImageOps.exif_transpose(im).convert("RGB")
            for suffix, edge, quality in SIZES:
                if suffix == "-l" and max(im.size) < edge:
                    continue  # no upscaling: small originals simply have no large size
                copy = im.copy()
                copy.thumbnail((edge, edge), Image.Resampling.LANCZOS)
                kw = {"quality": quality, "optimize": True, "progressive": True}
                if icc:
                    kw["icc_profile"] = icc
                copy.save(out / f"{stem}{suffix}.jpg", "JPEG", **kw)
            print(f'    - {{ file: "{stem}", ratio: "{ratio(*im.size)}", alt: "", place: "" }}')


def upload(series):
    src = BUILD / series
    if not src.is_dir():
        sys.exit(f"nothing to upload: {src} doesn't exist (run make first)")
    subprocess.run(["aws", "s3", "sync", str(src), f"s3://{BUCKET}/{series}/", "--profile", PROFILE,
                    "--endpoint-url", ENDPOINT, "--size-only", "--exclude", ".*",
                    "--content-type", "image/jpeg", "--cache-control", "public, max-age=31536000, immutable"],
                   check=True)


if __name__ == "__main__":
    if len(sys.argv) >= 4 and sys.argv[1] == "make":
        make(sys.argv[2], sys.argv[3:])
    elif len(sys.argv) == 3 and sys.argv[1] == "upload":
        upload(sys.argv[2])
    else:
        sys.exit(__doc__)
