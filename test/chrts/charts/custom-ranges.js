import * as chrt from 'chrt';
import chrtRange, { chrtHorizontalRange, chrtVerticalRange } from '../../../src/'

const data = new Array(10).fill(1).map((d,i) => ({x: -5 + i, y: -5 + i}));

export default async function(container) {
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .margins({top: 40, bottom: 40})
    .add(
      chrtVerticalRange()
        .from(-2)
        .to(1)
        .stroke('#f00')
        .strokeWidth(2)
        .fill('#336699')
        .dashed()
        .fillOpacity(0.5)

    )
    .add(
      chrtHorizontalRange()
        .from(0)
        .to(2)
        .stroke('#0f0')
        .strokeWidth(5)
        .dotted()
        .fillOpacity(0.5)
    )
    .add(
      chrt.xAxis()
    )
    .add(
      chrt.yAxis()
    )
    .add(
      chrt.chrtPoints()
        .data(data, d => ({
          x: d.x,
          y: d.y,
        }))
    )
    // .add(chrtHorizontalRange())

}
