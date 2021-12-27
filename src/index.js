import chrtHorizontalRange from './chrtHorizontalRange';
import chrtVerticalRange from './chrtVerticalRange';

export { default as chrtHorizontalRange } from './chrtHorizontalRange';
export { default as chrtVerticalRange } from './chrtVerticalRange';

export default (type = 'vertical') => {
  if(type === 'horizontal') {
    return new chrtHorizontalRange();
  }
  if(type === 'vertical') {
    return new chrtVerticalRange();
  }
}
