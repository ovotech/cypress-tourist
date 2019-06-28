#! /usr/env/bin sh

SEMVER_VERSION=$1

echo "$SEMVER_VERSION"

if ! [[ "$SEMVER_VERSION" =~ ^major|minor|patch$ ]]; then
echo ">> Invalid semver

    Please use:
    - major
    - minor
    - patch

See README.md for more information.
"

    exit 1
fi

echo ">> Tagging..."
VERSION=$(npm version "$SEMVER_VERSION")

if [ -z "$VERSION" ]; then
    echo "\n>> npm failure\n"
    exit 1
fi 

echo ">> Successfully bumped and tagged to version $VERSION"

echo ">> Releasing"
git push --tags --no-verify


echo ">> Attempt to update version on master"
git push origin master --no-verify 2>&1

echo ">> Done!"
exit 0
