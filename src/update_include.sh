#!/usr/bin/env bash

find ./*.blocks -name '*.css' | awk '{ print "@import \"" $0 "\";" ; }' >style.css

echo 'import { BemJson, compile, Render } from "./microbem"' >template-engine.ts
find ./*.blocks -name '*.ts'| awk -F/ ' { \
  file=substr($0, 0, length($0) - 3); \
  name=substr($NF, 0, length($NF) - 3); \
  gsub("-", "", name); \
  print "import " name " from \"" file "\"" \
} ' >>template-engine.ts
echo "const render: Render = compile((block) => {" >>template-engine.ts
find ./*.blocks -name '*.ts'| awk -F/ ' { \
  name=substr($NF, 0, length($NF) - 3); \
  gsub("-", "", name); \
  print "  " name "(block)" } ' >>template-engine.ts
echo '})' >>template-engine.ts
echo 'export default (obj: BemJson) => render(obj)' >>template-engine.ts

