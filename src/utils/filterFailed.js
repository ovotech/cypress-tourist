const FAILED = '(failed)'

export const filterFailed = fileArray => fileArray.filter(fileName => !fileName.includes(FAILED))
