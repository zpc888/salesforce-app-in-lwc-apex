#!/usr/bin/env bash

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 lwc-name lwc-path"
  exit 1
fi

LWC_NAME=$1
LWC_PATH=$2

# Check if the LWC path ends with /lwc
if [[ ! "$LWC_PATH" =~ /lwc$ ]]; then
  echo "Error: LWC path must end with /lwc, but got '$LWC_PATH'"
  exit 2
fi

sf lightning generate component --name $LWC_NAME --type lwc -d $LWC_PATH
cd $LWC_PATH/$LWC_NAME
touch $LWC_NAME.css
echo -e '@import "c/p2CoStyle";\n' > $LWC_NAME.css

touch $LWC_NAME-i18n.js
echo -e 'export const en = {\n};\n' > $LWC_NAME-i18n.js
echo -e 'export const fr = {\n};\n' >> $LWC_NAME-i18n.js

cd -
