echo $'\n\n[requesting: normal request]'
curl -i localhost:4000 -X POST --data '{"name": "Batman", "age": 30}'

echo $'\n\n[requesting: wrong age]'
curl -i localhost:4000 -X POST --data '{"name": "Batman", "age": 10}'

echo $'\n\n[requesting: wrong name]'
curl -i localhost:4000 -X POST --data '{"name": "AB", "age": 10}'

echo $'\n\n[requesting: connection error]'
curl -i localhost:4000 -X POST --data '{"connectionError": "TRUE"}'