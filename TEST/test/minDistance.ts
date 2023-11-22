function minDistance(word1: string, word2: string): number {
    // 任意一个字符串为空时，执行非空字符串长度次数的增或删
    if(word1 === '' || word2 === '') {
      return word1.length + word2.length
    }
  
    const dp = new Map()
  
    function getDp(i: number, j: number) {
      return dp.get(`${i},${j}`)
    }
  
    function calcDp(i: number, j: number) {
      // 兼容下边界情况
      if (i === 0 && j === 0) {
        return word1[0] === word2[0] ? 0 : 1
      }
  
      if (word1[i] === word2[j]) {
        return getDp(i-1, j-1)
      }
  
      return Math.min(
        // i-1, j: 删除第 i 项
        getDp(i-1, j) + 1,
        // i, j-1: 增加第 i 项
        getDp(i, j-1) + 1,
        // i-1, j-1: 替换第 i 项
        getDp(i-1, j-1) + 1
      )
    }
  
    for (let i = 0; i < word1.length; i++) {
      dp.set(`${i},-1`, i + 1)
    }
  
    for (let j = 0; j < word2.length; j++) {
      dp.set(`-1,${j}`, j + 1)
    }
    
    for (let i = 0; i < word1.length; i++) {
      for (let j = 0; j < word2.length; j++) {
        dp.set(`${i},${j}`, calcDp(i, j))
      }  
    }
  
    return getDp(word1.length-1, word2.length-1)
};

console.log()
console.log(minDistance('horse', 'ros'))
