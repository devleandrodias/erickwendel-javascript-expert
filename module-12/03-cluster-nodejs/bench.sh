URL=localhost:5000

npx autocannon $URL -m POST \
  --warmup [-c 1 -d 3] \
  --connections 500 \
  --pipeline 10 \
  --renderStatusCodes

cat log.txt | grep 29542 | wc -l

