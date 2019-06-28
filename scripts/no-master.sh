#! /usr/env/bin sh

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
if [ "$branch" == "master" ]
then
    echo "\n>> Dont push to master directly

    Pleas use the bump script as documented in README.md
"

exit 1
fi