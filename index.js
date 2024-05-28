const isObject = (param)=>{
  return Object.prototype.toString.call(param) === '[object Object]'
}
let i = 0;
const defaultOptions = {
  markText: 'watermark text',
  font: '16px Microsoft YaHei',
  color: '#000',
  opacity: 0.1,
  width: 240,
  height: 150,
  rotate: -Math.PI / 7,
  appendToElement: null, // null 表示append到body，可以设置为元素的id
  backgroundDivId: 'water_mark_div_',
  offsetTop: 0,
  offsetLeft: '-50px',
  containerWidth: '150%',
  containerHeight: '100%',
};
const observerOptions = {
  childList: true, // 观察目标子节点的变化，添加或删除
  attributes: true, // 观察属性变动
  subtree: true, // 默认是false，设置为true后可观察后代节点
};
export function setWatermark(options) {
  if (!isObject(options)) {
    console.warn('options should be an Object!');
    return;
  }
  options = {
    ...defaultOptions,
    ...options,
  };

  const canvasText = generateCanvas(options);
  textAppendToBackground(options, canvasText);
}

function generateCanvas(options) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = options.width;
  canvas.height = options.height;
  context.rotate(options.rotate); // 需要旋转后再画内容，不然内容不会旋转(旋转的是内容而不是画布)
  context.font = options.font;
  context.fillStyle = options.color;
  context.globalAlpha = options.opacity;
  context.fillText(options.markText, 0, canvas.height);

  return canvas;
}

function textAppendToBackground(options, canvasText, divId = undefined) {
  const dataUrl = canvasText.toDataURL();
  const div = document.createElement('div');
  if (divId) {
    div.id = divId;
  } else {
    div.id = options.backgroundDivId + i;
    i++;
  }

  const styles = {
    background: `url('${dataUrl}') repeat left top`,
    position: 'absolute',
    width: options.containerWidth,
    height: options.containerHeight,
    zIndex: 99999,
    pointerEvents: 'none',
    top: options.offsetTop,
    left: options.offsetLeft,
  };
  Object.keys(styles).forEach((item) => {
    div.style[item] = styles[item];
  });
  let appendToElement = document.body;
  if (options.appendToElement) {
    appendToElement = document.getElementById(options.appendToElement);
  }
  appendToElement.append(div);

  observeDiv(div, appendToElement, JSON.parse(JSON.stringify(options)), div.id);
}

function observeDiv(targetNode, parentNode, optionsCache, divId) {
  if (typeof MutationObserver !== 'function') {
    console.warn('MutationObserver is not a function!');
    return;
  }

  const observer = new MutationObserver(() => {
    mutationObserverHandler(targetNode, parentNode, optionsCache, divId);
  });
  observer.observe(targetNode, observerOptions);
}

function mutationObserverHandler(targetNode, parentNode, optionsCache, divId) {
  parentNode.removeChild(targetNode);
  const canvasText = generateCanvas(optionsCache);
  textAppendToBackground(optionsCache, canvasText, divId);
}
