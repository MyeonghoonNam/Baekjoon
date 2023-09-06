const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

rl.on('line', line => {
  const radius = parseInt(line);

  const euclid = Math.PI * Math.pow(radius, 2);
  const taxi =  2 * Math.pow(radius, 2);

  console.log(euclid.toFixed(6));
  console.log(taxi.toFixed(6));

  rl.close();
})
  .on('close', () => {
    process.exit();
  })