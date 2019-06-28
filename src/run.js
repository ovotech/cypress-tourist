const { resetDirectory } = require('./utils/resetDirectory')
const { runVisualRegression } = require('./runVisualRegression')

const { PATH_DIFF } = require('./config')

const run = async () => {
  try {
    resetDirectory(PATH_DIFF)

    await runVisualRegression()
  } catch (e) {
    console.trace(e)
    process.exit(1)
  }
}

module.exports = run
