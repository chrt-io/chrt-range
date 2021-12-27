import * as chrt from 'chrt';
import chrtRange, { chrtHorizontalRange, chrtVerticalRange } from '../../../src/'

const data = new Array(10).fill(1).map((d,i) => ({x: -5 + i, y: -5 + i}));

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .size(600, 200)
    .margins({top: 40, bottom: 40})
    .add(chrtVerticalRange())
    .add(chrtHorizontalRange())
    .add(chrtRange('vertical').from(-4).to(-3))
    .add(chrtRange('horizontal').from(-3).to(-1))
    .add(
      chrt.xAxis()
        .add(chrtVerticalRange()) // should not add
    )
    .add(
      chrt.yAxis()
        .add(chrtHorizontalRange()) // should not add
    )
    .add(
      chrt.chrtPoints()
        .data(data, d => ({
          x: d.x,
          y: d.y,
        }))
    )

  chart.update();

  return chart;
}
