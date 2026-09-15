// 双指针（一）：对撞指针 —— 两根手指，一头一尾，往中间夹
// 运行：node 09_opposite_pointers.js
//
// 规则（先记住这一张图，别的都等会儿再说）：
//
//   left →                                    ← right
//   [  a  ,  b  ,  c  ,  d  ,  e  ]
//
//   每次只比 left 和 right 指着的这一对，比完就往中间各收一格，
//   直到两根手指碰面（left 不再小于 right）就停。

// ============================================================
// 例 1：判断回文（正着读、反着读一样）
// 人怎么判 "LEVEL"？ 左边一个 L 对右边一个 L，E 对 E，最后只剩中间的 V
// ============================================================
function isPalindrome(s, log) {
  let left = 0
  let right = s.length - 1
  let pair = 0
  while (left < right) {            // 为什么是 < 不是 <=：碰面说明中间只剩一个，自己跟自己比没意义
    pair++
    if (log) console.log(`   第${pair}对：${s[left]}（第${left}位） 和 ${s[right]}（第${right}位） → 一样吗？`)
    if (s[left] !== s[right]) {
      if (log) console.log(`   ❌ 不一样 → 不是回文，直接收工`)
      return false
    }
    if (log) console.log(`   ✅ 一样 → left 右移一格，right 左移一格`)
    left++
    right--
  }
  if (log) console.log(`   left=${left}、right=${right} 碰面了 → 全部比完，是回文`)
  return true
}

console.log('=== 例 1：判断回文 ===')
console.log('"LEVEL"：')
console.log('   结果：', isPalindrome('LEVEL', true))
console.log('')
console.log('"ABCA"：')
console.log('   结果：', isPalindrome('ABCA', true))

console.log('')
console.log('============================================================')
console.log('例 2：有序数组里找两个数，加起来等于目标（LeetCode 167）')
console.log('为什么排好序就能夹？看下面每一行的理由')
console.log('============================================================')
console.log('')

// nums 从小到大排好，返回两个下标 i<j 使 nums[i]+nums[j] === target
function twoSumSorted(nums, target, log) {
  let left = 0
  let right = nums.length - 1
  let steps = 0
  while (left < right) {
    steps++
    const sum = nums[left] + nums[right]
    // 只需要记两句话：
    //   sum 太大 → 右边这个数配谁都嫌大 → right 往左挪一格
    //   sum 太小 → left 上这个数太小 → left 往右挪一格
    let reason = ''
    if (sum > target) reason = `${sum} > ${target} → 右边这数（${nums[right]}）太大了 → right 左移`
    else if (sum < target) reason = `${sum} < ${target} → 左边这数（${nums[left]}）太小了 → left 右移`
    else reason = `${sum} = ${target} → 就是它俩`
    if (log) console.log(`   第${steps}步：nums[${left}]=${nums[left]} + nums[${right}]=${nums[right]} = ${sum}   ${reason}`)
    if (sum === target) return { ans: [left, right], steps }
    if (sum > target) right--
    else left++
  }
  return { ans: null, steps }
}

const a = [1, 3, 4, 6, 8, 11]
console.log('数组：', JSON.stringify(a), ' 目标：10')
const r1 = twoSumSorted(a, 10, true)
console.log('   结果：', JSON.stringify(r1.ans), `（只用 ${r1.steps} 步，数组长 ${a.length}）`)

console.log('')
console.log('=== 证伪：这招只在「排好序」时成立 ===')
console.log('下面数组没排序：[1,5,9,2,8]，目标 10')
console.log('人眼一看：第4位的 2 和第5位的 8 加起来正好 10，答案确实存在')
const bad = [1, 5, 9, 2, 8]
const rBad = twoSumSorted(bad, 10, true)
console.log('   对撞指针结果：', JSON.stringify(rBad.ans), '← 答案存在却报“找不到”')
console.log('   原因：第2步 5+8=13 比目标大，程序按“右边这数太大就扔”把 8 扔掉了，')
console.log('         但 8 并不大——它只是配 5 嫌大，配 2 刚好（2+8=10）。')
console.log('         有序列里“比它大的数都在它右边”，这句理由才站得住；')
console.log('         顺序一乱，这个保证没了，扔掉的可能正好是答案。')

console.log('')
console.log('=== 对拍：排好序的数据上，双指针 == 暴力 ===')

function bruteSorted(nums, target) {
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++)
      if (nums[i] + nums[j] === target) return [i, j]
  return null
}
// 答案可能不止一组（如 [1,2,3] 目标 5 可以是 2+3），所以不能直接比“跟暴力一样”，
// 要比“答案本身站不站得住” + “有没有解这件事两边是否一致”。
const valid = (nums, target, ans) => {
  if (ans === null) return false
  const [i, j] = ans
  return Number.isInteger(i) && Number.isInteger(j) && i < j &&
    i >= 0 && j < nums.length && nums[i] + nums[j] === target
}

let cases = 0, bothNone = 0, bothOk = 0, disagree = 0, wrongAnswer = 0
for (let t = 0; t < 2000; t++) {
  const n = 2 + Math.floor(Math.random() * 9)
  const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 20)).sort((x, y) => x - y)  // 排好序
  const target = Math.floor(Math.random() * 40)
  cases++
  const mine = twoSumSorted(nums, target).ans
  const ref = bruteSorted(nums, target)
  if (mine === null && ref === null) bothNone++
  else if (mine === null || ref === null) disagree++
  else if (valid(nums, target, mine)) bothOk++
  else wrongAnswer++
}
console.log(`随机对拍 ${cases} 组（数组已排序）：`)
console.log(`  两边都无解              ：${bothNone}`)
console.log(`  两边都有解且我的答案合法：${bothOk}`)
console.log(`  有没有解判断不一致      ：${disagree}`)
console.log(`  答案不满足条件的        ：${wrongAnswer}`)

console.log('')
console.log('=== 回到你已经会的：同一道题，哈希 vs 对撞 ===')
console.log('哈希（07_twosum.js）：数组乱不乱都行，一遍扫过去边看边记 → 时间 O(n)，但要多一个抽屉（空间 O(n)）')
console.log('对撞（本文件）      ：必须排好序，两头往中间夹 → 时间 O(n)，不要额外空间（空间 O(1)）')
console.log('所以：给的数组本来就无序，就老实用哈希；题目说“已排序”，就用对撞省下那个抽屉。')
