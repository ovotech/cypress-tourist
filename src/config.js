const path = require('path')
const { CHAMPION, CHALLENGER, DIFF } = require('./variables.json')

const { PWD } = process.env
const SCREENSHOT_ROOT = path.join(PWD, 'cypress', 'screenshots')

const PATH_CHAMPION = process.env.PATH_CHAMPION || path.join(SCREENSHOT_ROOT, CHAMPION)
const PATH_CHALLENGER = process.env.PATH_CHALLENGER || path.join(SCREENSHOT_ROOT, CHALLENGER)
const PATH_DIFF = process.env.PATH_DIFF || path.join(SCREENSHOT_ROOT, DIFF)

const config = {
  FILE_EXT: 'png',
  PATH_CHALLENGER,
  PATH_CHAMPION,
  PATH_DIFF,
  THRESHOLD_PERCENT: 0
}

module.exports = config
