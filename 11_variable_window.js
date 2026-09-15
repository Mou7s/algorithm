// 滑动窗口（二）：变长窗口 —— 最长无重复字符子串（LeetCode 3）
// 运行：node 11_variable_window.js
//
// 上一课：窗口大小固定 k，right 走一格，left 就跟着走一格（进一个、出一个）。
// 这一课：窗口大小不固定 ——
//
//   right：永远一格一格往右扩（扩大窗口）
//   left ：看着办。撞上重复就收，收到不重复为止（收缩窗口）
//
//   "abcabcbb"
//    └─┘              right 扩到 a 又出现 → left 收到 b
//      └─┘            right 扩到 b 又出现 → left 收到 c
//        └─┘          ... 窗口一会儿长一会儿短，最后最长的那次是 3
//
// 关键词只有一句：**右端无脑扩，左端按条件收**。

console.log('============================================================')
console.log('例 1：先用人眼数一个小的（还没写代码）')
console.log('============================================================')
console.log('"abbc" —— 找一段连续且里面字符都不重复的最长子串')
console.log('  人眼扫一遍：')
console.log('    a          长 1')
console.log('    ab         长 2')
console.log('    abb        ✗ 两个 b 重复了')
console.log('     b         长 1（重新从第二个 b 起）')
console.log('     bc        长 2')
console.log('     bbc       ✗')
console.log('    → 最长是 "abc" 吗？不是！"abc" 在 "abbc" 里不连续（abbc 中间是两个 b），')
console.log('      最长只能是 "ab" 或 "bc"，长 2。')
console.log('')

// ============================================================
// 写法一（直观版）：用一个 Set 当窗口内容，撞了就 left 一格一格挪
// ============================================================
function longestUniqueSet(s, log) {
  let left = 0
  let best = 0
  let bestRange = [0, -1]
  const win = new Set()                  // 窗口里现在都有哪些字符
  for (let right = 0; right < s.length; right++) {
    const inCh = s[right]
    const cost = []
    while (win.has(inCh)) {              // 撞车了：把左端一格一格挪出去，直到重复的那个离开窗口
      cost.push(s[left])
      win.delete(s[left])
      left++
    }
    win.add(inCh)
    const len = right - left + 1
    if (log) {
      const moved = cost.length ? `撞车！左端挪走 ${cost.map(c => `'${c}'`).join(' ')}` : '没撞车，不用收'
      console.log(`   第${right}位进来 '${inCh}' → ${moved} → 现在窗口 [${s.slice(left, right + 1)}] 长 ${len}`)
    }
    if (len > best) { best = len; bestRange = [left, right] }
  }
  return { best, str: s.slice(bestRange[0], bestRange[1] + 1) }
}

console.log('============================================================')
console.log('例 2：写法一（Set，左端一格一格挪）跑 "abcabcbb"')
console.log('============================================================')
console.log('')
const r1 = longestUniqueSet('abcabcbb', true)
console.log(`   最长长度 = ${r1.best}，那段是 "${r1.str}"`)

console.log('')
console.log('============================================================')
console.log('例 3：写法二（Map，左端直接跳）—— 用回 07_twosum 那张 Map')
console.log('============================================================')
console.log('Map 记「字符 → 它上次出现在第几位」。撞车时不用一格一格挪，直接跳到它上次位置的下一格。')
console.log('')
function longestUniqueMap(s, log) {
  let left = 0
  let best = 0
  let bestRange = [0, -1]
  const last = new Map()                 // 字符 → 上次出现在第几位
  for (let right = 0; right < s.length; right++) {
    const c = s[right]
    const prev = last.get(c)
    if (prev !== undefined && prev >= left) {   // ← 这个 prev >= left 是这课的坑，见例 4
      const jump = prev + 1
      if (log) console.log(`   第${right}位 '${c}' 撞车：它上次在第${prev}位 → left 从 ${left} 直接跳到 ${jump}`)
      left = jump
    } else if (log) {
      const why = prev === undefined
        ? '第一次见到'
        : `上次在第${prev}位，已经在 left=${left} 左边，不在窗口里了`
      console.log(`   第${right}位 '${c}' 安全（${why}）`)
    }
    last.set(c, right)
    const len = right - left + 1
    if (log) console.log(`      → 现在窗口 [${s.slice(left, right + 1)}] 长 ${len}`)
    if (len > best) { best = len; bestRange = [left, right] }
  }
  return { best, str: s.slice(bestRange[0], bestRange[1] + 1) }
}
const r2 = longestUniqueMap('abcabcbb', true)
console.log(`   最长长度 = ${r2.best}，那段是 "${r2.str}"`)
console.log('   两种写法答案一样，只是左端挪的方式不同：一格一格挪 vs 直接跳。')

