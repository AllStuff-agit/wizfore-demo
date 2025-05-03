// src/data/index.js
/**
 * 데이터 중앙 내보내기 파일
 * 모든 데이터 파일을 한 곳에서 관리하고 내보냄
 */

export { default as programs } from './programs';
export { default as history } from './history';
export { default as experts } from './experts';
export { default as facilities } from './facilities';
export { default as services } from './services';
export { default as settings } from './settings';
export { default as faq } from './faq';

// 데이터 파일 모음 내보내기
const data = {
  programs: require('./programs').default,
  history: require('./history').default,
  experts: require('./experts').default,
  facilities: require('./facilities').default,
  services: require('./services').default,
  settings: require('./settings').default,
  faq: require('./faq').default,
};

export default data;