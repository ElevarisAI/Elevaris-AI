## Goal
Generate proper favicon files from the existing `public/favicon.png` (currently 810x810) so Google's favicon crawler can pick up your branded icon and replace the globe.

## Why this helps
Google's favicon crawler prefers a square icon at standard sizes (48x48 multiples), reachable at a stable URL, and ideally a `favicon.ico` at the site root as a fallback. Right now you only ship a single 810KB PNG, which works for browser tabs but isn't ideal for Google.

## Changes

1. From the existing `public/favicon.png`, generate optimized assets:
   - `public/favicon.ico` — multi-resolution (16, 32, 48) ICO file at site root
   - `public/favicon-32.png` — 32x32 PNG
   - `public/favicon-192.png` — 192x192 PNG (Android / Google)
   - `public/favicon-512.png` — 512x512 PNG (PWA / large displays)
   - `public/apple-touch-icon.png` — 180x180 PNG

2. Update `index.html` `<head>` to reference all of the above with proper `sizes` and `type` attributes, keeping a cache-busting `?v=4`.

3. Leave `robots.txt` as is (already allows Googlebot).

## After deploy
Google can take days to weeks to refresh the search-result favicon. You can speed it up by requesting a recrawl of your homepage in Google Search Console once the new files are live.

## Technical notes
- ICO will be generated with ImageMagick from the source PNG.
- All files written to `public/` so they're served at the site root.
- No component or design changes.
