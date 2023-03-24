/* eslint-disable no-unused-vars */
const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

export default async function scrapper(tokenAddress) {
  const domain = 'https://etherscan.io/token/';
  const url = domain + tokenAddress;

  // getting the html as string
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  const data = pretty($.html());

  // parsing the html string
  const dom = new JSDOM(data);
  const scripts = dom.window.document.getElementById(
    'ContentPlaceHolder1_tr_tokenHolders'
  );
  const mainData = scripts.innerHTML.toString();

  // extracting the number of holders
  const start = mainData.indexOf('<div>') + 5;
  const end = mainData.indexOf('<span') - 1;
  const ans = mainData.substring(start, end).trim().replace(',', '');

  // parsing the answer
  // eslint-disable-next-line radix
  const response = parseInt(ans);
  
  return response;
}
