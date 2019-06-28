# Cypress Tourist

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

![Take a picture](https://media.giphy.com/media/j5E9vHJSjBcDTXe4E4/source.gif)

Visit a place, take a picture. Compare.

Visual Regression tool for [Cypress] using [blink-diff].

## Features

- Separate processes for screenshot and comparing
- Supports typescript

## Directory Structure and concepts

Name | Location | Description | Intent
--- | --- | --- | ---
champion | cypress/screenshots/champion | Location of the screenshots to be committed to the code-base. | In first place
challenger | cypress/screenshots/challenger | Location of the screenshots from the latest cypress run. | Challenging first place
diff | cypress/screenshots/diff | Location of the diff'd screenshots. | Differences between the champion and challenger

## Ideal Workflow

Below outlines an ideal workflow for integrating visual regression into a project.

1. The developer makes a code change.
1. The developer commits and tries to push the code.
1. The end-to-end test suite runs on the developers machine via a [pre-push hook], generating `challenger` screenshots.
1. Once the end-to-end test suite completes, the visual regression script is run and `challenger` and `champion` screenshots are diff'ed.
1. Differences are flagged in the `diff` directory and the developer either approves by copying the `challenger` screenshot to the `champion` directory, or fixes the issues raised.
1. Developer commits the new `champion`'s and tries to push the code again.

The build pipeline would also follow a similar process, failing the build should there be any visual regression the developer inadvertently introduced.

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

Append the following to your `.gitattributes` file - or create one if it doesn't exist. This prevents git diff'ing the image binaries and storing the deltas - bloating the repo size.

```
*.png binary
```

Add to your `cypress.json` file

```json
{
  "screenshotsFolder": "cypress/screenshots/challenger"
}
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

Alternatively if snapshotting a UI state change in the app, for example a modal popping up after clicking a button...

**Note:** this takes a single snapshot of the app in the current viewport and state only

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

Running Cypress as you would through your e2e test script, a set of screenshots will be produced in the `champion` directory.

As a final step run the `test-visual-regression` script.

```sh
npm run test-visual-regression
```

Your results will be logged to the console.

## Possible gotcha's

- Ensure you've stubbed out [dynamic data and fetches] - things like [times and dates].
- Items like [Sticky headers will need to be hidden or fixed] when capturing screenshots.

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

See [semver] for versioning increments.

```sh
# Commit all changes and then on the master branch
npm run bump [major|minor|patch]
```

## Todo

- [ ] "approve" script to copy new challenger screenshots to champion.
- [ ] Allow for custom cypress directory - reading from cypress.json.
- [ ] Automated testing and greenkeeper to maintain latest dependencies.
- [ ] Different method of waiting for page load - ideally not time based.
- [ ] Initialize with options such as custom device viewports, or a different wait time.
- [ ] Investigate only diffing files with a different hash.
- [ ] Investigate parallel running.

## Contributing

Contributions and PR's welcome.

<!-- MARKDOWN REFERENCES -->

[blink-diff]: https://github.com/yahoo/blink-diff
[cypress]: https://www.cypress.io/
[dynamic data and fetches]: https://docs.cypress.io/guides/guides/network-requests.html#Testing-Strategies
[pre-push hook]: https://github.com/typicode/husky
[semver]: https://semver.org/
[Sticky headers will need to be hidden or fixed]: https://docs.cypress.io/api/commands/screenshot.html#Full-page-captures-and-fixed-sticky-elements
[times and dates]: https://docs.cypress.io/api/commands/clock.html#Syntax