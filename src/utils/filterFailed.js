const FAILED = '(failed)'

const filterFailed = fileArray => fileArray.filter(fileName => !fileName.includes(FAILED))

exports.filterFailed = filterFailed
