const AMAZON_CATEGORIES_URL = 'https://www.amazon.fr/gp/bestsellers/?ref_=nav_cs_bestsellers';
const AMAZON_PRODUCTS_URL = 'https://www.amazon.fr/gp/bestsellers/kitchen/ref=zg_bs_nav_kitchen_0';

const selectors = {
  ranking: 'div.zg-bdg-body span.zg-bdg-text',
  nomProduit: 'div._cDEzb_p13n-sc-css-line-clamp-3_g3dy1',
  ratings: 'div.a-icon-row span.a-size-small',
  prix: 'span._cDEzb_p13n-sc-price_3mJ9Z',
  categories: 'div[role="treeitem"]._p13n-zg-nav-tree-all_style_zg-browse-item__1rdKf._p13n-zg-nav-tree-all_style_zg-browse-height-small__nleKL'
};

module.exports = {
  selectors,
  AMAZON_CATEGORIES_URL,
  AMAZON_PRODUCTS_URL
};
