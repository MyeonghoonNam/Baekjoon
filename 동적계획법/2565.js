let input = [] 
require('readline') 
 .createInterface(process.stdin, process.stdout) 
 .on('line', function(line) 
   { input.push(line.trim()) }) 
 .on('close', function() { 
    // 입력값 처리 및 출력 
    let max = 0 
    // 전선 마지막 번호 체크 
    let zeroCount = 0; 
    
    // 배열 처리 
    // 배열 0으로 초기화 
    const beamLine = Array.apply(null, Array(501)).map(Number.prototype.valueOf,0) 
    // input의 첫번째 인자 제거 
    input.shift() 
    // 전깃줄 값 배정 
    input.forEach(v => { 
      const vArr = v.split(' ').map(v=>v*1) 
      const i = vArr[0] 
      const value = vArr[1] 
      beamLine[i] = value 
        
      if(max < i) max = i 
    }) 
    
    beamLine.forEach((v,i)=> { 
      if(v === 0 && i !== 0 && i < max) { zeroCount++ } 
    }) 
    // 줄 없는 번호 제거 
    const arr = beamLine.filter(v=>v !== 0) 
    
    //lts 진행 
    // dp 
    let dp = [] 
    const result = arr.reduce((max, val, i) => { 
        const curDp = dp.reduce((maxVal,curVal,j) => arr[j] < arr[i] && curVal > maxVal ? curVal : maxVal, 0) + 1 
        dp.push(curDp) 
        return max < curDp ? curDp : max 
    },0) 
    
    console.log(max - result - zeroCount) 
  });

