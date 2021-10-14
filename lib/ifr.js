const superagent = require('superagent')
const { parseVfrTable } = require('./utils')

const baseURI =
  'https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/'

const fetchIfr = async () => {
  try {
    const response = await superagent
      .get(`${baseURI}/ifr`)
      .timeout({ deadline: 10000 })
      .retry(5)
    return response.text
  } catch (err) {
    console.error(`Error fetching values from ${baseURI}`, err)
  }
}

exports.all = async () => {
  const html = await fetchIfr()
  const enrouteLow = parseEnrouteLow(html)
  const enrouteHigh = parseEnrouteHigh(html)
  const enrouteLowHighAlaska = parseEnrouteLowHighAlaska(html)
  const enrouteArea = parseEnrouteArea(html)
  const enrouteHawaiiPacific = parseEnrouteHawaiiPacific(html)
  const planning = parsePlanning(html)
  const gulf = parseGulf(html)
  const caribbean = parseCaribbean(html)

  return {
    enrouteLow,
    enrouteHigh,
    enrouteLowHighAlaska,
    enrouteArea,
    enrouteHawaiiPacific,
    planning,
    gulf,
    caribbean
  }
}

exports.enrouteLow = async () => {
  const html = await fetchIfr()
  return parseEnrouteLow(html)
}
exports.enrouteHigh = async () => {
  const html = await fetchIfr()
  return parseEnrouteHigh(html)
}
exports.enrouteLowHighAlaska = async () => {
  const html = await fetchIfr()
  return parseEnrouteLowHighAlaska(html)
}
exports.enrouteArea = async () => {
  const html = await fetchIfr()
  return parseEnrouteArea(html)
}
exports.enrouteHawaiiPacific = async () => {
  const html = await fetchIfr()
  return parseEnrouteHawaiiPacific(html)
}
exports.planning = async () => {
  const html = await fetchIfr()
  return parsePlanning(html)
}
exports.gulf = async () => {
  const html = await fetchIfr()
  return parseGulf(html)
}
exports.caribbean = async () => {
  const html = await fetchIfr()
  return parseCaribbean(html)
}

const parseEnrouteLow = async html => {
  return parseVfrTable(html, '#lowsHighsAreas table', 0)
}
const parseEnrouteHigh = async html => {
  return parseVfrTable(html, '#lowsHighsAreas table', 1)
}
const parseEnrouteLowHighAlaska = async html => {
  return parseVfrTable(html, '#lowsHighsAreas table', 2)
}
const parseEnrouteArea = async html => {
  return parseVfrTable(html, '#lowsHighsAreas table', 3)
}
const parseEnrouteHawaiiPacific = async html => {
  return parseVfrTable(html, '#lowsHighsAreas table', 4)
}
const parsePlanning = async html => {
  return parseVfrTable(html, '#planning table')
}
const parseGulf = async html => {
  return parseVfrTable(html, '#gulf table')
}
const parseCaribbean = async html => {
  return parseVfrTable(html, '#caribbean table')
}
