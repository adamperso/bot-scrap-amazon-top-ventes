
const selectors = {
  ranking: '#p13n-asin-index-0 > div > div.a-section.zg-bdg-ctr > div.a-section.zg-bdg-body.zg-bdg-clr-body.aok-float-left > span',
  nomProduit: '#B0BXY7SVVT > div > div > a > span > div',
  ratings: '#B0BXY7SVVT > div > div > div:nth-child(2) > div > a > span',
  prix: '#B0BXY7SVVT > div > div > div:nth-child(3) > div > div > a > div > span > span'
};

const AMAZON_URL = 'https://www.amazon.fr/gp/bestsellers/kitchen/';

module.exports = {
  selectors,
  AMAZON_URL
};
