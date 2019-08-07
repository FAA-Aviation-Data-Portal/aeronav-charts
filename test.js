/* global describe, it */

const assert = require('chai').assert
const aeronav = require('./index')

describe('aeronav-charts', () => {
  it('should exist', () => {
    assert(aeronav !== undefined)
  })
  it('should expose vfr functions', () => {
    assert(aeronav.vfr !== undefined)
    assert(aeronav.vfr.sectionals !== undefined)
    assert(aeronav.vfr.terminalArea !== undefined)
    assert(aeronav.vfr.helicopter !== undefined)
    assert(aeronav.vfr.grandCanyon !== undefined)
    assert(aeronav.vfr.planning !== undefined)
    assert(aeronav.vfr.caribbean !== undefined)
  })
  it('should expose ifr functions', () => {
    assert(aeronav.ifr !== undefined)
    assert(aeronav.ifr.enrouteLow !== undefined)
    assert(aeronav.ifr.enrouteHigh !== undefined)
    assert(aeronav.ifr.enrouteLowHighAlaska !== undefined)
    assert(aeronav.ifr.enrouteArea !== undefined)
    assert(aeronav.ifr.enrouteHawaiiPacific !== undefined)
    assert(aeronav.ifr.planning !== undefined)
    assert(aeronav.ifr.gulf !== undefined)
  })
})
