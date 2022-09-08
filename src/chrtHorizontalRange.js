import chrtRange from './chrtRange';
import { utils, cssDisplay } from 'chrt-object';
const { isNull, createSVG: create } = utils;

function chrtHorizontalRange() {
  chrtRange.call(this);

  // this.class('chrt-y-axis-range')
  this.class(['chrt-range', 'chrt-horizontal-range'])

  this.draw = () => {
    if (!['chrt'].includes(this.parentNode.type)) {
      return this.parentNode;
    }
    const standAlone = this.parentNode.type === 'chrt';
    // if (!this.parentNode.parentNode.scales) {
    //   return this.parentNode.parentNode;
    // }
    if (!this.g) {
      this.g = create('g');
      // this.g.setAttribute('data-id', this._id);
      this.g.setAttribute('data-name', `${this.parentNode.type}-range`);
    }
    cssDisplay.call(this, this.attr('display')());

    this.g.setAttribute('id', `${this.parentNode.type}Range-${this.id()}`);
    this.g.classList.remove(...this.g.classList)
    this.g.classList.add(...this._classNames);

    const fill = this.attr('fill')();
    const fillOpacity = this.attr('fillOpacity')();
    const stroke = this.attr('stroke')();
    const strokeOpacity = this.attr('strokeOpacity')();
    const strokeWidth = this.attr('strokeWidth')();

    const { scales, width, _margins } = this.parentNode;

    let from = null;
    let to = null;

    if (scales && scales.y[this?.parentNode?.name ?? 'y']) {
      const _scale = scales.y[this?.parentNode?.name ?? 'y'];
      from = isNull(this._range.from) ? from : _scale(this._range.from);
      to = isNull(this._range.to) ? to : _scale(this._range.to);
    }

    if(isNaN(from) || isNaN(to)) {
      return;
    }
    if (!this.path) {
      this.path = create('path');
      this.g.appendChild(this.path);
    }

    if (isNull(from) && isNull(to) || isNaN(from) && isNaN(to)) {
      return;
    }

    this.g.setAttribute('transform',`translate(${_margins.left},0)`)

    from = isNull(from) ? to : from;
    to = isNull(to) ? from : to;

    if (from === to) {
      this.path.remove();
      this.path = null;
    } else {
      const d = [
        [0, from],
        [0, to],
        [width - (_margins.right + _margins.left), to],
        [width - (_margins.right + _margins.left), from]
      ];
      this.path.setAttribute('d', `M${d.join('L')}z`);
      this.path.setAttribute('fill', fill);
      this.path.setAttribute('fill-opacity', fillOpacity);
    }

    const strokeStyle = this.attr('lineStyle')();
    if (!isNull(strokeStyle)) {
      switch (strokeStyle) {
        case 'dashed':
          this._strokeStyle = `${strokeWidth * 4} ${strokeWidth * 4}`;
          break;
        case 'dotted':
          this._strokeStyle = `${strokeWidth} ${strokeWidth}`;
          break;
        case 'solid':
        default:
          this._strokeStyle = null;
      }
    }

    const lines = [...new Set([from, to])];
    if(isNull(this.lines)) {
      this.lines = [];
    }

    lines.forEach((position, index) => {
      if (!this.lines[index]) {
        this.lines[index] = create('line');
        this.g.appendChild(this.lines[index]);
      }
      const line = this.lines[index];

      line.setAttribute('x1', 0);
      line.setAttribute('x2', width - (_margins.left + _margins.right));
      line.setAttribute('y1', position);
      line.setAttribute('y2', position);

      line.setAttribute('stroke', stroke);
      line.setAttribute('stroke-width', strokeWidth);
      line.setAttribute('stroke-opacity', strokeOpacity);

      if (!isNull(this._strokeStyle)) {
        line.setAttribute('stroke-dasharray', this._strokeStyle);
      }
    });

    return this.parentNode;
  };
}

chrtHorizontalRange.prototype = Object.create(chrtRange.prototype);
chrtHorizontalRange.prototype.constructor = chrtHorizontalRange;
chrtHorizontalRange.parent = chrtRange.prototype;


export default function() {
  return new chrtHorizontalRange();
}
