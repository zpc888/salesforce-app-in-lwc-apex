ymd=$(date +%Y-%m-%d)

sf org create scratch -f config/project-scratch-def.json --username zpc-${ymd}@zpc.test.com -a zpc-${ymd} -d -y 30


