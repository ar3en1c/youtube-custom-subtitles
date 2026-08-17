const DEFAULTS = { color: '#ffffff', bg: '#000000', bgOpacity: 0,
                   outline: true, outlineColor: '#000000', outlineSize: 2 };
const $ = id => document.getElementById(id);

chrome.storage.sync.get(DEFAULTS, s => {
  $('color').value = s.color;
  $('bg').value = s.bg;
  $('bgOpacity').value = s.bgOpacity;
  $('outline').checked = s.outline;
  $('outlineColor').value = s.outlineColor;
  $('outlineSize').value = s.outlineSize;
});

// Save on every change; the YouTube tab updates live via storage.onChanged.
document.addEventListener('input', () => chrome.storage.sync.set({
  color: $('color').value,
  bg: $('bg').value,
  bgOpacity: +$('bgOpacity').value,
  outline: $('outline').checked,
  outlineColor: $('outlineColor').value,
  outlineSize: +$('outlineSize').value,
}));