console.log('')
console.log('============================================================')
console.log('例 4：证伪 —— 把那句「上次出现在左端右边吗」的判断删掉会怎样')
console.log('============================================================')
console.log('很多人写成「只要见过这个字符，left 就跳到它上次位置的下一格」，')
console.log('看起来更简洁，但在 "abba" 上会翻车：')
function longestUniqueBuggy(s) {
  let left = 0, best = 0
  const last = new Map()
  for (let right = 0; right < s.length; right++) {
    const c = s[right]
    if (last.has(c)) left = last.get(c) + 1      // ← 少了 && last.get(c) >= left
    last.set(c, right)
    best = Math.max(best, right - left + 1)
  }
  return best
}
console.log(`   正确写法：最长 = ${longestUniqueMap('abba').best}（"ab" 或 "ba"）`)
console.log(`   删掉判断：最长 = ${longestUniqueBuggy('abba')}   ← 报了 3，可 "abba" 里根本没有长 3 的无重复段`)
console.log('   原因：走到最后那个 a 时，a 上次在第0位，left 被拉回到 1 ——')
console.log('         left 倒退了，窗口 [1..3] 变成 "bba"，它自己内部就重复（两个 b）。')
console.log('   规则：left 只能往右，不许往左。写 Map 版就加一句 prev >= left 再跳。')

console.log('')
console.log('============================================================')
console.log('例 5：对拍 —— 三个版本一起跑 2000 组随机字符串')
console.log('============================================================')
function longestUniqueBrute(s) {
  let best = 0
  for (let i = 0; i < s.length; i++) {
    const seen = new Set()
    for (let j = i; j < s.length; j++) {
      if (seen.has(s[j])) break
      seen.add(s[j])
      if (j - i + 1 > best) best = j - i + 1
    }
  }
  return best
}
// 除了比长度，还要检查它交出来的那段到底合不合法（内部真的没有重复字符吗）
const validWindow = (s, r) => {
  const set = new Set(r.str)
  return set.size === r.str.length && r.str.length === r.best && r.best >= 0
}

let cases = 0, allSame = 0, mismatch = 0, illegal = 0
for (let t = 0; t < 2000; t++) {
  const n = 1 + Math.floor(Math.random() * 12)
  const s = Array.from({ length: n }, () => 'abcd'[Math.floor(Math.random() * 4)]).join('')
  cases++
  const a = longestUniqueSet(s)
  const b = longestUniqueMap(s)
  const ref = longestUniqueBrute(s)
  if (a.best !== ref || b.best !== ref) { mismatch++; if (mismatch <= 3) console.log(`   ❌ 长度不一致： "${s}" → Set ${a.best} / Map ${b.best} / 暴力 ${ref}`) }
  else if (!validWindow(s, a) || !validWindow(s, b)) { illegal++; if (illegal <= 3) console.log(`   ❌ 交出的那段本身不合法："${s}" → Set "${a.str}" / Map "${b.str}"`) }
  else allSame++
}
console.log(`随机对拍 ${cases} 组（字母只有 a~d，所以必然频繁撞车）：`)
console.log(`  三个版本长度一致  ：${allSame}`)
console.log(`  长度对不上的      ：${mismatch}`)
console.log(`  交出的那段不合法的：${illegal}`)

console.log('')
console.log('============================================================')
console.log('自己动手')
console.log('============================================================')
console.log('字符串 "pwwkew"（LeetCode 官方例子）')
console.log('  第 0 位 p、第 1 位 w 都没事，第 2 位又是 w → 撞车。')
console.log('  问题：left 该跳到第几位？最后答案是多少？')
console.log('   （先自己答，再往下看）')
console.log('')
longestUniqueSet('pwwkew', true)
