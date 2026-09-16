// 快慢指针（一）：找中间节点
// 运行：node linkedlist_05_find_middle.js

class Node {
  constructor(val, next = null) { this.val = val; this.next = next }
}

const make = (arr) => { let h = null; for (let i = arr.length - 1; i >= 0; i--) h = new Node(arr[i], h); return h }
const who = (n) => (n ? n.val + '号' : '空')

// 主角：两个人从同一个起点同时出发，慢的每轮走 1 格，快的每轮走 2 格
function findMiddle(head, log) {
  let slow = head
  let fast = head
  let round = 0
  while (fast && fast.next) {      // 两个条件都要，见下面崩掉的例子
    slow = slow.next               // 慢的走 1 格
    fast = fast.next.next          // 快的走 2 格
    round++
    if (log) console.log(`   第${round}轮后：slow = ${who(slow)}    fast = ${who(fast)}`)
  }
  return slow                      // fast 走到底时，slow 正好在中间
}

// 故意写错：只检查 fast，不检查 fast.next
function findMiddleBroken(head) {
  let slow = head
  let fast = head
  while (fast) {                   // ← 少了 fast.next 这个条件
    slow = slow.next
    fast = fast.next.next          // ← fast 已经是最后一个时，这里要炸
  }
  return slow
}

const show = (arr) => {
  console.log(`\n链表 ${arr.join('->')} （${arr.length} 个节点）`)
  const mid = findMiddle(make(arr), true)
  console.log(`  → 中间节点：${who(mid)}`)
}

show([1, 2, 3, 4])
show([1, 2, 3, 4, 5])
show([1,2,3,4,5,6])
show([1])
show([])

console.log('\n=== 少写一个条件的后果 ===')
try {
  findMiddleBroken(make([1, 2, 3, 4, 5]))
  console.log('没炸')
} catch (e) {
  console.log('5 个节点时崩了：', e.constructor.name + ': ' + e.message)
}
const ok = findMiddleBroken(make([1, 2, 3, 4]))
console.log('4 个节点时没崩，返回：', who(ok), '（长度是偶数时恰好躲过）')
