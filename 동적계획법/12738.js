const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const input = [];
rl.on('line', line => {
  input.push(line.split(' ').map(el => parseInt(el)));
})
  .on('close', () => {
    const N = input[0][0];
    const numbers = input[1];
    const list = [numbers[0]];

    for (let i = 1; i < numbers.length; i++) {
      const num = numbers[i]
      if(list[list.length-1] < num){
          list.push(num)
      } else {
          const idx = binarySearch(num)
          list[idx] = num
      }
      
    }
    
    console.log(list.length);
    process.exit();

    function binarySearch(target){
      let low = 0;
      let high = list.length;

      while (low < high) {
        let mid = Math.floor((low + high) / 2)

        if(list[mid] < target){
            low = mid + 1;
        } else {
            high = mid;
        }
      }

      return high;
    }
  })