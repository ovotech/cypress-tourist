#! /usr/env/bin sh

SEMVER_VERSION=$1

echo "$SEMVER_VERSION"

if ! [[ "$SEMVER_VERSION" =~ ^major|minor|patch$ ]]; then
    echo "> invalid semver"

    exit 1
fi

echo "> Attempting npm version bump..."
VERSION=$(npm version "$SEMVER_VERSION")
echo "> Bumped to version $VERSION"

echo "> Tagging and releasing"
git tag "$VERSION" && git push --tags

echo "Done!"
exit 0
