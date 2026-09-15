// 哈希表（二）：两数之和（LeetCode 1）
// 运行：node 07_twosum.js

// 抽屉里这次不只记"有没有"，还要记"它上一次在第几个位置" → 用 Map
function twoSum(nums, target, log) {
  const seen = new Map()             // 抽屉： 数值 -> 下标
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]     // 先算：还差多少
    if (log) console.log(`   第${i}位是 ${nums[i]}，还差 ${need} → 问抽屉有没有 ${need}：${seen.has(need) ? '有' : '没有'}`)
    if (seen.has(need)) {             // 再问抽屉
      const j = seen.get(need)
      if (log) console.log(`   → 找到：下标 ${j} 的 ${nums[j]} + 下标 ${i} 的 ${nums[i]} = ${target}`)
      return [j, i]                   // 找到了，返回两个下标
    }
    seen.set(nums[i], i)              // 最后才把当前这个数放进抽屉
    if (log) console.log(`      （没找到，把 ${nums[i]} 记到抽屉：位置 ${i}）`)
  }
  return null                         // 走完都没有
}

console.log('=== [2,7,11,15] 目标是 9 ===')
console.log('   结果：', JSON.stringify(twoSum([2, 7, 11, 15], 9, true)))

console.log('')
console.log('=== 换个例子：[3,2,4] 目标是 6 ===')
console.log('   结果：', JSON.stringify(twoSum([3, 2, 4], 6, true)))

// ---- 证伪：先放后查会怎样 ----
function twoSumWrong(nums, target) {
  const seen = new Map()
  for (let i = 0; i < nums.length; i++) {
    seen.set(nums[i], i)              // 先把当前这个数放进去（错在这里）
    const need = target - nums[i]
    if (seen.has(need)) return [seen.get(need), i]
  }
  return null
}
console.log('')
console.log('=== 故意写错：先放抽屉再查 ===')
console.log('   正确写法 twoSum([3], 6)      →', JSON.stringify(twoSum([3], 6)))
console.log('   先放后查 twoSumWrong([3], 6) →', JSON.stringify(twoSumWrong([3], 6)), '← 同一个数用了两次')

// ---- 对拍 ----
// 注意：两数之和可能有多个正确答案（比如 [1,2,3] 目标 5 可以是 2+3），
// 所以不能直接比"跟暴力一样"，要比"答案本身对不对"：
//   两边都无解 → 算过；都有解 → 各自验证下标不同 + 两数之和等于目标。
function brute(nums, target) {
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++)
      if (nums[i] + nums[j] === target) return [i, j]
  return null
}
const valid = (nums, target, ans) => {
  if (ans === null) return false
  const [i, j] = ans
  return Number.isInteger(i) && Number.isInteger(j) && i !== j &&
    i >= 0 && j >= 0 && i < nums.length && j < nums.length &&
    nums[i] + nums[j] === target
}

let cases = 0, bothNone = 0, bothOk = 0, disagree = 0, wrongAnswer = 0
for (let t = 0; t < 2000; t++) {
  const n = 2 + Math.floor(Math.random() * 8)
  const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 20))
  const target = Math.floor(Math.random() * 40)
  cases++
  const a = twoSum(nums, target)
  const b = brute(nums, target)
  if (a === null && b === null) bothNone++
  else if (a === null && b !== null) disagree++          // 有解却漏了
  else if (a !== null && b === null) disagree++          // 无解却编了一个
  else if (valid(nums, target, a)) bothOk++              // 有解，且我的答案自己站得住
  else wrongAnswer++                                     // 有解，但我的答案不满足条件
}
console.log('')
console.log(`随机对拍 2000 组：`)
console.log(`  两边都无解        ：${bothNone}`)
console.log(`  两边都有解且我的答案合法：${bothOk}`)
console.log(`  有没有解判断不一致：${disagree}`)
console.log(`  答案不满足条件的  ：${wrongAnswer}`)
