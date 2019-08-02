/* global describe, it */

const assert = require('chai').assert
const aeronav = require('./index')

describe('rvr', () => {
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
})
