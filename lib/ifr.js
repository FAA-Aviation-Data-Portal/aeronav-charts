const superagent = require('superagent')
const { parseVfrTable } = require('./utils')

const baseURI = 'https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/'

const fetchIfr = async () => {
  try {
    const response = await superagent
      .get(`${baseURI}/ifr`)
    return response.text
  } catch (err) {
    console.error(`Error fetching values from ${baseURI}`, err)
  }
}

exports.lowsHighsAreas = async () => {
  const html = await fetchIfr()
  return parseVfrTable(html, '#lowsHighsAreas table')
}
exports.planning = async () => {
  const html = await fetchIfr()
  return parseVfrTable(html, '#planning table')
}
exports.gulf = async () => {
  const html = await fetchIfr()
  return parseVfrTable(html, '#gulf table')
}
exports.grandCanyon = async () => {
  const html = await fetchVfr()
  return parseVfrTable(html, '#grandCanyon table')
}
// exports.planning = async () => {
//   const html = await fetchVfr()
//   return parseVfrTable(html, '#Planning table')
// }
exports.caribbean = async () => {
  const html = await fetchVfr()
  return parseVfrTable(html, '#caribbean table')
}
