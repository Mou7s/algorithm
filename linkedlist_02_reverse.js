// 链表反转 —— 极简版（就这 9 行是核心）
// 运行：node linkedlist_02_reverse.js

class Node {
  constructor(val, next = null) { this.val = val; this.next = next }
}

function reverse(head) {
  let prev = null;      // prev：已经反转好的那半条链的队头（开局空）
  let cur = head;       // cur ：还没处理的那半条链的队头
  while (cur) {         // 旧链还没拆完就继续
    const nxt = cur.next  // 1. 先记住后面那个人（不然改完方向就找不到了）
    cur.next = prev       // 2. 把当前这个人的手，改成拉住 prev
    prev = cur            // 3. 他归队：prev 指向他
    cur = nxt             // 4. cur 往前走一步
  }
  return prev           // 旧链拆空了，prev 就是新头
}

// ---------- 测试 ----------
const make = (arr) => { let h = null; for (let i = arr.length - 1; i >= 0; i--) h = new Node(arr[i], h); return h }
const toArr = (h) => { const a = []; let c = h; while (c) { a.push(c.val); c = c.next } return a }

const list = make([1, 2, 3, 4, 5])
console.log('反转前：', toArr(list).join('->'), '-> null')
console.log('反转后：', toArr(reverse(list)).join('->'), '-> null')

// 对拍：跟数组反转比
let bad = 0
for (let t = 0; t < 1000; t++) {
  const arr = Array.from({ length: Math.floor(Math.random() * 8) }, () => Math.floor(Math.random() * 100))
  if (JSON.stringify(toArr(reverse(make(arr)))) !== JSON.stringify([...arr].reverse())) bad++
}
console.log(`随机对拍 1000 条：不一致 ${bad} 条`)
