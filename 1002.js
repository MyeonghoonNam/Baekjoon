const readline = require('readline');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line.split(' ').map(el => parseInt(el)));
  
})
  .on('close', () => {
    const T = input[0];
    input.splice(0, 1);

    for(let info of input){
      let x1 = info[0];
      let y1 = info[1];
      let r1 = info[2];

      let x2 = info[3];
      let y2 = info[4];
      let r2 = info[5];
      
      const dist = Math.sqrt(
        Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2)
      );

      const radiusSum = r1 + r2;
      const radiusSub = Math.abs(r1 - r2);

      if(dist === 0 && radiusSub === 0){
        console.log(-1);
      } else if(dist < radiusSub || dist > radiusSum) {
        console.log(0);
      } else if(dist === radiusSub || dist === radiusSum){
        console.log(1);
      } else {
        // dist > radiusSub || dist < radiusSum
        console.log(2);
      }
    } 
    process.exit();
  })

// 두 점사이의 거리 0 , 반지름 차 0 => 같은 원
// 중심거리 < 반지름 차 => 원이 안만나며 작은 원이 큰 원 안에 포함
// 중심거리 > 반지름 합 => 원이 안만나며 두 원이 서로 떨어져있다.
// 중심거리 = 반지름 차 => 한 점에서 만나며 원이 내접.
// 중심거리 = 반지름 합 => 한 점에서 만나며 원이 외접.
// 중심거리 > 반지름 차 or 중심거리 < 반지름 합 => 원의 두 점에서 만난다.
