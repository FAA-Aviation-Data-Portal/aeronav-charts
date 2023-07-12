const cheerio = require('cheerio')

exports.parseVfrTable = (html, tableSelector, nthChild) => {
  const $ = cheerio.load(html)
  let table = $(tableSelector)

  if (nthChild !== undefined) {
    table = table[nthChild]
  }

  const data = $(table).find('tr').toArray().map(row => {
    const columns = $(row).find('td').toArray()

    if (columns.length < 3) {
      return null
    }

    const chartName = columns[0].children[0].data
    const currentEdition = columns[1]
    const nextEdition = columns[2]

    const currentLinks = $(currentEdition).find('a').toArray()
    const currentGeoTiffHref = currentLinks[0].children[0].parent.attribs.href
    const currentPdfHref = currentLinks[1].children[0].parent.attribs.href

    const nextLinks = $(nextEdition).find('a').toArray()
    let nextGeoTiffHref = null
    let nextPdfHref = null
    if (nextLinks.length > 0) {
      nextGeoTiffHref = nextLinks[0].children[0].parent.attribs.href
      nextPdfHref = nextLinks[1].children[0].parent.attribs.href
    }

    let currentSequenceNumber
    let currentReleaseDate
    if (currentEdition.children[0].data.match('–') || currentEdition.children[0].data.match('-')) {
      const splitter = currentEdition.children[0].data.match('–')
        ? ' – '
        : ' - '
      ;[currentSequenceNumber, currentReleaseDate] = currentEdition.children[0].data.split(splitter)
    } else {
      currentSequenceNumber = null
      currentReleaseDate = currentEdition.children[0].data
    }

    let nextEditionTitle
    if (nextEdition.children[0].data) {
      nextEditionTitle = nextEdition.children[0].data
    } else {
      nextEditionTitle = $(nextEdition).find('cfoutput').toArray()[0].children[0].data
    }

    let nextSequenceNumber
    let nextReleaseDate
    if (nextEditionTitle.match('-') || nextEditionTitle.match('–')) {
      const splitter = currentEdition.children[0].data.match('–')
        ? ' – '
        : ' - '
    ;[nextSequenceNumber, nextReleaseDate] = nextEditionTitle.split(splitter)
    } else {
      nextSequenceNumber = null
      nextReleaseDate = nextEditionTitle
    }

    return {
      chartName,
      currentEdition: {
        sequenceNumber: parseInt(currentSequenceNumber) || null,
        releaseDate: currentReleaseDate.trim(),
        geotiff: currentGeoTiffHref,
        pdf: currentPdfHref
      },
      nextEdition: {
        sequenceNumber: parseInt(nextSequenceNumber) || null,
        releaseDate: nextReleaseDate.trim(),
        geotiff: nextGeoTiffHref,
        pdf: nextPdfHref
      }
    }
  })
    .filter(x => !!x)

  return data
}
