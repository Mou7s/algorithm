// Set 和 Map 的区别
// 运行：node hash_03_map_vs_set.js

// ---- Set：只装"东西本身"，只能说"有没有" ----
const s = new Set()
s.add(3)
s.add(3)                       // 重复的加不进去，抽屉里还是一个 3
console.log('Set：', [...s], '  size =', s.size)
console.log('  问 3 见过吗？ s.has(3) =', s.has(3))
console.log('  那 3 在第几个位置？ → 想用 s.get(3)：')
try {
  console.log(s.get(3))
} catch (e) {
  console.log('   ❌', e.constructor.name + ': ' + e.message)
}
console.log('  结论：Set 记不住"位置"，它只记"有没有"')
console.log('')

// ---- Map：装"钥匙 → 一张纸条"，纸条上写什么都行 ----
const m = new Map()
m.set(3, 0)                    // 钥匙 3，纸条写 0（它在数组里的下标）
m.set(7, 1)
console.log('Map：', [...m], '  size =', m.size)
console.log('  问 3 见过吗？ m.has(3) =', m.has(3))
console.log('  ✅ 3 在第几个位置？ m.get(3) =', m.get(3))
console.log('')

// ---- 纸条还能写"出现过几次" ----
const count = new Map()
for (const x of [3, 1, 3, 7, 3]) count.set(x, (count.get(x) || 0) + 1)
console.log('计数：', [...count].map(([k, v]) => `${k}出现${v}次`).join('  '))
console.log('')

// ---- 同一道题，用 Set 就答不了 ----
const nums = [2, 7, 11, 15], target = 9
const setOnly = new Set()
let ansWithSet = null
for (let i = 0; i < nums.length; i++) {
  const need = target - nums[i]
  if (setOnly.has(need)) { ansWithSet = '找到了配对，但不知道它在第几位（Set 没有 get）'; break }
  setOnly.add(nums[i])
}
console.log('两数之和用 Set：', ansWithSet)
console.log('两数之和用 Map：', '能直接答出 [0,1]，因为 Map 里有"下标"这张纸条')
