const hyphenList = arr => arr.reduce((list, imageFileName) => `${list}\n  - ${imageFileName}`, '')

exports.hyphenList = hyphenList
