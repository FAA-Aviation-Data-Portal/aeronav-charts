const superagent = require('superagent')
const cheerio = require('cheerio')

const baseURI = 'https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/'

// Main method / shortcut to fetch
module.exports = {
  vfr: {}
}

const fetchVfr = async () => {
  try {
    const response = await superagent
      .get(`${baseURI}/vfr`)
    return response.text
  } catch (err) {
    console.error(`Error fetching values from ${baseURI}`, err)
  }
}

module.exports.vfr.sectionals = async () => {
  const html = await fetchVfr()
  return parseVfrTable(html, '#sectional table')
}
module.exports.vfr.terminalArea = async () => {
  const html = await fetchVfr()
  return parseVfrTable(html, '#terminalArea table')
}
module.exports.vfr.helicopter = async () => {
  const html = await fetchVfr()
  return parseVfrTable(html, '#helicopter table')
}
module.exports.vfr.grandCanyon = async () => {
  const html = await fetchVfr()
  return parseVfrTable(html, '#grandCanyon table')
}
module.exports.vfr.planning = async () => {
  const html = await fetchVfr()
  return parseVfrTable(html, '#Planning table')
}
module.exports.vfr.caribbean = async () => {
  const html = await fetchVfr()
  return parseVfrTable(html, '#caribbean table')
}

const parseVfrTable = (html, tableSelector) => {
  const $ = cheerio.load(html)
  const table = $(tableSelector)

  const data = $(table).find('tr').toArray().map(row => {
    const columns = $(row).find('td').toArray()

    if (columns.length < 3) {
      return null
    }

    const chartName = columns[0].children[0].data
    const currentEdition = columns[1]
    const nextEdition = columns[2]

    const currentLinks = $(currentEdition.children[1]).find('a').toArray()
    const currentGeoTiffHref = currentLinks[0].children[0].parent.attribs.href
    const currentPdfHref = currentLinks[1].children[0].parent.attribs.href

    const nextLinks = $(nextEdition.children[1]).find('a').toArray()
    let nextGeoTiffHref = null
    let nextPdfHref = null
    if (nextLinks.length > 0) {
      nextGeoTiffHref = nextLinks[0].children[0].parent.attribs.href
      nextPdfHref = nextLinks[1].children[0].parent.attribs.href
    }

    const sequenceDateSplitter = currentEdition.children[0].data.match('–')
      ? ' – '
      : ' - '

    let nextEditionTitle
    if (nextEdition.children[0].data) {
      nextEditionTitle = nextEdition.children[0].data
    } else {
      nextEditionTitle = $(nextEdition).find('cfoutput').toArray()[0].children[0].data
    }

    return {
      chartName,
      currentEdition: {
        sequenceNumber: parseInt(currentEdition.children[0].data.split(sequenceDateSplitter)[0]),
        releaseDate: currentEdition.children[0].data.split(sequenceDateSplitter)[1],
        geotiff: currentGeoTiffHref,
        pdf: currentPdfHref
      },
      nextEdition: {
        sequenceNumber: parseInt(nextEditionTitle.split(sequenceDateSplitter)[0]),
        releaseDate: nextEditionTitle.split(sequenceDateSplitter)[1],
        geotiff: nextGeoTiffHref,
        pdf: nextPdfHref
      }
    }
  })
    .filter(x => !!x)

  return data
}
