/*
 * notshant tokens for Tailwind (theme.extend). Mirrors design/tokens.css — change both together.
 * Everything is namespaced under `ns` so it never overrides Tailwind defaults:
 *   text-ns-ink, text-ns-muted, border-ns-rule, bg-ns-surface, ring-ns-accent,
 *   max-w-ns-measure, max-w-ns-container, font-ns, font-ns-mono, rounded-ns-sm, …
 */
module.exports = {
    colors: {
        ns: {
            bg: '#FFFFFF',
            ink: '#1C1C1C',
            'ink-2': '#4A4A4A',
            muted: '#6B6B6B',
            faint: '#9AA5A2',
            rule: '#ECECEC',
            surface: '#F5F8F7',
            'surface-photo': '#EEF1F0',
            dot: '#C9D4D1',
            accent: '#2E9C83',
            'mint-light': '#9EDDCB',
            'mint-wash': '#D9F5EC',
        },
    },
    fontFamily: {
        ns: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        'ns-mono': ['ui-monospace', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
    },
    fontSize: {
        'ns-xs': ['12px', '1.4'],
        'ns-sm': ['13px', '1.5'],
        'ns-meta': ['14px', '1.5'],
        'ns-h2': ['15px', '1.4'],
        'ns-body': ['16px', '1.65'],
        'ns-prose': ['17px', '1.7'],
        'ns-intro': ['20px', '1.45'],
    },
    maxWidth: {
        'ns-measure': '600px',
        'ns-container': '1120px',
    },
    borderRadius: {
        'ns-sm': '6px',
        'ns-md': '12px',
        'ns-lg': '20px',
    },
}
