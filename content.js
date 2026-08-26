// Custom Subtitles for YouTube
// Loads a local .srt/.vtt file and overlays it on the YouTube player.
// Style (colors / outline / background) is set from the extension popup.
// ponytail: subtitles are not remembered after page reload; store in IndexedDB
// keyed by video id if re-picking the file gets annoying.

console.log('[custom-subtitles] v5 script loaded on ' + location.href);

const DEFAULTS = { color: '#ffffff', bg: '#000000', bgOpacity: 0,
                   outline: true, outlineColor: '#000000', outlineSize: 2 };
let settings = DEFAULTS;

function toSec(t) {
  const parts = t.trim().replace(',', '.').split(':');
  const last = parts[parts.length - 1];
  const dot = last.indexOf('.');
  const ms = dot > -1 ? parseInt(last.slice(dot + 1).padEnd(3, '0').slice(0, 3), 10) / 1000 : 0;
  const n = parts.map(p => parseInt(p, 10));
  const h = n.length === 3 ? n[0] : 0;
  const m = n.length === 3 ? n[1] : n[0];
  return h * 3600 + m * 60 + n[n.length - 1] + ms;
}

function parseSubtitles(text) {
  const timeRe = /((?:\d+:)?\d+:\d+[.,]\d+)\s*-->\s*((?:\d+:)?\d+:\d+[.,]\d+)/;
  const cues = [];
  for (const block of text.replace(/\r/g, '').replace(/^﻿/, '').split(/\n{2,}/)) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    const ti = lines.findIndex(l => timeRe.test(l));
    if (ti === -1) continue; // WEBVTT header / NOTE blocks
    const match = lines[ti].match(timeRe);
    const text = lines.slice(ti + 1)
      .map(l => l.replace(/<[^>]+>/g, '').trim())
      .filter(Boolean)
      .join('\n');
    if (text) cues.push({ start: toSec(match[1]), end: toSec(match[2]), text });
  }
  return cues.sort((a, b) => a.start - b.start);
}

let cues = null, cur = null, video = null, lastUrl = location.href;
let box = null, span = null, bar = null, loadBtn = null, clearBtn = null, file = null;

function findVideo() {
  if (!video || !video.isConnected) video = document.querySelector('video');
  return video;
}

function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
}

function applySettings(s) {
  settings = s;
  if (!span) return; // applied again once the overlay exists
  const hasText = span.textContent.length > 0;
  span.style.color = s.color;
  span.style.backgroundColor = hasText && s.bgOpacity > 0
    ? hexToRgba(s.bg, s.bgOpacity / 100)
    : 'transparent';
  span.style.padding = hasText && s.bgOpacity > 0 ? '2px 10px' : '0';
  const o = s.outline ? s.outlineSize : 0;
  span.style.textShadow = o > 0
    ? o + 'px 0 0 ' + s.outlineColor + ',-' + o + 'px 0 0 ' + s.outlineColor +
      ',0 ' + o + 'px 0 ' + s.outlineColor + ',0 -' + o + 'px 0 ' + s.outlineColor
    : 'none';
}

// Cross-browser storage. Firefox ignores the callback form of chrome.storage and its
// storage.sync rejects for temporary add-ons, so use browser.storage.local + Promises.
const storage = (typeof browser !== 'undefined' ? browser : chrome).storage;
const store = storage.local;

store.get(DEFAULTS).then(applySettings).catch(err => console.warn('[custom-subtitles] settings load failed:', err));
storage.onChanged.addListener(() => store.get(DEFAULTS).then(applySettings).catch(err => console.warn('[custom-subtitles] settings reload failed:', err)));

// True if the mouse event landed on el — even if an invisible YouTube layer
// physically sits on top of it and stole the actual click target.
function hit(el, e) {
  if (!el || !el.isConnected) return false;
  const r = el.getBoundingClientRect();
  return el.contains(e.target) || (r.width > 0 &&
    e.clientX >= r.left && e.clientX <= r.right &&
    e.clientY >= r.top && e.clientY <= r.bottom);
}

