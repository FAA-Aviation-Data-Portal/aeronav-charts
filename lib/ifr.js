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

exports.enrouteLow = async () => {
  const html = await fetchIfr()
  return parseVfrTable(html, '#lowsHighsAreas table', 0)
}
exports.enrouteHigh = async () => {
  const html = await fetchIfr()
  return parseVfrTable(html, '#lowsHighsAreas table', 1)
}
exports.enrouteLowHighAlaska = async () => {
  const html = await fetchIfr()
  return parseVfrTable(html, '#lowsHighsAreas table', 2)
}
exports.enrouteArea = async () => {
  const html = await fetchIfr()
  return parseVfrTable(html, '#lowsHighsAreas table', 3)
}
exports.enrouteHawaiiPacific = async () => {
  const html = await fetchIfr()
  return parseVfrTable(html, '#lowsHighsAreas table', 4)
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
exports.caribbean = async () => {
  const html = await fetchVfr()
  return parseVfrTable(html, '#caribbean table')
}
