./node_modules/.bin/webpack --config .\webpack.config.js --entry .\test\unit\components\operation.spec.js  --output ./bin/unittest.js --mode development --target node
mocha --require test/unit/setup.js .\bin\unittest.js

./node_modules/.bin/nyc --exclude-after-remap true ./node_modules/.bin/mocha --require ./test/unit/setup.js ./bin/unittest.js

./node_modules/.bin/nyc --exclude-after-remap true report --reporter=html

