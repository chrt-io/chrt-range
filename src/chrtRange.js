import chrtObject from 'chrt-object';
import {
  color,
  stroke,
  strokeWidth,
  lineStyle,
  fillOpacity,
  from,
  to,
} from './lib';

const DEFAULT_FILL_COLOR = '#ddd';
const DEFAULT_STROKE = '#000';
const DEFAULT_STROKE_OPACITY = 1;
const DEFAULT_STROKE_WIDTH = 1;
const DEFAULT_FILL_OPACITY = 1;

function chrtRange() {
  // console.log('chrtAxisRange', this)
  chrtObject.call(this);
  this.type = 'range';
  this.g = null;
  this.attr('fill', DEFAULT_FILL_COLOR);
  this.attr('stroke', DEFAULT_STROKE);
  this.attr('fillOpacity', DEFAULT_FILL_OPACITY);
  this.attr('strokeOpacity', DEFAULT_STROKE_OPACITY);
  this.attr('strokeWidth', DEFAULT_STROKE_WIDTH);
  this.attr('lineStyle', 'solid');

  this._range = {};

  this._classNames = ['chrt-range'];

  this.solid = () => lineStyle.call(this, 'solid');
  this.dashed = () => lineStyle.call(this, 'dashed');
  this.dotted = () => lineStyle.call(this, 'dotted');

  this.strokeOpacity = (value) => this.attr('strokeOpacity', value);

  return this.parentNode;
}

chrtRange.prototype = Object.create(chrtObject.prototype);
chrtRange.prototype.constructor = chrtRange;
chrtRange.parent = chrtObject.prototype;

chrtRange.prototype = Object.assign(chrtRange.prototype, {
  color,
  fill: color,
  stroke,
  strokeWidth,
  fillOpacity,
  lineStyle,
  from,
  to,
});

export default chrtRange;
