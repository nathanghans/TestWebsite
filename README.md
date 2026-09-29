# Beaver &amp; the Tree

A little animated intro that hides the real page behind a scene: a beaver
walks in from the right, crosses to a tree on the left, chops it down, and
once it topples the scene fades away to reveal the page underneath.

## How it works

- **`index.html`** &mdash; two layers: the `#intro` scene (sky, ground, tree,
  beaver) sitting on top, and the `<main id="page">` content underneath it.
  The page content is just a placeholder &mdash; swap it for whatever you
  actually want the site to show.
- **`styles.css`** &mdash; the scene's look (CSS gradients/shapes for the sky,
  clouds, ground, tree and stump) plus the animation keyframes: walking bob
  and leg-swing, the axe-chop swing, the tree shake, the tree fall, and the
  fade-out reveal.
- **`script.js`** &mdash; orchestrates the timeline by toggling classes at the
  right moments: `walking` &rarr; `chopping` (with the tree `hit` and wood
  `chip`s popping) &rarr; `falling` (tree topples, beaver `dodge`s back,
  stump appears) &rarr; fading `#intro` out and unlocking page scroll.

## Try it

Open `index.html` in a browser and click anywhere to start the sequence.
Once revealed, the placeholder page has a **Replay the intro** button that
resets and re-runs the whole animation.

## Customizing

- **Timing**: the constants at the top of `script.js`
  (`WALK_MS`, `CHOP_MS`, `FALL_MS`, `FADE_MS`) must match the corresponding
  CSS transition/animation durations if you change either side.
- **Tree/beaver position**: `.tree-spot` in `styles.css` controls where the
  tree sits (`left`/`bottom`); the beaver's walk target is computed in
  `script.js` from the tree's position, so it stays in sync automatically.
- **Page content**: everything inside `<main id="page">` in `index.html` is
  yours to replace.
