// LoomWatch landing page: one story, the Bake sale team. You hire the team from its cards (the tray
// reads it back), watch the live crew pass the job along, and see what it makes, how it learns, the
// Mac it lives on and how to start. No dependencies, no network calls but the page's own files, and
// the static page stays readable without it.
(() => {
  'use strict'

  const root = document.documentElement
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const SVG = 'http://www.w3.org/2000/svg'
  const $ = (sel, from = document) => from.querySelector(sel)
  const $$ = (sel, from = document) => [...from.querySelectorAll(sel)]
  const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))
  const lerp = (a, b, t) => a + (b - a) * t
  const store = {
    get(key) { try { return window.localStorage.getItem(key) } catch { return null } },
    set(key, value) { try { window.localStorage.setItem(key, value) } catch { /* private window */ } },
  }
  function el(tag, attrs = {}, ...kids) {
    const node = tag.startsWith('svg:') ? document.createElementNS(SVG, tag.slice(4)) : document.createElement(tag)
    for (const [key, value] of Object.entries(attrs)) {
      if (value === false || value === null || value === undefined) continue
      if (key === 'text') node.textContent = value
      else if (key.startsWith('on')) node.addEventListener(key.slice(2), value)
      else node.setAttribute(key, value === true ? '' : value)
    }
    for (const kid of kids.flat()) if (kid !== null && kid !== undefined && kid !== false) node.append(kid)
    return node
  }
  const touchOnly = window.matchMedia('(hover: none)').matches

  /* ================================================================ Theme and progress */

  const themeButton = $('#theme')
  function applyTheme(theme) {
    root.dataset.theme = theme
    themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme')
    $('#cord-tag').lastChild.textContent = theme === 'dark' ? ' to turn the light on' : ' to turn the light off'
    $('meta[name="theme-color"]').content = theme === 'dark' ? '#08080A' : '#FAF8F3'
  }
  // The theme is a lamp (the button is its bulb, and it has a pull cord, below): switched, the new
  // theme spreads out from the bulb across the page, as a room fills when a lamp comes on.
  function switchTheme() {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
    store.set('loomwatch-site-theme', next)
    if (reduced || !document.startViewTransition) { applyTheme(next); return }
    const bulb = themeButton.getBoundingClientRect()
    const x = bulb.left + bulb.width / 2
    const y = bulb.top + bulb.height / 2
    const reach = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    document.startViewTransition(() => applyTheme(next)).ready.then(() => {
      root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${reach}px at ${x}px ${y}px)`] }, { duration: 640, easing: 'cubic-bezier(.3, 0, .2, 1)', pseudoElement: '::view-transition-new(root)' })
    }, () => { /* skipped by the next switch */ })
  }

  const progress = $('.progress')
  let progressQueued = false
  function paintProgress() {
    progressQueued = false
    const max = root.scrollHeight - window.innerHeight
    progress.style.setProperty('--read', max > 0 ? clamp(window.scrollY / max).toFixed(4) : '0')
  }
  window.addEventListener('scroll', () => { if (!progressQueued) { progressQueued = true; window.requestAnimationFrame(paintProgress) } }, { passive: true })

  /* ================================================================ Live figures */

  // The figures are the app's own (ui/src/site/landingLive.ts, built into assets/live/live.js with
  // three.js): the crew in "Then they work together" and the figure on the lamp's cord. The module
  // loads only where the browser can draw WebGL 2 (canDraw); everywhere else, and where a scene can't
  // make its WebGL context, the still pictures under the canvases stay, and the page works. Nor does
  // any of it load where the connection asks to save data or says it is slow (thrifty), or in reduced
  // motion, where the crew and the cord's figure stand still: their files would draw what the
  // pictures show.
  // Found once, when a scene is about to load (the page loaded and idle), by making a WebGL 2 context
  // (three.js draws with nothing less), which is let go at once.
  let drawable = null
  const canDraw = () => {
    if (drawable === null) {
      try {
        const gl = document.createElement('canvas').getContext('webgl2')
        drawable = Boolean(gl)
        gl?.getExtension('WEBGL_lose_context')?.loseContext()
      } catch { drawable = false }
    }
    return drawable
  }
  // navigator.connection, where the browser has it (Chrome, Edge, Android): data saver on, or a
  // connection it measures as 3G or slower.
  const thrifty = Boolean(navigator.connection?.saveData) || ['slow-2g', '2g', '3g'].includes(navigator.connection?.effectiveType)
  // Each build's one-body figure and its wardrobe, smaller than the app's and with only what the crew
  // and the cord's figure wear (site/build.sh, scripts/site-glb.mjs).
  const CREW_FILES = 'assets/live/crew/'
  let live = null
  const loadLive = () => {
    return (live ||= canDraw() ? import('./assets/live/live.js') : Promise.reject(new Error('WebGL 2 is off')))
  }
  // Two frames along: in a task of its own, after what was asked of the screen before it.
  const nextPaint = () => new Promise((resolve) => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)))
  // A scene's files (live.js with three.js, and the figures' models, megabytes) come down only once
  // its section is near the screen (within 200 px of it) and the page is idle: it has loaded, and the
  // browser has a moment (or two seconds have gone by). Until then, and where they never come, the
  // scene's still picture stands in, and the page needs none of them.
  const pageLoaded = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', () => resolve(), { once: true })
  })
  const idle = () => new Promise((resolve) => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => resolve(), { timeout: 2000 })
    else window.setTimeout(resolve, 300)
  })
  // The live scenes in the order they come: the crew, then the cord's figure. They make their WebGL
  // contexts and ready their shaders one at a time, each once the one before it has drawn (its
  // load()) and the page is idle again; of those near the screen then, the first in this order.
  const liveScenes = []
  let mounting = false
  function nextScene() {
    if (mounting) return
    mounting = true
    pageLoaded.then(idle).then(() => {
      const scene = liveScenes.find((each) => each.near && !each.started)
      if (!scene) { mounting = false; return }
      scene.started = true
      scene.watch?.disconnect()
      return scene.mount().catch(scene.failed).finally(() => { mounting = false; nextScene() })
    })
  }
  // A scene whose files come down once `box` is near the screen and the page idle (mount), or whose
  // picture stays if they don't (failed). Near is where it is then: a page opened further down, which
  // the browser scrolls to after its first look, doesn't count the first screen's scenes as near.
  // Unless `wanted`, its picture stays and nothing is asked for.
  function liveScene(box, mount, failed, wanted = true) {
    if (!wanted) { failed(); return }
    const scene = { near: !('IntersectionObserver' in window), started: false, mount, failed, watch: null }
    liveScenes.push(scene)
    if (scene.near) { nextScene(); return }
    scene.watch = new IntersectionObserver((entries) => {
      scene.near = entries.at(-1).isIntersecting
      if (scene.near) nextScene()
    }, { rootMargin: '200px 0px' })
    scene.watch.observe(box)
  }

  // Draw a stage only while it can be seen, and size its canvas to it.
  function stageOf(box, scene) {
    let seen = false
    const sync = () => { if (seen && document.visibilityState === 'visible') scene.start(); else scene.stop() }
    new ResizeObserver(([entry]) => { if (entry) scene.resize(entry.contentRect.width, entry.contentRect.height) }).observe(box)
    new IntersectionObserver(([entry]) => { seen = Boolean(entry?.isIntersecting); sync() }).observe(box)
    document.addEventListener('visibilitychange', sync)
  }
  const local = (event, canvas) => { const r = canvas.getBoundingClientRect(); return [event.clientX - r.left, event.clientY - r.top] }
  // A label centred on a point of the picture, kept inside its stage so none runs off an edge.
  // Returns where its centre went.
  function placeTag(tag, at, stage) {
    const half = tag.offsetWidth / 2
    const x = clamp(at.x, half + 6, Math.max(half + 6, stage.clientWidth - half - 6))
    tag.style.transform = `translate(${x.toFixed(1)}px, ${at.y.toFixed(1)}px)`
    return x
  }

  /* ================================================================ 2 · Then they work together */

  // Six agents, each its build's one-body figure in its colour, dressed from the app's wardrobe, as
  // the app draws them, with no job sign. Point at one and it waves. Their stills (assets/crew/<id>.webp)
  // are drawn from the same builds, colours and clothes: keep the two alike.
  const CREW = [
    { id: 'scout', name: 'Scout', does: 'stands by today', figure: { kind: 'chubby', color: 'clay', wear: ['trench_coat', 'beret'] } },
    { id: 'writer', name: 'Writer', does: 'drafts the deck', figure: { kind: 'tall', color: 'sky', wear: ['striped_top', 'coffee'] } },
    { id: 'editor', name: 'Editor', does: 'stands by today', figure: { kind: 'wide', color: 'orchid', wear: ['cardigan', 'collar'] } },
    { id: 'checker', name: 'Checker', does: 'checks every fact', figure: { kind: 'little', color: 'sage', wear: ['ballet_flats', 'bow'] } },
    { id: 'researcher', name: 'Researcher', does: 'finds the hall’s details', figure: { kind: 'egg', color: 'rose', wear: ['black_dress', 'collar'] } },
    { id: 'planner', name: 'Planner', does: 'plans the bake sale', figure: { kind: 'slim', color: 'lilac', wear: ['striped_top', 'gloves'] } },
  ]
  const crewBox = $('#crew')
  const crewCanvas = $('#crew-canvas')
  const crewTags = $('#crew-tags')
  const crewPlay = $('#crew-play')
  let crewTag = null
  let crewHover = null

  // What the crew says (ui/src/site/crewTalk.ts plays it), the Bake sale team's job passed along the
  // cord the way a team's run goes in the app, ending with the work waiting for you. The page lists
  // the same lines (index.html's .crew-script) for where the crew stands still.
  const crew = (id) => CREW.findIndex((member) => member.id === id)
  const TALK = [
    { by: crew('planner'), says: 'Researcher, can you find the hall’s details?', to: crew('researcher') },
    { by: crew('researcher'), says: 'Sunday 7 Dec, 10 to 2. Writer, over to you.', to: crew('writer') },
    { by: crew('writer'), says: 'Six slides drafted. Checker?', to: crew('checker') },
    { by: crew('checker'), says: 'Slide 1 says Saturday. The hall says Sunday.', to: 'you' },
  ]
  // The four hired take part and glow; the other two stand by, unlit.
  const STANDING_BY = [crew('scout'), crew('editor')]
  let sayEl = null
  let sayKey = ''
  // off (reduced motion, or a live.js from before talk), playing, paused or done.
  let sayStatus = 'off'
  function showSayStatus(status) {
    sayStatus = status
    crewPlay.hidden = status === 'off'
    crewPlay.dataset.status = status
    crewPlay.replaceChildren(el('span', { class: 'crew-play-icon', 'aria-hidden': 'true' }), status === 'playing' ? 'Pause' : status === 'paused' ? 'Play' : 'Play again', el('span', { class: 'sr', text: ' the crew’s conversation' }))
  }
  // One bubble at a time, over the head of the one talking: its name and words, dots while it
  // thinks, and a pill when the work waits for you. The same speaker's bubble changes in place.
  function sayBubble(talk, heads) {
    const bubble = talk?.bubble ?? null
    const key = bubble ? `${bubble.by}|${bubble.says ?? ''}|${bubble.waiting}` : ''
    if (key !== sayKey) {
      sayKey = key
      if (sayEl && (!bubble || sayEl.dataset.by !== String(bubble.by) || bubble.waiting)) { sayEl.remove(); sayEl = null }
      if (bubble) {
        if (!sayEl) sayEl = crewTags.appendChild(el('p', { class: 'crew-say', 'data-by': String(bubble.by) }))
        sayEl.classList.toggle('waiting', bubble.waiting)
        sayEl.replaceChildren(...(bubble.waiting
          ? [el('span', { class: 'say-dot' }), bubble.says]
          : [el('b', { text: CREW[bubble.by].name }), ' ', bubble.says ?? el('span', { class: 'say-dots' }, el('i'), el('i'), el('i'))]))
      }
    }
    if (!sayEl || !bubble) return
    const at = heads[bubble.by]
    // Its tail still points at the head when the bubble is held in from an edge.
    const reach = Math.max(0, sayEl.offsetWidth / 2 - 16)
    sayEl.style.setProperty('--tail', `${clamp(at.x - placeTag(sayEl, at, crewCanvas), -reach, reach).toFixed(1)}px`)
  }

  async function mountCrew() {
    const scenes = await loadLive()
    await nextPaint()
    const scene = new scenes.CrewScene(crewCanvas, CREW, {
      onHover: (index) => {
        crewHover = index
        crewTag?.remove()
        crewTag = index === null ? null : el('p', { class: 'crew-tag' }, el('b', { text: CREW[index].name }), ` ${CREW[index].does}`)
        if (crewTag) crewTags.append(crewTag)
      },
      onPick: () => {},
      onFrame: (heads, talk) => {
        if (sayStatus !== 'off') {
          sayBubble(talk, heads)
          if (talk?.done && sayStatus === 'playing') showSayStatus('done')
        }
        if (!crewTag || crewHover === null) return
        placeTag(crewTag, heads[crewHover], crewCanvas)
      },
    }, reduced, CREW_FILES)
    stageOf(crewBox, scene)
    // Scout and Editor stand by. A live.js cached from before standBy() lights all six.
    if (typeof scene.standBy === 'function') scene.standBy(STANDING_BY)
    // Each glows what it is doing, as agents do in the app, in the theme's own green, blue and gold.
    const glowColors = () => {
      const css = getComputedStyle(root)
      return { ready: css.getPropertyValue('--ok').trim(), working: css.getPropertyValue('--live').trim(), waiting: css.getPropertyValue('--accent').trim() }
    }
    scene.glowColors(glowColors())
    new MutationObserver(() => scene.glowColors(glowColors())).observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    // Their light is the lamp's: it hangs where the bulb is, wherever the page has scrolled them to,
    // so each figure's shadow falls away from it; switched off, they cast none.
    let lampQueued = false
    const hangLamp = () => {
      lampQueued = false
      const bulb = themeButton.getBoundingClientRect()
      const stage = crewCanvas.getBoundingClientRect()
      scene.lamp(bulb.left + bulb.width / 2 - stage.left, bulb.top + bulb.height / 2 - stage.top, root.dataset.theme === 'light')
    }
    const queueLamp = () => { if (!lampQueued) { lampQueued = true; window.requestAnimationFrame(hangLamp) } }
    hangLamp()
    window.addEventListener('scroll', queueLamp, { passive: true })
    window.addEventListener('resize', queueLamp)
    new MutationObserver(hangLamp).observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    // They look where you point anywhere near them, not only over their canvas.
    window.addEventListener('pointermove', (event) => { const [x, y] = local(event, crewCanvas); scene.pointerMove(x, y) }, { passive: true })
    root.addEventListener('pointerleave', () => scene.pointerMove(null, null))
    // Its lighting and figures a frame or two after its WebGL context, so the page answers between them.
    await nextPaint()
    await scene.load()
    crewBox.classList.add('live')
    // They start talking a moment after they come into view, twice through, then stop; the button
    // pauses them, and plays it again. The talk keeps the scene's clock, which stops off the screen.
    scene.talk(TALK, { delay: 1.2, loops: 2 })
    showSayStatus('playing')
    crewPlay.addEventListener('click', () => {
      if (sayStatus === 'playing') { scene.pauseTalk(); showSayStatus('paused') }
      else if (sayStatus === 'paused') { scene.playTalk(); showSayStatus('playing') }
      else { scene.talk(TALK, { delay: 0.3, loops: 1 }); showSayStatus('playing') }
    })
  }
  liveScene(crewBox, mountCrew, () => crewBox.classList.add('still'), !thrifty && !reduced)

  /* ================================================================ The lamp's pull cord */

  // A gold thread hangs from the theme button, with one more of the crew tied on the end. Pull it
  // down past the click and the light switches, as a lamp's pull cord does; let go and the switch's
  // spring draws the cord back in, and it bobs and swings. A tap is a short pull, and the button
  // still works on its own (it tugs the cord). Scrolling reels the cord up into the header with the
  // page, so it never hangs over what you read; point at the bulb and it comes back down.
  const lamp = $('#lamp')
  const cord = $('#cord')
  const cordPath = $('.cord-thread path', cord)
  const cordFigure = $('#cord-figure')
  const cordTag = $('#cord-tag')
  const LAMPLIGHTER = { id: 'lamplighter', figure: { kind: 'tall', color: 'clay', wear: ['beret'] } }
  const LINKS = 8
  const STEP = 1 / 120
  const BOX = 64 // the figure's box (styles.css)
  const PULL = 34 // how far the cord comes out of the switch
  const CLICK = 22 // and how far it comes out when the switch clicks
  const GRAVITY = 2200
  // The light is felt as it changes. Phones that can vibrate do (flip, below). A page can't buzz a
  // Mac's trackpad or an iPhone, but Safari does it for its own switch control: as the switch's
  // thumb is dragged across, and on an iPhone as it is tapped. So where Safari has one, an unseen
  // switch lies over the figure, and the figure is pulled by it. WebKit moves the thumb once the
  // pointer has gone 40% of the track from where it was pressed (anywhere, in a square switch), so
  // this one is square, laid along the pull, and long enough that a finger's thumb crosses as the
  // cord clicks (a mouse's is made to, tickMore). Nothing can buzz a Mac's click, but a trackpad's
  // click is felt anyway.
  const BUZZ = CLICK / 0.4
  const buzzSwitch = 'switch' in HTMLInputElement.prototype ? el('input', { class: 'buzz-switch', type: 'checkbox', switch: true, tabindex: '-1', style: `width: ${BUZZ}px; height: ${BUZZ}px` }) : null
  if (buzzSwitch) cord.append(buzzSwitch)
  const handles = [cordFigure, buzzSwitch].filter(Boolean)
  let buzzAt = { x: 0, y: 0 } // where the switch lies, in the cord's box
  // A trackpad's tick is faint, so a mouse's pull ticks three times, a couple of frames apart.
  const TICKS = 3
  const TICK_GAP = 30 // ms
  // On a phone the bulb is tapped more than the cord is pulled, so one lies over the bulb too.
  const bulbSwitch = buzzSwitch && touchOnly ? el('input', { class: 'bulb-switch', type: 'checkbox', switch: true, tabindex: '-1', 'aria-hidden': 'true' }) : null
  if (bulbSwitch) lamp.prepend(bulbSwitch)
  const placeSwitch = (x, y) => { buzzAt = { x, y }; buzzSwitch.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)` }
  const restLength = () => (window.innerWidth <= 640 ? 30 : 44)
  const hiddenAt = () => -(rest + BOX + 12)
  let rest = restLength()
  // The cord comes out of the header at hang: 0, or above it, out of sight, while reeled up. It
  // starts there and drops in once the figure is ready.
  let hang = hiddenAt()
  let ready = false
  let reveal = false
  let revealTimer = 0
  const links = Array.from({ length: LINKS + 1 }, (_, i) => { const y = hang + (i / LINKS) * rest; return { x: 0, y, px: 0, py: y } })
  const end = links[LINKS]
  let out = 0 // how far the cord is out of the switch, beyond its rest
  let outSpeed = 0
  let clicked = false // this pull has clicked; it clicks again once the cord has gone back in
  let tilt = 0 // the figure's own lean on the thread, radians clockwise
  let tiltSpeed = 0
  let held = null
  let tugAt = -1
  let tie = { x: BOX * 0.518, y: BOX * 0.09 } // where the cord is tied: the top of its beret in the still
  let near = false
  let pointer = null
  let figureScene = null
  let running = false
  let lastTime = 0
  let simTime = 0
  let pending = 0

  const cordPoint = (event) => { const r = cord.getBoundingClientRect(); return { x: event.clientX - r.left, y: event.clientY - r.top } }
  const reach = () => rest + PULL
  const shown = () => hang > hiddenAt() + 0.5
  function hangTarget() {
    if (held || tugAt >= 0 || reveal) return 0
    return ready ? Math.max(hiddenAt(), -window.scrollY) : hiddenAt()
  }

  function flip() {
    switchTheme()
    figureScene?.flinch()
    navigator.vibrate?.(8)
  }

  // A short pull down and back, to show a switch that has just clicked (from the button, or a tap).
  function tug() {
    clicked = true
    tugAt = simTime
    wakeCord()
  }

  // Where the end of the cord is held, by a hand or by a tug, or null when it hangs free.
  function grip() {
    if (held) return held
    if (tugAt < 0) return null
    const t = (simTime - tugAt) / 0.16
    if (t < 1) return { x: end.x * 0.9, y: hang + rest + (CLICK + 8) * Math.sin(t * Math.PI / 2) }
    tugAt = -1
    end.px = end.x
    end.py = end.y
    return null
  }

  function stepCord(h) {
    simTime += h
    links[0].x = 0
    links[0].y = hang
    const hand = grip()
    if (hand) {
      // Held, the cord comes out of the switch as far as it is pulled, and no further.
      const dx = hand.x
      const dy = hand.y - hang
      const d = Math.hypot(dx, dy) || 1
      const k = Math.min(1, reach() / d)
      out = clamp(d * k - rest, 0, PULL)
      outSpeed = 0
      end.x = dx * k
      end.y = hang + dy * k
      end.px = end.x
      end.py = end.y
    } else {
      // Let go, the switch's spring draws it back in, almost without overshoot.
      outSpeed += (-out * 320 - outSpeed * (reduced ? 60 : 30)) * h
      out = Math.max(0, out + outSpeed * h)
    }
    if (clicked && out < CLICK * 0.35 && !hand) clicked = false

    // Each link falls and carries on as it was going, a little slowed; a breath of air sways the
    // figure while it hangs.
    const damp = reduced ? 0.9 : 0.996
    const breeze = reduced || hand || !shown() ? 0 : 70 * Math.sin(simTime * 1.1) + 30 * Math.sin(simTime * 2.3 + 1)
    for (let i = 1; i <= LINKS; i += 1) {
      const p = links[i]
      if (i === LINKS && hand) continue
      const vx = (p.x - p.px) * damp
      const vy = (p.y - p.py) * damp
      p.px = p.x
      p.py = p.y
      p.x += vx + (i === LINKS ? breeze : 0) * h * h
      p.y += vy + GRAVITY * h * h
    }
    // The thread doesn't stretch. The top is fixed, and the figure, far heavier than the thread,
    // gives little; held, it gives none.
    const length = (rest + out) / LINKS
    for (let pass = 0; pass < 14; pass += 1) {
      for (let i = 0; i < LINKS; i += 1) {
        const a = links[i]
        const b = links[i + 1]
        const wa = i === 0 ? 0 : 1
        const wb = i + 1 === LINKS ? (hand ? 0 : 0.08) : 1
        if (wa + wb === 0) continue
        const dx = b.x - a.x
        const dy = b.y - a.y
        const d = Math.hypot(dx, dy) || 1e-6
        const shift = (d - length) / d / (wa + wb)
        a.x += dx * shift * wa
        a.y += dy * shift * wa
        b.x -= dx * shift * wb
        b.y -= dy * shift * wb
      }
    }
    // The figure leans along the end of the thread, a beat behind it.
    const before = links[LINKS - 2]
    const lean = -Math.atan2(end.x - before.x, end.y - before.y)
    tiltSpeed += (-(tilt - lean) * 170 - tiltSpeed * (reduced ? 40 : 9)) * h
    tilt += tiltSpeed * h
  }

  // The pointer, in the figure's canvas as it hangs upright, for it to look at.
  function pointerOnFigure() {
    if (!pointer) return null
    const r = cord.getBoundingClientRect()
    const dx = pointer.x - r.left - end.x
    const dy = pointer.y - r.top - end.y
    if (Math.hypot(dx, dy) > 420) return null
    const c = Math.cos(-tilt)
    const s = Math.sin(-tilt)
    return { x: tie.x + dx * c - dy * s, y: tie.y + dx * s + dy * c }
  }

  function paintCord(dt) {
    let d = `M${links[0].x.toFixed(2)} ${links[0].y.toFixed(2)}`
    for (let i = 1; i < LINKS; i += 1) {
      const p = links[i]
      const q = links[i + 1]
      d += `Q${p.x.toFixed(2)} ${p.y.toFixed(2)} ${((p.x + q.x) / 2).toFixed(2)} ${((p.y + q.y) / 2).toFixed(2)}`
    }
    cordPath.setAttribute('d', `${d}L${end.x.toFixed(2)} ${end.y.toFixed(2)}`)
    if (figureScene && shown()) tie = figureScene.draw(dt, { swing: tiltSpeed, pull: out / PULL, pointer: pointerOnFigure(), near: near || Boolean(held) })
    cordFigure.style.transform = `translate(${end.x.toFixed(2)}px, ${end.y.toFixed(2)}px) rotate(${tilt.toFixed(4)}rad) translate(${(-tie.x).toFixed(2)}px, ${(-tie.y).toFixed(2)}px)`
    // The switch lies over the middle of the figure; held, it stays where it was taken hold of, so a
    // finger's pull drags its thumb (a mouse's is moved once the light changes, tickMore).
    if (buzzSwitch && !held) {
      const mx = BOX / 2 - tie.x
      const my = BOX / 2 - tie.y
      const c = Math.cos(tilt)
      const s = Math.sin(tilt)
      placeSwitch(end.x + mx * c - my * s - BUZZ / 2, end.y + mx * s + my * c - BUZZ / 2)
    }
    cordTag.style.transform = `translate(${(end.x - BOX * 0.3).toFixed(1)}px, ${(end.y + BOX * 0.4).toFixed(1)}px)`
    cord.classList.toggle('near', near && !held && out < 2 && shown())
  }

  // It lives while it can be seen; reeled up out of sight, it rests until it's wanted.
  function cordSettled() {
    if (held || tugAt >= 0 || out > 0.05 || Math.abs(hang - hangTarget()) > 0.3) return false
    return !shown()
  }

  function cordFrame(time) {
    if (!running) return
    const dt = Math.min(0.05, Math.max(0, (time - lastTime) / 1000))
    lastTime = time
    // The top of the cord follows the page as it scrolls, and drops back when it is wanted.
    const target = hangTarget()
    const move = (target - hang) * (reduced ? 1 : 1 - Math.exp(-dt * (target > hang ? 9 : 16)))
    hang += move
    // The rest of the cord goes with its top, as one piece, so it leaves and arrives hanging. The top
    // moves faster than the thread can fall or follow: alone, it would pass the thread on the way
    // down, or fling it up past itself on the way up, and the thread would fold over it and turn the
    // figure upside down.
    for (const p of links) { p.y += move; p.py += move }
    pending += dt
    while (pending >= STEP) { stepCord(STEP); pending -= STEP }
    paintCord(dt)
    if (cordSettled() || document.visibilityState !== 'visible') { running = false; return }
    window.requestAnimationFrame(cordFrame)
  }
  function wakeCord() {
    if (running) return
    running = true
    lastTime = performance.now()
    window.requestAnimationFrame(cordFrame)
  }

  function takeHold(event) {
    if (event.button !== 0 || held) return
    // The switch has to see the press to follow the pull; the figure's is kept from dragging or
    // selecting its picture.
    if (event.currentTarget === cordFigure) event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    const at = cordPoint(event)
    held = { id: event.pointerId, dx: at.x - end.x, dy: at.y - end.y, x: end.x, y: end.y, from: at, moved: 0, vx: 0, vy: 0, t: event.timeStamp, flipped: false }
    if (event.currentTarget === buzzSwitch && event.pointerType === 'mouse') held.tick = { from: at.y - buzzAt.y, count: 0, at: 0 }
    handles.forEach((h) => h.classList.add('held'))
    wakeCord()
  }
  // A mouse's pull: Safari's thumb crosses once the pointer is 40% of the track past where it was
  // pressed, then whenever it crosses the middle. Until the light changes Safari isn't let see the
  // pull (below), so it can't cross early. As it changes, the switch jumps up a whole length, so the
  // thumb crosses on that very move, and from then on the switch goes with the pointer, the thumb
  // crossing back and forth for each tick more, then staying across. A finger's pull is left to
  // Safari: an iPhone stopped buzzing when the page held it back too.
  function tickMore(tick, y, time) {
    if (!tick.count) { tick.count = 1; tick.at = time } else if (tick.count < TICKS && time - tick.at >= TICK_GAP) { tick.count += 1; tick.at = time }
    const local = tick.count === 1 ? tick.from + BUZZ : BUZZ / 2 + (tick.count % 2 ? 10 : -10)
    placeSwitch(buzzAt.x, y - local)
    buzzSwitch.getBoundingClientRect() // so Safari measures the move against where it is now
  }
  function pullCord(event) {
    if (!held || event.pointerId !== held.id) return
    const at = cordPoint(event)
    const x = at.x - held.dx
    const y = at.y - held.dy
    const dt = Math.max(4, event.timeStamp - held.t) / 1000
    held.vx = lerp(held.vx, (x - held.x) / dt, 0.6)
    held.vy = lerp(held.vy, (y - held.y) / dt, 0.6)
    held.x = x
    held.y = y
    held.t = event.timeStamp
    held.moved = Math.max(held.moved, Math.hypot(at.x - held.from.x, at.y - held.from.y))
    // The switch clicks as the cord comes out past the click, here rather than in a frame, so a
    // quick pull counts however few frames the page draws while it happens.
    if (!clicked && Math.hypot(x, y - hang) - rest >= CLICK) { clicked = true; held.flipped = true; flip() }
    if (held.tick && held.flipped) tickMore(held.tick, at.y, event.timeStamp)
  }
  function letGo(event) {
    if (!held || event.pointerId !== held.id) return
    const { moved, vx, vy } = held
    held = null
    handles.forEach((h) => h.classList.remove('held'))
    // Safari's switch is made anew after every pull, once its click (if any) is done. Let go off it,
    // or while the new theme spreads, and a mouse's click never reaches it, so it would carry this
    // pull into the next (and tick early, or on a hover); and on a phone it times every hold from
    // the first touch it ever had. Changing its type renews it, without a tick (but not under a hand
    // that has already taken hold again: that would lose its pull, and it renews it as it lets go).
    if (buzzSwitch) window.setTimeout(() => { if (held) return; buzzSwitch.type = 'text'; buzzSwitch.type = 'checkbox'; buzzSwitch.checked = false }, 50)
    if (moved < 4 && event.type === 'pointerup') {
      // A tap is a short pull, and it switches as the button does.
      flip()
      tug()
      return
    }
    // Thrown, it carries on the way your hand was going, and spins on the thread.
    const speed = Math.hypot(vx, vy)
    const k = speed > 2400 ? 2400 / speed : 1
    end.px = end.x - vx * k * STEP
    end.py = end.y - vy * k * STEP
    figureScene?.spin(clamp(vx / 160, -9, 9) + (Math.random() - 0.5) * 3)
  }
  for (const handle of handles) {
    handle.addEventListener('pointerdown', takeHold)
    handle.addEventListener('pointermove', pullCord)
    handle.addEventListener('pointerup', letGo)
    handle.addEventListener('pointercancel', letGo)
    handle.addEventListener('pointerenter', () => { near = true; wakeCord() })
    handle.addEventListener('pointerleave', () => { near = false })
  }
  // The switch's own click is undone, so it is off for the next pull.
  buzzSwitch?.addEventListener('click', (event) => event.preventDefault())
  // Until the light changes, Safari isn't let see a mouse's pull (tickMore), nor a hover.
  buzzSwitch?.addEventListener('mousemove', (event) => { if (!held?.flipped) event.preventDefault() })
  // The bulb's switch switches as the button does, as it's let go; Safari's own click, which an
  // iPhone feels, is undone, and it isn't let follow a finger, so nothing else is felt.
  bulbSwitch?.addEventListener('pointerup', () => { flip(); tug() })
  bulbSwitch?.addEventListener('click', (event) => event.preventDefault())
  bulbSwitch?.addEventListener('mousemove', (event) => event.preventDefault())
  bulbSwitch?.addEventListener('touchmove', (event) => event.preventDefault(), { passive: false })
  // Point at the bulb (or tab to it) while the cord is reeled up and it comes down to be pulled.
  const showCord = (on) => {
    window.clearTimeout(revealTimer)
    if (on) { reveal = true; wakeCord(); return }
    revealTimer = window.setTimeout(() => { reveal = false; wakeCord() }, 900)
  }
  lamp.addEventListener('pointerenter', () => showCord(true))
  lamp.addEventListener('pointerleave', () => showCord(false))
  themeButton.addEventListener('focus', () => { if (themeButton.matches(':focus-visible')) showCord(true) })
  themeButton.addEventListener('blur', () => showCord(false))
  themeButton.addEventListener('click', () => { flip(); tug() })
  window.addEventListener('pointermove', (event) => { pointer = { x: event.clientX, y: event.clientY } }, { passive: true })
  document.documentElement.addEventListener('pointerleave', () => { pointer = null })
  window.addEventListener('scroll', wakeCord, { passive: true })
  window.addEventListener('resize', () => { rest = restLength(); wakeCord() })
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') wakeCord() })

  // The figure on the cord is the crew's own, alive; it loads after the crew, from the same files.
  // Until then (and where WebGL is off) the cord carries its still picture.
  async function mountCord() {
    await nextPaint()
    const scenes = await loadLive()
    const scene = new scenes.CordScene($('.cord-canvas', cord), LAMPLIGHTER, reduced, CREW_FILES)
    scene.resize(BOX, BOX)
    await scene.load()
    figureScene = scene
    cord.classList.add('live')
  }
  const dropIn = () => { ready = true; wakeCord() }
  // Once the cord is near the screen and the page idle, after the crew if it is near too; as the
  // crew's, never on a thrifty connection or in reduced motion.
  liveScene(cord, () => mountCord().then(dropIn), dropIn, !thrifty && !reduced)
  window.setTimeout(dropIn, 6000)
  if (reduced) hang = hangTarget()
  paintCord(0)

  /* ================================================================ 1 · Hire your team */

  // The four agents on the cards, in the order work goes along a team, each with its part of the
  // tray's sentence and its share of what the team usually takes. These are an example, and the
  // page says so: the drawn team (Researcher, Writer and Checker) usually takes 9 min · $0.21, and
  // each card adds its own share. Nothing here calls a model.
  const AGENTS = [
    { id: 'planner', name: 'Planner', part: 'plans it', min: 1, cents: 3 },
    { id: 'researcher', name: 'Researcher', part: 'finds it', min: 4, cents: 8 },
    { id: 'writer', name: 'Writer', part: 'makes it', min: 3, cents: 8 },
    { id: 'checker', name: 'Checker', part: 'checks every fact', min: 2, cents: 5 },
  ]
  const agentOf = (id) => AGENTS.find((agent) => agent.id === id)
  // The team as the board draws it: Researcher and Writer, and Checker as it is dropped in. Writer's
  // is the card picked out in gold: the last one added.
  const team = new Set(['researcher', 'writer', 'checker'])
  let hot = 'writer'
  let touched = false
  const tray = $('#tray')
  const slots = $('#tray-slots')
  const trayN = $('#tray-n')
  const traySay = $('#tray-say')
  const trayLive = $('#tray-live')
  const cards = $$('.hire-card[data-agent]')
  const cardOf = (id) => cards.find((card) => card.dataset.agent === id)
  const hired = () => AGENTS.filter((agent) => team.has(agent.id))
  function usually() {
    const on = hired()
    if (!on.length) return '—'
    const cents = on.reduce((sum, agent) => sum + agent.cents, 0)
    return `${on.reduce((sum, agent) => sum + agent.min, 0)} min · $${(cents / 100).toFixed(2)}`
  }
  if (touchOnly) $('#hire-hint').textContent = 'Tap a card to add it to your team, and tap it again to let it go.'

  // The tray: each agent on the team in the order the work goes (a button that takes it off), a
  // place for one more, what it usually takes, and the team as one sentence. `fresh` is the one just
  // added: it drops into its place, and its words come in.
  function renderTray(fresh = null) {
    const on = hired()
    // With everyone on the team there's no place for one more, and the four slots draw a little
    // smaller so each name fits. (replaceChildren writes a null out as the text "null", so the
    // empty place is only added when there is one.)
    const full = on.length === AGENTS.length
    slots.toggleAttribute('data-full', full)
    slots.replaceChildren(
      ...on.map((agent) => el('li', {}, el('button', {
        type: 'button', class: ['slot', agent.id === hot && 'hot', agent.id === fresh && 'drop-in'].filter(Boolean).join(' '), 'data-agent': agent.id,
        'aria-label': `Take ${agent.name} off the team`, onclick: () => takeOff(agent.id),
      }, el('img', { src: `assets/crew/${agent.id}.webp`, width: '256', height: '256', alt: '' }), el('span', { class: 'slot-name', text: agent.name }), el('span', { class: 'slot-x', 'aria-hidden': 'true', text: '×' })))),
      ...(full ? [] : [el('li', { class: 'slot-empty', 'aria-hidden': 'true' }, el('span', { text: touchOnly ? '+ tap a card' : '+ drop a card' }))]),
    )
    trayN.textContent = usually()
    traySay.replaceChildren(...(on.length
      ? ['“', ...on.flatMap((agent, i) => [i ? ', ' : '', el('span', { class: agent.id === fresh ? 'fresh' : null }, el('span', { class: agent.id === hot ? 'hot' : null, text: agent.name }), ` ${agent.part}`)]), ', and you look before it goes.”']
      : ['Pick a card to start your team.']))
    for (const card of cards) {
      card.setAttribute('aria-pressed', String(team.has(card.dataset.agent)))
      card.classList.toggle('hot', card.dataset.agent === hot)
    }
  }
  function tell(text) { trayLive.textContent = `${text} ${hired().length ? `Usually ${usually()}, as an example.` : 'Nobody is on the team.'}` }
  function add(id) {
    touched = true
    if (team.has(id)) { hot = id; renderTray(); return }
    team.add(id)
    hot = id
    renderTray(id)
    tell(`${agentOf(id).name} joins the team.`)
  }
  function takeOff(id) {
    touched = true
    // The keyboard stays in the tray: on the slot that takes this one's place, or the one before it.
    const at = hired().findIndex((agent) => agent.id === id)
    const fromTray = document.activeElement?.closest?.('#tray-slots')
    team.delete(id)
    if (hot === id) hot = hired().at(-1)?.id ?? null
    renderTray()
    tell(`${agentOf(id).name} leaves the team.`)
    if (fromTray) {
      const left = $$('button.slot', slots)
      ;(left[at] ?? left[at - 1] ?? cardOf(id)).focus()
    }
  }
  const toggle = (id) => (team.has(id) ? takeOff(id) : add(id))

  // A mouse or a pen drags a card into the tray; a click, a tap or Enter adds it or lets it go. A
  // finger only taps, so the row of cards still scrolls on a phone.
  let drag = null
  let dragged = false
  const overTray = (event) => {
    const r = tray.getBoundingClientRect()
    return event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom
  }
  function dragStart(event) {
    if (event.button !== 0 || event.pointerType === 'touch') return
    const card = event.currentTarget
    drag = { id: card.dataset.agent, card, x: event.clientX, y: event.clientY, pointer: event.pointerId, ghost: null }
    card.setPointerCapture?.(event.pointerId)
  }
  function dragMove(event) {
    if (!drag || event.pointerId !== drag.pointer) return
    if (!drag.ghost) {
      if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 6) return
      const agent = agentOf(drag.id)
      drag.ghost = document.body.appendChild(el('div', { class: 'drag-ghost', 'aria-hidden': 'true' }, el('img', { src: `assets/crew/${agent.id}.webp`, width: '256', height: '256', alt: '' }), agent.name))
      drag.card.classList.add('lifted')
      document.body.classList.add('dragging')
    }
    event.preventDefault()
    drag.ghost.style.transform = `translate(${(event.clientX - 75).toFixed(1)}px, ${(event.clientY - 70).toFixed(1)}px)`
    tray.classList.toggle('over', overTray(event))
  }
  function dragEnd(event) {
    if (!drag || event.pointerId !== drag.pointer) return
    const { id, card, ghost } = drag
    drag = null
    if (!ghost) return
    // The click that follows a drag is the drop, not a toggle.
    dragged = true
    window.setTimeout(() => { dragged = false }, 0)
    ghost.remove()
    card.classList.remove('lifted')
    document.body.classList.remove('dragging')
    tray.classList.remove('over')
    if (event.type === 'pointerup' && overTray(event)) add(id)
  }
  for (const card of cards) {
    card.addEventListener('pointerdown', dragStart)
    card.addEventListener('pointermove', dragMove)
    card.addEventListener('pointerup', dragEnd)
    card.addEventListener('pointercancel', dragEnd)
    card.addEventListener('dragstart', (event) => event.preventDefault())
    card.addEventListener('click', () => { if (!dragged) toggle(card.dataset.agent) })
  }
  renderTray()
  // The first time the tray comes into view, Checker drops into it, as the board draws it, unless
  // someone has changed the team already.
  if (!reduced && 'IntersectionObserver' in window) {
    const firstLook = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      firstLook.disconnect()
      if (!touched && team.has('checker')) renderTray('checker')
    }, { threshold: 0.6 })
    firstLook.observe(tray)
  }

  /* ================================================================ 4 · And it gets better */

  // Checker's find, Writer's lesson and the next month's work come in one after another as the
  // section scrolls into view. With reduced motion, or without the script, they are simply there.
  const better = $('#better')
  if (!reduced && 'IntersectionObserver' in window) {
    $$('.reveal', better).forEach((node, i) => node.style.setProperty('--i', String(i)))
    better.classList.add('will-reveal')
    const seen = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      seen.disconnect()
      better.classList.add('revealed')
    }, { rootMargin: '0px 0px -20% 0px' })
    seen.observe($('.better-grid', better))
  }

  /* ================================================================ 5 · Your Mac, with a team inside */

  // On a screen big enough for it, the desktop comes up as a Mac's screen on the page and grows as the
  // page scrolls, until it fills the whole window, its menu bar and notch at the very top; once it
  // does, the Writer's ask arrives at the notch. The screen is held in place meanwhile (styles.css,
  // .zoom-on), and the page's header slides out of its way while it is held and nearly full, coming
  // back as the section leaves or the screen shrinks again. It starts growing when the section's top
  // is halfway down the window, is full 70% of the way through the held scroll, and stays full for the
  // rest. With reduced motion, or on a smaller screen, it is simply there.
  const mac = $('#mac')
  const desk = $('.desk', mac)
  const roomy = window.matchMedia('(min-width: 1024px) and (min-height: 780px)')
  let zoomQueued = false
  function paintZoom() {
    zoomQueued = false
    if (!mac.classList.contains('zoom-on')) return
    const box = mac.getBoundingClientRect()
    const lead = desk.offsetHeight / 2
    const held = (mac.offsetHeight - desk.offsetHeight) * 0.7
    const zoom = lead + held > 0 ? clamp((lead - box.top) / (lead + held)) : 1
    mac.style.setProperty('--zoom', zoom.toFixed(4))
    // Full is when the ask arrives; it goes again only once the screen is clearly smaller, so a
    // scroll that stops at the edge doesn't make the notch open and close.
    if (zoom >= 0.995) mac.classList.add('asking')
    else if (zoom < 0.9) mac.classList.remove('asking')
    // From about 0.7 the screen's top edge reaches the header, so the header goes; the screen is held
    // until the section's bottom reaches the window's.
    root.classList.toggle('desk-full', zoom >= 0.7 && box.bottom > window.innerHeight + 1)
  }
  function fitZoom() {
    const on = !reduced && roomy.matches
    mac.classList.toggle('zoom-on', on)
    if (!on) { mac.classList.remove('asking'); mac.style.removeProperty('--zoom'); root.classList.remove('desk-full') }
    paintZoom()
  }
  roomy.addEventListener('change', fitZoom)
  window.addEventListener('scroll', () => { if (!zoomQueued) { zoomQueued = true; window.requestAnimationFrame(paintZoom) } }, { passive: true })
  window.addEventListener('resize', () => { if (!zoomQueued) { zoomQueued = true; window.requestAnimationFrame(paintZoom) } })
  fitZoom()

  /* ================================================================ 9 · Start */

  // The download for the visitor's computer first: Windows when the browser says it runs on Windows,
  // the Mac otherwise (a phone too). The other one is beside it, by its name.
  if (/\bwin/i.test(navigator.userAgentData?.platform || navigator.userAgent)) {
    for (const link of $$('#get .dl')) {
      const mine = link.dataset.os === 'windows'
      link.classList.toggle('btn-primary', mine)
      link.classList.toggle('btn-dark', !mine)
    }
    $('#win-note').hidden = false
  }

  /* ================================================================ First paint */

  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark')
  paintProgress()
})()
