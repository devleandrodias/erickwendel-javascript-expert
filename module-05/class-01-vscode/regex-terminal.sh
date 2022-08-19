# # a partir da pasta raiz
find . -name *.test.js -not -path "*node_modules/*"

find . -name *.js -not -path "*node_modules/*"
find . -name *.js -not -path "*node_modules/*" | ipt

CONTENT="'use strict';"

find . -name *.js -not -path '*node_modules/*' | ipt -o | xargs -I '{file}' echo 'ae' {file} sed -i "" -e '1s/^/\'$CONTENT'\
\g' {file}

# 1s => primeira linha
# ^ => primeira coluna
# Substitui pelo $CONTENT
# Quebrou a linha para adicionar um \n implicito