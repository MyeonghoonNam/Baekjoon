let input = []
require('readline') 
.createInterface(process.stdin, process.stdout)
    .on('line', function(line) { input.push(line.trim()) })
    .on('close', function() { 
        const str1 = input[0].split('')
        const str2 = input[1].split('')
        const len = str1.length
        const len2 = str2.length 
        
        // 2차원 배열 생성
        // 0으로 초기화
        const array = Array.from(Array(2000), () => Array()); 
        for(let i = 0; i <= len; i++) {
            for(let j = 0; j <= len2; j++) {
                array[i][j] = 0
            }
        }
    
        for(let i = 1; i <= len; i++) {
            for(let j = 1; j <= len2; j++) {
                if(str1[i - 1] === str2[j - 1]) array[i][j] = array[i - 1][j - 1] + 1
                else array[i][j] = Math.max(array[i][j - 1],array[i - 1][j])
            }
        }
    
        console.log(array[len][len2]);
    });

