#!/usr/bin/env sh
set -eo pipefail

if [ -z "${USER_ID}" ]; then
    echo "$$USER_ID not set"
    return 1
fi

if [ -z "${GROUP_ID}" ]; then
    echo "$$GROUP_ID not set"
    return 1
fi

echo ${USER_ID} ${GROUP_ID}
groupmod -g ${GROUP_ID} -o nginx
usermod -u ${USER_ID} -g nginx nginx

exec "$@"