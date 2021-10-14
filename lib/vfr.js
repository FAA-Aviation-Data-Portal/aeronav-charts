const superagent = require('superagent')
const { parseVfrTable } = require('./utils')

const baseURI =
  'https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/'

const fetchVfr = async () => {
  try {
    const response = await superagent
      .get(`${baseURI}/vfr`)
      .timeout({ deadline: 10000 })
      .retry(5)
    return response.text
  } catch (err) {
    console.error(`Error fetching values from ${baseURI}`, err)
  }
}

exports.all = async () => {
  const html = await fetchVfr()
  const sectionals = parseSectionals(html)
  const terminalArea = parseTerminalArea(html)
  const helicopter = parseHelicopter(html)
  const grandCanyon = parseGrandCanyon(html)
  const planning = parsePlanning(html)
  const caribbean = parseCaribbean(html)
  return {
    sectionals,
    terminalArea,
    helicopter,
    grandCanyon,
    planning,
    caribbean
  }
}

exports.sectionals = async () => {
  const html = await fetchVfr()
  return parseSectionals(html)
}
exports.terminalArea = async () => {
  const html = await fetchVfr()
  return parseTerminalArea(html)
}
exports.helicopter = async () => {
  const html = await fetchVfr()
  return parseHelicopter(html)
}
exports.grandCanyon = async () => {
  const html = await fetchVfr()
  return parseGrandCanyon(html)
}
exports.planning = async () => {
  const html = await fetchVfr()
  return parsePlanning(html)
}
exports.caribbean = async () => {
  const html = await fetchVfr()
  return parseCaribbean(html)
}

const parseSectionals = html => {
  return parseVfrTable(html, '#sectional table')
}
const parseTerminalArea = html => {
  return parseVfrTable(html, '#terminalArea table')
}
const parseHelicopter = html => {
  return parseVfrTable(html, '#helicopter table')
}
const parseGrandCanyon = html => {
  return parseVfrTable(html, '#grandCanyon table')
}
const parsePlanning = html => {
  return parseVfrTable(html, '#Planning table')
}
const parseCaribbean = html => {
  return parseVfrTable(html, '#caribbean table')
}
