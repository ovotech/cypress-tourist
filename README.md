# Cypress Tourist

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

![Take a picture](https://media.giphy.com/media/j5E9vHJSjBcDTXe4E4/source.gif)

Visit a place, take a picture. Compare.

Visual Regression tool for [Cypress] using [blink-diff].

## Features

- Separate processes for screenshot and comparing
- Supports typescript

## Directory Structure and concepts

Name | Location | Purpose
--- | --- | ---
champion | cypress/screenshots/champion | Location of the screenshots to be committed to the code-base.
challenger | cypress/screenshots/challenger | Location of the screenshots from the latest cypress run.
diff | cypress/screenshots/diff | Location of the diff'd screenshots.

## Workflow

1. The developer makes a code change.
1. The developer commits and tries to push the code.
1. The end-to-end test suite runs on the developers machine via a [pre-push hook], generating `challenger` screenshots.
1. `challenger` and `champion` screenshots are diff'ed.
1. Differences are flagged in the `diff` directory and the developer either approves by copying the `challenger` screenshot to the `champion` directory, or fixes the issues.
1. Developer commits the new `champion`'s and tries to push the code again.

The build pipeline would be the same process - failing the build.

Consider outputting the `diff` directory as build assets.

## Installation

Assuming you already have [cypress] installed and setup. 

```sh
npm install --dev @ovotech/cypress-tourist

# Alternatively if using yarn
yarn add dev @ovotech/cypress-tourist
```

Add the script to your `package.json`

```json
{
    "scripts": {
        "test-visual-regression": "cypress-tourist"
    }
}
```

For the first time running create the directories seen in the directory structure table above.

Append the following to your `.gitignore`

```
cypress/screenshots/*
!cypress/screenshots/champion
```

Then when visiting a place - instead of using the standard `cy.visit`...

**Note:** this takes two snapshot's of the app in the default viewports - `iphone-6` and `macbook-13`.

```js
import { visitAndSnap } from '@ovotech/cypress-tourist'

describe('Visual Regression', () => {
  it('captures a screenshot', () => {
    visitAndSnap('http://example.com')
  })
})
```

Alternatively if snapping a state change in the app...

**Note:** this takes a snapshot of the app in the current viewport and state only.

```js
import { snap } from '@ovotech/cypress-tourist'

describe('Visual Regression', () => {
  it('captures a screenshot - in existing state', () => {
    cy.visit('http://example.com')
    cy.find('.modal button').click()

    snap()
  })
})
```

As a final step run the diffing tool to compare.

```sh
npm run test-visual-regression
```

Your results will be logged to the console.

---

## Development

```sh
# Use nvm or node version as per .nvmrc
nvm use

# Install Dependencies
npm install

# Lint files
npm run lint
```

## Deploy

See [semver] for versioning incements.

```sh
# Commit all changes and then on the master branch
npm run bump [major|minor|patch]
```

## Todo

- [ ] Initialize with options such as custom device viewports, or a different wait time.
- [ ] Investigate parallel running.
- [ ] Different method of waiting for page load - ideally not time based.
- [ ] Investigate only diffing files with a different hash.
- [ ] Automated testing and greenkeeper to maintain latest dependencies.
- [ ] Allow for custom cypress directory - reading from cypress.json.
- [ ] Intitialization script to create the required folder structures.
- [ ] "approve" script to copy new challenger screenshots to champion.

## Contributing

Contributions and PR's welcome.

<!-- MARKDOWN REFERENCES -->

[blink-diff]: https://github.com/yahoo/blink-diff
[cypress]: https://www.cypress.io/
[pre-push hook]: https://github.com/typicode/husky
[semver]: https://semver.org/