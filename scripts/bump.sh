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

echo ">> Attempting npm version bump..."
VERSION=$(npm version "$SEMVER_VERSION")

if [ -z "$VERSION" ]; then
    echo "\n>> npm failure\n"
    exit 1
fi 

echo ">> Bumped to version $VERSION"

echo ">> Tagging and releasing"
git tag "$VERSION" && git push --tags

echo "Done!"
exit 0
