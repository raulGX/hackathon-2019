#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
export GOPATH="$parent_path"
echo $GOPATH