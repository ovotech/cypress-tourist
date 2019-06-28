import { WAIT_PERIOD } from './variables.json'

/* eslint-disable no-undef */
const sizes = ['iphone-6', 'macbook-13']

const visitAndSnap = url => {
  cy.visit(url)

  sizes.forEach(size => {
    const fileName = `${url}__${size}`.replace(/(http(s)*:\/\/)|\W/g, '_')

    cy.viewport(size)
    cy.wait(WAIT_PERIOD)
    cy.screenshot(fileName)
  })
}

const snap = (uniqueName) => {
  const fileName = uniqueName && 'uniqueName'.replace(/(http(s)*:\/\/)|\W/g, '_')

  cy.wait(WAIT_PERIOD)
  cy.screenshot(fileName)
}

exports.snap = snap
exports.visitAndSnap = visitAndSnap
