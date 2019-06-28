const path = require('path')

const fg = require('fast-glob')
const chalk = require('chalk')
const cpFile = require('cp-file')

const { notEmpty } = require('./utils/notEmpty')
const { getUnique } = require('./utils/getUnique')
const { hyphenList } = require('./utils/hyphenList')
const { passesVisualRegression } = require('./utils/passesVisualRegression')
const { filterFailed } = require('./utils/passesVisualRegression')

const { FILE_EXT, PATH_CHALLENGER, PATH_CHAMPION, PATH_DIFF } = require('./config')
const { CHALLENGER, CHAMPION } = require('./variables.json')

const runVisualRegression = async () => {
  try {
    const unFilteredChampions = await fg(path.join(PATH_CHAMPION, '**', `*.${FILE_EXT}`))
    const unFilteredChallengers = await fg(path.join(PATH_CHALLENGER, '**', `*.${FILE_EXT}`))

    const champions = filterFailed(unFilteredChampions)
    const challengers = filterFailed(unFilteredChallengers)

    const noChallengers = getUnique(champions, challengers)
    const newChallengers = getUnique(challengers, champions)
    const validChampions = getUnique(champions, noChallengers)

    const listToDiff = Promise.all(validChampions.map(passesVisualRegression))

    const results = await listToDiff

    const failedList = results.filter(item => !item.passed)

    if (notEmpty(newChallengers)) {
      await Promise.all(newChallengers.map(challenger => cpFile(challenger, challenger.replace(CHALLENGER, CHAMPION))))

      console.log(
        chalk.green(
          `${chalk.bold('The following challengers did not exist and have been copied across:')}
          ${hyphenList(newChallengers)}\n`
        )
      )
    }

    if (notEmpty(noChallengers)) {
      console.log(
        chalk.yellow(
          `${chalk.bold('The following files did not have a corresponding challenger:')}
          ${hyphenList(noChallengers)}
          ${chalk.bold('\nConsider removing these files\n')}`
        )
      )
    }

    if (notEmpty(failedList)) {
      console.log(
        chalk.red(
          `${chalk.bold('The following files failed inspection:')}
          ${hyphenList(failedList.map(i => i.imageFileName))}
          ${chalk.bold(`\nOpen ${PATH_DIFF} for diff's\n`)}`
        )
      )
    }

    if (!notEmpty(failedList)) {
      console.log(chalk.green('All passed!\n'))
    }
  } catch (err) {
    console.trace(err)
    process.exitCode = 1
  }
}

exports.runVisualRegression = runVisualRegression
