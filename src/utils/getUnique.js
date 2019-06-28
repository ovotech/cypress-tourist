const { CHALLENGER, CHAMPION } = require('../names.json')

const challengerChampionRegex = new RegExp(`${CHALLENGER}|${CHAMPION}`)

const standardise = arr => arr.map(path => path.replace(challengerChampionRegex, ''))

const getUniquePaths = (parent, child) => {
  if (parent.length === 0) {
    return parent
  }

  if (child.length === 0) {
    return parent
  }

  const standardParent = standardise(parent)
  const standardChild = standardise(child)

  return parent.filter((_, index) => !standardChild.includes(standardParent[index]))
}

exports.getUnique = getUniquePaths
