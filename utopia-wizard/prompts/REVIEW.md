# Review

Run after the build. Strict on purpose: this pass exists to catch the specific ways an ambitious build still ends up looking generated.

## Copy-ready prompt

```text
You are reviewing an implemented UI against the Utopia system. Be specific and
mechanical. Do not flatter the work. Every finding must name a file and a line
or a screen position, and state the fix.

MODE: [review only | review and repair]

=============================================================================
PASS 1 — THE SCRIPT
=============================================================================

Run:
  node tools/audit.mjs <project-dir>

Every error must be fixed. Warnings are judgment calls — resolve or justify
each one explicitly.

If the tool is unavailable, run these greps. All must return nothing:

  rg -i "linear-gradient|radial-gradient|conic-gradient|bg-gradient-to"
  rg -i "lorem ipsum|placeholder text|your text here"
  rg "transition: ?all|outline: ?none"
  rg "console\.log"
  rg -i "blob|glassmorph|backdrop-filter"

=============================================================================
PASS 2 — MEASURED, NOT ESTIMATED
=============================================================================

Open the page and run this in the console. It reports the real rendered
contrast of every text node against its actual painted background, and any
gradient that reached the page. Paste the output into your report.

  (() => {
    const lum = (rgb) => {
      const [r,g,b] = rgb.match(/\d+/g).slice(0,3).map(n => {
        const c = n/255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
      });
      return 0.2126*r + 0.7152*g + 0.0722*b;
    };
    const bgOf = (el) => {
      let n = el;
      while (n && n !== document.documentElement) {
        const bg = getComputedStyle(n).backgroundColor;
        if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) return bg;
        n = n.parentElement;
      }
      return 'rgb(255,255,255)';
    };
    const ratio = (a,b) => { const [x,y]=[lum(a),lum(b)].sort((m,n)=>n-m); return (x+0.05)/(y+0.05); };

    const contrastFails = [], gradients = [], tooWide = [], smallTargets = [];

    for (const el of document.querySelectorAll('h1,h2,h3,h4,p,a,span,td,th,li,caption,strong,button')) {
      if (!el.textContent.trim() || el.children.length) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const r = ratio(cs.color, bgOf(el)), size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
      if (r < (large ? 3 : 4.5)) contrastFails.push({ text: el.textContent.trim().slice(0,34), ratio: +r.toFixed(2), px: Math.round(size) });
    }
    for (const el of document.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (/gradient\(/i.test(cs.backgroundImage + cs.maskImage + cs.borderImage)) gradients.push(el.tagName + '.' + el.className);
      const r = el.getBoundingClientRect();
      if (r.width > window.innerWidth + 1 && !el.closest('.marquee') && !el.closest('[class*=scroll]')) tooWide.push(el.tagName + '.' + String(el.className).slice(0,30));
    }
    for (const el of document.querySelectorAll('a, button')) {
      const r = el.getBoundingClientRect();
      if (r.width && r.height < 44) smallTargets.push(el.textContent.trim().slice(0,24) + ' ' + Math.round(r.height) + 'px');
    }
    return { contrastFails, gradients, tooWide, smallTargets,
             horizontalScroll: document.documentElement.scrollWidth > window.innerWidth,
             fontFamilies: [...new Set([...document.querySelectorAll('*')].map(e => getComputedStyle(e).fontFamily.split(',')[0]))] };
  })()

Run it twice: once at 1440px, once at 390px. Both must come back clean.

Note: if the page is in a preview that is not compositing frames, transitions
freeze mid-way and computed styles will look wrong. Inject
`*{transition:none!important;animation:none!important}` first, then toggle the
class you are testing, to read the true end state.

=============================================================================
PASS 3 — WHAT A SCRIPT CANNOT SEE
=============================================================================

Score each 0–10. Anything under 7 is a finding with a required fix.

  Opening         Does the first screen say what this is in under 5 seconds?
  Template smell  Cover the color with your hand. Is any section still
                  recognizable as a stock layout?
  Asymmetry       Count symmetric sections. More than half is a fail.
  Restraint       Exactly 3 signature effects, or did tricks accumulate?
  The peak        Is there one clear loudest moment, and is the section after
                  it genuinely still?
  Type            Two families, 4 weights or fewer, line length under 75ch,
                  negative tracking only on large sizes?
  Color discipline  Any hex outside the 11 tokens? Accent under ~10% of
                  painted area?
  Copy            Anything invented — statistics, testimonials, awards? Any
                  supplied copy altered?
  Mobile          Is it designed, or is it the desktop layout stacked?

=============================================================================
PASS 4 — BEHAVIOR
=============================================================================

  - JavaScript disabled: is all content present and readable?
  - OS reduced motion on: nothing hidden, nothing looping, no content that
    only appears after an animation?
  - Scroll to the bottom and back up: does anything re-trigger or accumulate?
  - Tab from the top: focus visible at every stop, nothing trapped, skip link
    present and working?
  - Console after interaction, not just on load: clean?
  - Observers, listeners, intervals, and animation frames: all torn down?
    In React, does every useEffect return its cleanup?
  - Next.js: any hydration warning? Any window/document access during render?
    Is SEO-critical copy server-rendered?

=============================================================================
SEVERITY
=============================================================================

CRITICAL  build or runtime failure · a gradient anywhere · supplied copy
          altered · main content unreadable · mobile unusable · hydration crash

HIGH      still reads as a template · missing reduced-motion · contrast failure
          · horizontal scroll · animation leak · more than 3 effects · color
          outside the tokens · invented facts presented as real

MEDIUM    weak section transition · inconsistent spacing or type · a section
          that adds nothing · duplicated motion logic · generic imagery

LOW       polish, naming, minor hover and focus refinements

=============================================================================
REPAIR
=============================================================================

If mode is "review and repair": fix CRITICAL and HIGH first, then MEDIUM where
the fix is low-risk. Stay inside the original scope. Never alter preserved
copy. Do not add dependencies. Re-run pass 1 and pass 2 after repairing.

If a fix needs scope the brief did not grant, report it instead of doing it.

=============================================================================
OUTPUT
=============================================================================

  1. Verdict: ship / revise / reject
  2. Audit and console-probe output, verbatim
  3. Scorecard: the nine dimensions from pass 3, one sentence each
  4. Findings, ordered by severity, each with file, line, and fix
  5. Repairs made, if any
  6. What you ran and at which viewport widths
  7. What you could not verify, stated plainly

Do not report a check you did not run. "Looks fine" is not a review.
```
