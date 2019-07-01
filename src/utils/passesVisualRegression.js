const path = require('path')

const BlinkDiff = require('blink-diff')

const { THRESHOLD_PERCENT } = require('../config')
const { CHALLENGER, CHAMPION, DIFF } = require('../variables.json')

const { sep } = path
const championRegex = new RegExp(`${CHAMPION}.*${sep}`)

const passesVisualRegression = imageFileName => {
  const diff = new BlinkDiff({
    imageAPath: imageFileName,
    imageBPath: imageFileName.replace(CHAMPION, CHALLENGER),
    imageOutputPath: imageFileName.replace(championRegex, `${DIFF}${sep}`),
    imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT,
    hideShift: true,
    threshold: THRESHOLD_PERCENT,
    thresholdType: BlinkDiff.THRESHOLD_PERCENT
  })

  return new Promise((resolve, reject) =>
    diff.run((error, result) => {
      if (error) {
        throw new Error(error)
      }

      if (diff.hasPassed(result.code)) {
        return resolve({ imageFileName, passed: true })
      }

      return resolve({ imageFileName, passed: false })
    })
  )
}

exports.passesVisualRegression = passesVisualRegression