// One document-level CAPTURE listener handles all clicks: it runs before any
// YouTube handler can swallow the event, and the hit() rect check covers the
// case where an overlay steals the click target entirely.
document.addEventListener('click', e => {
  if (!bar || !bar.isConnected) return;
  if (hit(loadBtn, e)) {
    console.log('[custom-subtitles] open file picker');
    file.click();
  } else if (clearBtn.style.display !== 'none' && hit(clearBtn, e)) {
    cues = null; cur = null;
    span.textContent = '';
    applySettings(settings);
    clearBtn.style.display = 'none';
  }
}, true);

function ensureUi() {
  if (bar && bar.isConnected) return;
  const player = document.querySelector('#movie_player, .html5-video-player');
  if (!player || !findVideo()) return;

  box = document.createElement('div');
  box.id = 'ccx-overlay';
  span = document.createElement('span');
  box.append(span);
  bar = document.createElement('div');
  bar.id = 'ccx-bar';

  file = document.createElement('input');
  file.type = 'file';
  file.accept = '.srt,.vtt';
  file.style.display = 'none';
  file.onchange = async () => {
    if (!file.files[0]) return;
    cues = parseSubtitles(await file.files[0].text());
    cur = null;
    if (cues.length) {
      clearBtn.style.display = '';
      console.log('[custom-subtitles] loaded ' + cues.length + ' cues from ' + file.files[0].name);
    } else {
      console.warn('[custom-subtitles] no cues found in ' + file.files[0].name);
      alert('No subtitle cues found in that file. Make sure it is an .srt or .vtt file.');
    }
  };

  loadBtn = document.createElement('button');
  loadBtn.textContent = '\u{1F4C4} Subtitle (v5)';
  loadBtn.title = 'Load custom subtitle file (.srt/.vtt)';

  clearBtn = document.createElement('button');
  clearBtn.textContent = '✕';
  clearBtn.title = 'Remove custom subtitles';
  clearBtn.style.display = 'none';

  bar.append(loadBtn, file, clearBtn);
  player.append(box, bar);
  applySettings(settings);
  console.log('[custom-subtitles] v5 UI ready');
}

function tick() {
  ensureUi();
  if (location.href !== lastUrl) { // YouTube SPA navigation -> different video
    lastUrl = location.href;
    cues = null; cur = null;
    if (span) {
      span.textContent = '';
      applySettings(settings);
    }
  }
  if (cues && video && video.isConnected) {
    const t = video.currentTime;
    if (!(cur && t >= cur.start && t < cur.end)) {
      cur = cues.find(c => t >= c.start && t < c.end) || null;
      span.textContent = cur ? cur.text : '';
      applySettings(settings);
    }
  }
  requestAnimationFrame(tick);
}

const style = document.createElement('style');
style.textContent = `
#ccx-overlay {
  position: absolute; left: 0; right: 0; bottom: 10%;
  text-align: center;
  font-size: clamp(16px, 3vmin, 44px); line-height: 1.3;
  font-family: sans-serif;
  pointer-events: none; z-index: 2147483646;
  padding: 0 40px;
}
#ccx-overlay span {
  white-space: pre-line; border-radius: 6px;
  -webkit-box-decoration-break: clone; box-decoration-break: clone;
}
#ccx-bar {
  position: absolute; top: 8px; right: 8px; z-index: 2147483647;
  display: flex; gap: 4px; opacity: .55;
}
#ccx-bar:hover { opacity: 1; }
#ccx-bar button {
  background: rgba(0,0,0,.75); color: #fff; border: 1px solid #555;
  border-radius: 4px; padding: 5px 10px; cursor: pointer; font-size: 13px;
}
#ccx-bar button:hover { background: rgba(0,0,0,.95); }
`;
document.documentElement.append(style);

requestAnimationFrame(tick);
