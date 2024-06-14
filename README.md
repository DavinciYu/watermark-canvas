[*Example of usage*](https://tinyurl.com/2mknex43):
```js
import { setWatermark } from 'watermark-background';

setWatermark({
  markText: 'watermark text',
});
```

[*Config Options*](https://tinyurl.com/2mknex43):
```js
{
  markText: 'watermark text',  
  font: '16px Microsoft YaHei',
  color: '#000',
  opacity: 0.1,
  width: 240, // canvas width
  height: 150, // canvas height
  rotate: -Math.PI / 7, // rotate angle
  appendToElement: null, // null:append to body，id: append to the element has this id
  backgroundDivId: 'water_mark_div_',
  offsetTop: 0, // top start position
  offsetLeft: '-50px', // left start position
  containerWidth: '150%', // watermark div's width
  containerHeight: '100%', // watermark div's height
}
```
