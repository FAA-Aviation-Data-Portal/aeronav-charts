const superagent = require("superagent");
const { parseVfrTable } = require("./utils");

const baseURI =
  "https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/";

const fetchVfr = async () => {
  try {
    const response = await superagent
      .get(`${baseURI}/vfr`)
      .timeout({ deadline: 30000 })
      .retry(3);
    return response.text;
  } catch (err) {
    console.error(`Error fetching values from ${baseURI}`, err);
  }
};

exports.sectionals = async () => {
  const html = await fetchVfr();
  return parseVfrTable(html, "#sectional table");
};
exports.terminalArea = async () => {
  const html = await fetchVfr();
  return parseVfrTable(html, "#terminalArea table");
};
exports.helicopter = async () => {
  const html = await fetchVfr();
  return parseVfrTable(html, "#helicopter table");
};
exports.grandCanyon = async () => {
  const html = await fetchVfr();
  return parseVfrTable(html, "#grandCanyon table");
};
exports.planning = async () => {
  const html = await fetchVfr();
  return parseVfrTable(html, "#Planning table");
};
exports.caribbean = async () => {
  const html = await fetchVfr();
  return parseVfrTable(html, "#caribbean table");
};
