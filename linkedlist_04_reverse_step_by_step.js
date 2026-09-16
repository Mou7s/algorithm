// 把反转的四行代码，一行一行打印它到底干了什么（只用两个节点：1号 2号）
// 运行：node linkedlist_04_reverse_step_by_step.js

class Node {
  constructor(val) { this.val = val; this.next = null }
}

const who = (n) => (n ? n.val + '号' : '空')          // 这个人是谁
const line = (n) => {                                  // 这一队是谁拉着谁
  const out = []
  let c = n, guard = 0
  while (c && guard++ < 10) { out.push(c.val + '号'); c = c.next }
  return out.join('->') + '->空'
}

// 造一条 1号->2号 的链
const one = new Node(1)
const two = new Node(2)
one.next = two            // 1号的手拉住2号

console.log('=== 开局 ===')
console.log('链表：', line(one))
let prev = null            // 排好的队：空
let cur = one              // 手上正在处理：1号
console.log('cur =', who(cur), '   prev =', who(prev))
console.log('')

console.log('=== 第 1 行：nxt = cur.next ===')
let nxt = cur.next
console.log('  嘴上说"先把后面存到桌上"，实际就是让 nxt 记住：', who(nxt))
console.log('')

console.log('=== 第 2 行：cur.next = prev ===')
console.log('  改之前：', who(cur), '的手拉的是', who(cur.next))
cur.next = prev
console.log('  改之后：', who(cur), '的手拉的是', who(cur.next), ' <= 这一行就是"改方向"')
console.log('')

console.log('=== 第 3 行：prev = cur ===')
prev = cur
console.log('  排好的队变成：', line(prev))
console.log('')

console.log('=== 第 4 行：cur = nxt ===')
cur = nxt
console.log('  手上换成：', who(cur), '（1号已经处理完了）')
console.log('')

console.log('=== 第 2 轮（处理 2号）===')
nxt = cur.next                       // 2号后面是空
console.log('  第1行：nxt =', who(nxt))
console.log('  第2行：2号的手从', who(cur.next), '改成拉', who(prev))
cur.next = prev
prev = cur                           // 第3行
cur = nxt                            // 第4行
console.log('  第3、4行：prev =', who(prev), '  cur =', who(cur))
console.log('  cur 是空 → 停')
console.log('')

console.log('=== 结果 ===')
console.log('prev 那一队就是答案：', line(prev))
console.log('')

// ---- 证伪：如果代码写错了，随机对拍一定炸 ----
const make = (arr) => { let h = null; for (let i = arr.length - 1; i >= 0; i--) { const n = new Node(arr[i]); n.next = h; h = n } return h }
function reverse(head) {          // 就是刚才那四行，一个字没改
  let prev = null, cur = head
  while (cur) { const nxt = cur.next; cur.next = prev; prev = cur; cur = nxt }
  return prev
}
const toArr = (h) => { const a = []; let c = h; while (c) { a.push(c.val); c = c.next } return a }

let bad = 0
for (let t = 0; t < 1000; t++) {
  const len = Math.floor(Math.random() * 8)
  const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 100))
  const got = toArr(reverse(make(arr)))
  if (JSON.stringify(got) !== JSON.stringify([...arr].reverse())) bad++
}
console.log(`随机对拍 1000 条（长度 0~7）：不一致 ${bad} 条`)
