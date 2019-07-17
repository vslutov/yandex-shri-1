#!/usr/bin/env bash

find ./*.blocks -name '*.css' | awk '{ print "@import \"" $0 "\";" ; }' >style.css

echo 'import { BemJson, compile, Render } from "./microbem"' >template-engine.ts
find ./*.blocks -name '*.ts'| awk -F/ ' { print "import " substr($NF, 0, length($NF) - 3) " from \"" substr($0, 0, length($0) - 3) "\"" } ' >>template-engine.ts
echo "const render: Render = compile((block) => {" >>template-engine.ts
find ./*.blocks -name '*.ts'| awk -F/ ' { print "  " substr($NF, 0, length($NF) - 3) "(block)" } ' >>template-engine.ts
echo '})' >>template-engine.ts
echo 'export default (obj: BemJson) => render(obj)' >>template-engine.ts

