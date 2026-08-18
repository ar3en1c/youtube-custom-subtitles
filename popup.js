const DEFAULTS = { color: '#ffffff', bg: '#000000', bgOpacity: 0,
                   outline: true, outlineColor: '#000000', outlineSize: 2 };
const $ = id => document.getElementById(id);

const storage = (typeof browser !== 'undefined' ? browser : chrome).storage;
const store = storage.local;

store.get(DEFAULTS).then(s => {
  $('color').value = s.color;
  $('bg').value = s.bg;
  $('bgOpacity').value = s.bgOpacity;
  $('outline').checked = s.outline;
  $('outlineColor').value = s.outlineColor;
  $('outlineSize').value = s.outlineSize;
}).catch(err => console.warn('[custom-subtitles] settings load failed:', err));

// Save on every change; the YouTube tab updates live via storage.onChanged.
document.addEventListener('input', () => store.set({
  color: $('color').value,
  bg: $('bg').value,
  bgOpacity: +$('bgOpacity').value,
  outline: $('outline').checked,
  outlineColor: $('outlineColor').value,
  outlineSize: +$('outlineSize').value,
}).catch(err => console.warn('[custom-subtitles] settings save failed:', err)));
