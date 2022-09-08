import chrtRange from './chrtRange';
import { utils, cssDisplay } from 'chrt-object';
const { isNull, createSVG: create } = utils;

function chrtVerticalRange() {
  chrtRange.call(this);

  this.class(['chrt-range', 'chrt-vertical-range'])

  this.draw = () => {
    // console.log('chrtVerticalRange draw', this, this.parentNode.type);
    if (!['chrt'].includes(this.parentNode.type)) {
      return this.parentNode;
    }
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

    const { scales, height, _margins } = this.parentNode;

    let from = null;
    let to = null;

    if (scales && scales.x[this?.parentNode?.name ?? 'x']) {
      const _scale = scales.x[this?.parentNode?.name ?? 'x'];
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

    // console.log('FROM', from, 'TO', to)

    if (isNull(from) && isNull(to)) {
      return;
    }

    this.g.setAttribute('transform',`translate(0, ${height - _margins.bottom - 1})`)

    // the range should be at least 1px thick
    from = isNull(from) ? to : from;
    to = isNull(to) ? from : to;

    if (from === to) {
      this.path.remove();
      this.path = null;
    } else {
      const d = [
        [from, 0],
        [to, 0],
        [to, -(height - (_margins.top + _margins.bottom))],
        [from, -(height - (_margins.top + _margins.bottom))],
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

      line.setAttribute('x1', position);
      line.setAttribute('x2', position);
      line.setAttribute('y1', 0);
      line.setAttribute('y2', -(height - (_margins.top + _margins.bottom)));

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

chrtVerticalRange.prototype = Object.create(chrtRange.prototype);
chrtVerticalRange.prototype.constructor = chrtVerticalRange;
chrtVerticalRange.parent = chrtRange.prototype;


export default function() {
  return new chrtVerticalRange();
}
