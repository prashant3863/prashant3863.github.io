# Photo collections: one page per collection in _data/photos.yml, at /photos/<slug>/, rendered by
# _layouts/photo-collection.html. Adding a collection to photos.yml is all it takes; there's no page file to write.
# Spec: design/system.md → Photographs.
#
# It also works out, for each collection, the fields the templates use (they are not written in photos.yml):
#   url     /photos/<slug>/
#   count   how many photos it holds
#   covers  up to four photos for its preview on /photos/: those marked `cover: true`, else the first four.
#           Each is { "src" => the 720px file, "alt" => … }.
# Runs in GitHub Actions (`bundle exec jekyll build`), not GitHub's safe-mode Pages build, so plugins are allowed.
module Notshant
  class PhotoCollections < Jekyll::Generator
    safe true
    priority :high

    def generate(site)
      base = site.config["photos_url"]
      (site.data["photos"] || []).each do |c|
        shots = c["series"].flat_map do |s|
          photos = s["stops"] ? s["stops"].flat_map { |st| st["photos"] } : s["photos"]
          photos.map { |ph| [s, ph] }
        end
        picked = shots.select { |_, ph| ph["cover"] }
        picked = shots if picked.empty?

        c["url"] = "/photos/#{c["slug"]}/"
        c["count"] = shots.size
        c["covers"] = picked.first(4).map do |s, ph|
          { "src" => "#{base}/#{s["folder"]}/#{ph["file"]}-s.jpg", "alt" => ph["alt"] }
        end

        s, ph = picked.first
        page = Jekyll::PageWithoutAFile.new(site, site.source, File.join("photos", c["slug"]), "index.html")
        page.data.merge!(
          "layout" => "photo-collection",
          "photo_collection" => c["slug"],
          "title" => "#{c["title"]} · Photographs",
          "description" => c["intro"] || "Photographs by Prashant Mittal: #{c["title"]}.",
          "image" => "#{base}/#{s["folder"]}/#{ph["file"]}.jpg",   # the link preview when it's shared
          "nav" => "photos",
          "ns_js" => ["photos"]
        )
        site.pages << page
      end
    end
  end
end
