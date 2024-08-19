⚠️ This project has been deprecated. ⚠️

**This package is no longer maintained and will be deleted in 30 days.**

# aeronav-charts

Fetch links and metadata for charts provided by Aeronav in a sane format.

[![NPM Version][npm-image]][npm-url]

## Installation

```console
$ npm install --save @faa-aviation-data-portal/aeronav-charts
```

## Usage

```js
const aeronavCharts = require('@faa-aviation-data-portal/aeronav-charts')

aeronavCharts.vfr.sectionals().then(results => {
  console.log(results[2])
})
```

### Output

```js
{
  chartName: 'Atlanta',
  currentEdition: {
    sequenceNumber: 102,
    releaseDate: 'Feb 28 2019',
    geotiff: 'https://aeronav.faa.gov/content/aeronav/sectional_files/Atlanta_102.zip',
    pdf: 'https://aeronav.faa.gov/content/aeronav/sectional_files/PDFs/Atlanta_102_P.pdf'
  },
  nextEdition: {
    sequenceNumber: 103,
    releaseDate: 'Aug 15 2019',
    geotiff: 'https://aeronav.faa.gov/content/aeronav/sectional_files/Atlanta_103.zip',
    pdf: 'https://aeronav.faa.gov/content/aeronav/sectional_files/PDFs/Atlanta_103_P.pdf'
  }
}
```

See [`./example.js`](./example.js) for more examples.

## API

### VFR Charts

#### `aeronavCharts.vfr.all()`
#### `aeronavCharts.vfr.sectionals()`
#### `aeronavCharts.vfr.terminalArea()`
#### `aeronavCharts.vfr.helicopter()`
#### `aeronavCharts.vfr.grandCanyon()`
#### `aeronavCharts.vfr.planning()`
#### `aeronavCharts.vfr.caribbean()`

### IFR Charts

#### `aeronavCharts.ifr.all()`
#### `aeronavCharts.ifr.enrouteLow()`
#### `aeronavCharts.ifr.enrouteHigh()`
#### `aeronavCharts.ifr.enrouteLowHighAlaska()`
#### `aeronavCharts.ifr.enrouteArea()`
#### `aeronavCharts.ifr.enrouteHawaiiPacific()`
#### `aeronavCharts.ifr.planning()`
#### `aeronavCharts.ifr.gulf()`

## Contributing

Contributions welcome!

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[npm-url]: https://www.npmjs.com/package/@faa-aviation-data-portal/aeronav-charts
[npm-image]: https://img.shields.io/npm/v/@faa-aviation-data-portal/aeronav-charts.svg?style=flat
