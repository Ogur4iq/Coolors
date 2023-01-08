const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (evt) => {
  evt.preventDefault();

  if (evt.code === 'Space') {
    setRandomColors();
  }
});

document.addEventListener('click', (evt) => {
  const type = evt.target.dataset.type;

  if (type === 'lock') {
    const node =
      evt.target.tagName.toLowerCase() === 'i'
        ? evt.target
        : evt.target.children[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyToClipboard(evt.target.textContent);
  }
});

const setRandomColors = function (isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const colorName = col.querySelector('h2');
    const button = col.querySelector('button');
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    
    if (isLocked) {
      colors.push(colorName.textContent);
      return;
    }
    
    const color = isInitial 
      ? colors[index] 
        ? colors[index] 
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colors.push(color);
    }

    colorName.textContent = color;
    col.style.background = color;

    setTextColor(color, colorName);
    setTextColor(color, button);
  });

  updateColorsHash(colors);
};

const setTextColor = function (color, text) {
  const luminance = chroma(color).luminance();

  text.style.color = luminance > 0.5 ? 'black' : 'white';
};

const copyToClipboard = function (text) {
  return navigator.clipboard.writeText(text);
}

const updateColorsHash = function (colors) {
  document.location.hash = colors.map(color => color.toString().substring(1)).join('-');
};

const getColorsFromHash = function () {
  if (document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map(color => '#' + color);
  }

  return [];
};

setRandomColors(true);
