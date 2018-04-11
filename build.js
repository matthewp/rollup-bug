const rimraf = require('rimraf-then');
const rollup = require('rollup');
const writeFile = require('then-write-file');
const DIST = __dirname + '/dist';

async function run() {
  let bundle = await rollup.rollup({
    input: __dirname + '/main.js',
    acorn: {
      allowReserved: true,
      ecmaVersion: 9
    },
    experimentalPreserveModules: true,
  });

  let out = await bundle.generate({
    format: 'es'
  });

  await rimraf(DIST);
  let p = [];

  for(let [chunkName, source] of Object.entries(out)) {
    p.push(writeFile(DIST + '/' + chunkName, source.code));
  }

  await Promise.all(p);
}

run();
