# Octaneon Settings Redesign — mockup

Clickable before-and-after of the proposed console cleanup: Content Upload, Generation and Calendar become one page, Topics gets a cleaner layout, Settings goes from 13 pages to 7, and every log moves to a new Activity & Logs page. Static
HTML, CSS and JavaScript with no build step and no dependencies. All data is made up.

## Views

- **Overview**: the summary and a map of where every current page goes
- **Today**: hand-built copies of the current console (in `legacy/`), rebuilt from the real app's code and styling with sample data. Rendered in a frame with the Tailwind v4 browser runtime, so it needs an internet connection.
- **Proposed**: the new pages, fully laid out, with working tabs, filters and pagination

The speech-bubble button in the top bar shows or hides presenter notes. The sun/moon
button switches between light and dark.

Each view has its own link, so you can open a specific slide directly, for example
`/#/proposed/captions/youtube` or `/#/proposed/brand/look`.

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server` and visit
http://localhost:8000.

## Deploy to Vercel

Push this folder to a GitHub repo, import it at vercel.com/new, choose Framework preset
**Other**, and leave the build command empty. Or run `vercel` from this folder.
# demo-mockup
