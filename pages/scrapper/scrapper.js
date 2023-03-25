/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

export default async function scrapper(token_address) {
  const domain = "https://etherscan.io/token/";
  const url = domain + token_address;

  const res = await axios.get(url);
  let $ = cheerio.load(res.data);
  let data = pretty($.html());

  const start = data.indexOf("ContentPlaceHolder1_tr_tokenHolders") + 5;
  const end = data.substring(start + 244, start + 300);
  const endIndex = end.indexOf("<");
  let ans = data
    .substring(start + 230, start + 244 + endIndex)
    .trim()
    .replace(",", "");

  // removing the commas
  ans = ans.replace(",", "");

  // parsing the answer
  // eslint-disable-next-line radix
  const response = parseInt(ans);
  console.log(response);
  return response;
}
