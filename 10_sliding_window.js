// 滑动窗口（一）：窗口是什么 + 固定大小的窗口怎么滑
// 运行：node 10_sliding_window.js
//
// 一句话：窗口 = 数组里「连续的一截」，用两根手指框住它的两端。
//
//   left →                          ← right
//   [  2  ,  1  ,  5  ,  1  ,  3  ,  2  ]
//      └──────────┘
//       这就是一个窗口（连续 3 个数）
//
// 滑动 = 两根手指一起往右挪一格，所以是「右边进一个、左边出一个」：
//
//   [  2  ,  1  ,  5  ,  1  ,  3  ,  2  ]
//         └──────────┘        ← 挪之前
//             └──────────┘    ← 挪之后：进来了 1，出去了 2
//
// 注意跟上一课「对撞指针」的区别：
//   对撞：两头往中间夹，窗口越来越小，走一遍就结束。
//   滑动：两头一起往右走，窗口大小不变（这一课），走到底才结束。

console.log('============================================================')
console.log('例 1：固定 k 个连续数的最大和（k=3）')
console.log('============================================================')
console.log('')

const nums = [2, 1, 5, 1, 3, 2]
const K = 3
console.log('数组：', JSON.stringify(nums), '   窗口大小 k =', K)
console.log('')

// ---- 笨办法：每个窗口都把 3 个数从头加一遍 ----
function maxSumBrute(a, k, log) {
  let best = -Infinity
  let add = 0                              // 数一数一共做了多少次加法
  if (k > a.length) return { best: null, add: 0 }   // 窗口比数组还长，没有这样的窗口
  for (let i = 0; i + k <= a.length; i++) {
    let s = 0
    for (let j = i; j < i + k; j++) { s += a[j]; add++ }   // 每个窗口重新加一遍
    if (log) console.log(`   [${a.slice(i, i + k).join(',')}] → 重新加了一遍 = ${s}`)
    if (s > best) best = s
  }
  return { best, add }
}

// ---- 滑动窗口：进一个、出一个，只做两次加减 ----
function maxSumSlide(a, k, log) {
  if (k > a.length) return { best: null, add: 0, plus: 0, minus: 0 }
  const plus = { n: 0 }, minus = { n: 0 }
  let sum = 0
  for (let i = 0; i < k; i++) { sum += a[i]; plus.n++ }    // 第一个窗口老实加出来
  let best = sum
  if (log) console.log(`   第1个窗口 [${a.slice(0, k).join(',')}] 和 = ${sum}（开头先把前 ${k} 个加起来）`)
  let winNo = 1
  for (let right = k; right < a.length; right++) {
    winNo++
    const outVal = a[right - k]                            // 左边要出去的那个
    const inVal = a[right]                                 // 右边新进来的那个
    sum = sum + inVal - outVal                             // 一个加、一个减，别的数没碰
    plus.n++; minus.n++
    if (log) console.log(`   第${winNo}个窗口 [${a.slice(right - k + 1, right + 1).join(',')}] 和 = ${sum}（进 ${inVal}、出 ${outVal} → ${sum - inVal + outVal} + ${inVal} - ${outVal} = ${sum}）`)
    if (sum > best) best = sum
  }
  return { best, add: plus.n + minus.n, plus: plus.n, minus: minus.n }
}

console.log('【笨办法】每个窗口重算一遍：')
const b = maxSumBrute(nums, K, true)
console.log(`   最大和 = ${b.best}，一共做了 ${b.add} 次加法`)
console.log('')
console.log('【滑动窗口】进一个出一个：')
const s = maxSumSlide(nums, K, true)
console.log(`   最大和 = ${s.best}，一共只做了 ${s.add} 次加减（加 ${s.plus} 次、减 ${s.minus} 次）`)
console.log('   答案一样，但中间那些数没有被反复重算。')

console.log('')
console.log('============================================================')
console.log('例 2：数组变长以后，两种办法的工作量差多少（真数出来的）')
console.log('============================================================')
console.log('数组大小 | 窗口 k | 笨办法加法次数 | 滑动窗口加减次数')
for (const [n, k] of [[100, 10], [1000, 50], [10000, 100], [100000, 500]]) {
  const arr = Array.from({ length: n }, (_, i) => (i * 37) % 100)
  const bb = maxSumBrute(arr, k)
  const ss = maxSumSlide(arr, k)
  console.log(`${String(n).padStart(8)} | ${String(k).padStart(6)} | ${String(bb.add).padStart(14)} | ${String(ss.add).padStart(16)}`)
}
console.log('   笨办法的次数 ≈ n × k，数组长 10 倍它就长 10 倍；')
console.log('   滑动窗口的次数 ≈ n，数组长 10 倍它也只长 10 倍。')

console.log('')
console.log('============================================================')
console.log('例 3：证伪 —— 忘记「减掉出去的数」会怎样')
console.log('============================================================')
console.log('有人写成「每次都把新进来的加上，却不减走出去的」，看起来也能动：')
function maxSumForgotToSubtract(a, k) {
  let sum = 0
  for (let i = 0; i < k; i++) sum += a[i]
  let best = sum
  for (let right = k; right < a.length; right++) {
    sum = sum + a[right]              // 少了 - a[right - k]
    if (sum > best) best = sum
  }
  return best
}
console.log(`   正确滑动窗口：最大和 = ${maxSumSlide(nums, K).best}`)
console.log(`   只加不减    ：最大和 = ${maxSumForgotToSubtract(nums, K)}  ← 数越加越多，和一直变大，答案是错的`)
console.log('   记住这条线：窗口右端进一个，左端必须同时出一个，两件事是一件。')

console.log('')
console.log('============================================================')
console.log('例 4：对拍 —— 真跑 2000 组随机数据')
console.log('============================================================')
let cases = 0, same = 0, diff = 0
for (let t = 0; t < 2000; t++) {
  const n = 1 + Math.floor(Math.random() * 12)
  const arr = Array.from({ length: n }, () => Math.floor(Math.random() * 20))
  const k = 1 + Math.floor(Math.random() * 6)
  cases++
  const x = maxSumSlide(arr, k).best
  const y = maxSumBrute(arr, k).best
  if (x === y) same++
  else { diff++; if (diff <= 3) console.log(`   ❌ 不一致：数组 ${JSON.stringify(arr)} k=${k} → 滑窗 ${x} / 暴力 ${y}`) }
}
console.log(`随机对拍 ${cases} 组（数组长度 1~12、k 在 1~6 之间随机，包含 k 比数组还长的情况）：`)
console.log(`  两边的最大和一样：${same}`)
console.log(`  不一样          ：${diff}`)

console.log('')
console.log('============================================================')
console.log('自己动手（先在脑子里数，再看代码核对）')
console.log('============================================================')
const q = [4, 2, 1, 7]
console.log('数组：', JSON.stringify(q), '   窗口大小 k = 2')
console.log('第 1 个窗口是 [4,2]，和 = 6。')
console.log('那么第 2 个窗口是哪几个数？和是多少？')
console.log('   （先自己答，再往下看）')
console.log('')
console.log('   → 看代码跑一遍：')
maxSumSlide(q, 2, true)
