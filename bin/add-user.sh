#!/usr/bin/env bash

fname=David
lname=Smith
email=david.smith@gmail.com
org=zpc-$(date +%Y-%m-%d)
default_org=true

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -h|--help) echo "Usage: bin/add-user.sh [-f|--fname first-name] [-l|--lname last-name] [-e|--email email] [-o|--org org-alias]"; exit 0 ;;
        -f|--fname) fname="$2"; shift ;;
        -l|--lname) lname="$2"; shift ;;
        -e|--email) email="$2"; shift ;;
        -o|--org) org="$2"; default_org=false; shift ;;
        *) echo "Unknown parameter passed: $1";  exit 1 ;;
    esac
    shift
done

if [ "$default_org" = true ] ; then
  uname=${email}.p$(date +%Y%m%d)
else
  suffix=$(echo $org | sed 's/[^0-9]*//g')
  uname=${email}.p${suffix}
fi

echo ""
echo "Creating scratch org user with the following details:"
echo "First Name: $fname"
echo "Last Name: $lname"
echo "Email: $email"
echo "Username: $uname"
echo "Target Org Alias: $org"
echo ""

cat bin/config/user-def-template.json | \
  sed "s/%fname%/$fname/" | \
  sed "s/%lname%/$lname/" | \
  sed "s/%email%/$email/" | \
  sed "s/%uname%/$uname/" \
  > /tmp/user-def.json

echo sf org create user --target-org $org --definition-file /tmp/user-def.json
sf org create user --target-org $org --definition-file /tmp/user-def.json
