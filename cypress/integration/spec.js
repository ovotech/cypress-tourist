import { visitAndSnap } from '../../src/index'

const URL = 'localhost:3000'

describe('Visual Regression', () => {
  it('captures a screenshot', () => {
    visitAndSnap(URL)
  })
})
