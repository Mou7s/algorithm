// 哈希表（一）：抽屉 = 边看边记
// 运行：node hash_01_first_duplicate.js

// ---- 笨办法：两两比 ----
function firstDupBrute(a) {
  let cmp = 0                        // 数一下总共比了多少次
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      cmp++
      if (a[i] === a[j]) return { val: a[i], cmp }
    }
  }
  return { val: null, cmp }
}

// ---- 哈希表办法：一个抽屉柜 ----
function firstDupHash(a, log) {
  let cmp = 0                        // 数一下总共查了多少次
  const seen = new Set()             // 抽屉柜：Set 就是"只记有没有"的哈希表
  for (const x of a) {
    cmp++
    if (seen.has(x)) {               // 问抽屉：见过吗？
      if (log) console.log(`   看到 ${x} → 抽屉里 ${x} 已经有了 → 就是它（查了 ${cmp} 次）`)
      return { val: x, cmp }
    }
    seen.add(x)                      // 没见过，放进去
    if (log) console.log(`   看到 ${x} → 抽屉里没有 → 放进去（当前抽屉：${[...seen].join(',')}）`)
  }
  return { val: null, cmp }
}

console.log('=== 小例子：[3,1,7,3,5] 找第一个重复的数 ===')
console.log('哈希表办法的过程：')
const small = firstDupHash([3, 1, 7, 3, 5], true)
console.log('   答案：', small.val)
const smallBrute = firstDupBrute([3, 1, 7, 3, 5])
console.log(`   笨办法同样答案 ${smallBrute.val}，但它比了 ${smallBrute.cmp} 次`)

console.log('')
console.log('=== 工作量对比（真数出来的循环次数）===')
console.log('最坏情况：重复的两个数刚好是最后两个，笨办法必须把前面的对都比完')
console.log('数组大小 | 笨办法两两比 | 哈希表查抽屉')
for (const n of [10, 100, 1000, 5000]) {
  const arr = Array.from({ length: n - 1 }, (_, i) => i)  // 0..n-2，全不重复
  arr.push(n - 2)                                         // 最后再放一个 n-2，重复的是最末两个
  const b = firstDupBrute(arr).cmp
  const h = firstDupHash(arr).cmp
  console.log(`${String(n).padStart(8)} | ${String(b).padStart(12)} | ${String(h).padStart(10)}`)
}
