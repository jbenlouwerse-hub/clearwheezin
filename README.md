# Clearwheezin website

Static site for Clearwheezin’ hosted with GitHub Pages.

## Gallery workflow

Recommended image structure for future photo galleries:

```text
assets/gallery/2026/2026-001-start-line.jpg
assets/gallery/2026/2026-002-hill-climb.jpg
assets/gallery/2027/2027-001-lodge-patio.jpg
```

Use lowercase `.jpg` names and resize images before upload. A good target is 1600 to 2000 pixels wide and under 500 KB to 1 MB per image.

After uploading a new photo, add it to `gallery-data.js` with its year, image path, caption, and alt text. The gallery page will group photos by year automatically.
