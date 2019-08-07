const aeronavCharts = require('./index.js')

aeronavCharts.vfr.sectionals().then(results => {
  console.log(results[0])
})
// aeronavCharts.vfr.terminalArea().then(results => {
//   console.log(results[0])
// })
// aeronavCharts.vfr.helicopter().then(results => {
//   console.log(results[0])
// })
// aeronavCharts.vfr.grandCanyon().then(results => {
//   console.log(results[0])
// })
// aeronavCharts.vfr.planning().then(results => {
//   console.log(results[0])
// })
// aeronavCharts.vfr.caribbean().then(results => {
//   console.log(results[0])
// })

// aeronavCharts.ifr.enrouteLow().then(results => {
//   console.log(results[0])
// })
// aeronavCharts.ifr.enrouteHigh().then(results => {
//   console.log(results[0])
// })
// aeronavCharts.ifr.enrouteLowHighAlaska().then(results => {
//   console.log(results[0])
// })
// aeronavCharts.ifr.enrouteArea().then(results => {
//   console.log(results[0])
// })
// aeronavCharts.ifr.enrouteHawaiiPacific().then(results => {
//   console.log(results[0])
// })
// aeronavCharts.ifr.planning().then(results => {
//   console.log(results[0])
// })
// aeronavCharts.ifr.gulf().then(results => {
//   console.log(results[0])
// })
