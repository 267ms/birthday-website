# A Little Surprise — Birthday Website

A small, personal birthday website. It walks through a loading screen, a
birthday card, a one-photo-at-a-time slideshow of memories, a final
handwritten-style message, and a confetti ending — all in plain HTML, CSS,
and JavaScript. No frameworks, no installs.

## 1. What this is

Four files make up the whole site:

```
birthday-website/
├── index.html      → the page structure
├── style.css        → all the visual styling
├── script.js         → the logic (this is where you personalize things)
├── README.md          → this file
├── images/              → put the birthday person's photos here
└── music/                 → put an optional song here
```

## 2. How to open it

Just double-click `index.html`, or drag it into a browser tab (Chrome,
Safari, Edge — anything modern works). No server or install needed.

If you want to open it from your phone, put the whole `birthday-website`
folder somewhere like Google Drive or a USB drive, download it to the
phone, and open `index.html` from a file manager app.

## 3. Where to put photos

Add the birthday person's photos into the `images/` folder. Six sample
placeholder images are already in there so you can see the site working —
replace them with real photos whenever you're ready.

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`.

## 4. How to rename or add photos

Open `script.js` and find this section near the top:

```js
const photos = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
];
```

- To use different filenames, change the text inside the quotes.
- To add more photos, add more lines in the same format.
- To remove a photo, delete its line.
- The order in the list is the order they'll play in.

## 5. Where to add music

Put one audio file named `birthday-song.mp3` inside the `music/` folder.
The music button (top-right corner) lets the visitor start it — browsers
don't allow websites to play sound automatically, so it always starts
from a click, either the "Open Your Surprise" button or the music button
itself.

If you don't want music, just leave the `music/` folder empty — the
button will simply do nothing if there's no file to play, so nothing
will break.

## 6. How to change the birthday person's name

In `script.js`:

```js
const birthdayName = "Your Friend Name";
```

Change the text between the quotes.

## 7. How to change the birthday message

Also in `script.js`, near the top:

```js
const cardGreeting = "I made you something small, just for today.";
```
This is the short line that types itself out on the first card.

```js
const birthdayMessage = `
Some people make ordinary moments feel special...
`;
```
This is the longer final letter, shown after the photo slideshow. Write
it however you like — a blank line becomes a paragraph break.

## 8. How to change the slideshow speed

Still in `script.js`:

```js
const PHOTO_DURATION = 1000;       // how long each photo stays, in ms
const TRANSITION_DURATION = 500;   // how long the fade between photos takes, in ms
```

1000ms = 1 second. Raise `PHOTO_DURATION` for a slower, calmer slideshow
(try 1800 or 2200), or lower it for something snappier.

## 9. How to change colors

Open `style.css` and look at the very top, inside `:root { ... }`:

```css
--bg-deep: #1b1022;   /* base background */
--accent: #e3a75c;    /* warm gold accent */
--rose: #d99a95;      /* dusty rose accent */
```

Changing these hex codes updates the color everywhere it's used —
buttons, glows, the progress bar, and the ending screen all pull from
the same few values.

## 10. Project folder structure

```
birthday-website/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
├── images/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
│
└── music/
    └── birthday-song.mp3
```

That's it — three files to edit (`script.js` for content, `style.css`
for color, and the `images`/`music` folders for media), and one file to
open (`index.html`).
