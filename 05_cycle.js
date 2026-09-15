// 快慢指针（二）：判断链表有没有环
// 运行：node 05_cycle.js

class Node {
  constructor(val, next = null) { this.val = val; this.next = next }
}
const make = (arr) => { let h = null; for (let i = arr.length - 1; i >= 0; i--) h = new Node(arr[i], h); return h }
const who = (n) => (n ? n.val + '号' : '空')

// 用下标找到第 i 个节点（i 从 0 开始）
const at = (head, i) => { let c = head; while (i-- > 0) c = c.next; return c }

function hasCycle(head, log) {
  let slow = head
  let fast = head
  let round = 0
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    round++
    if (log) console.log(`   第${round}轮：slow = ${who(slow)}   fast = ${who(fast)}${slow === fast ? '   ← 相遇！' : ''}`)
    if (slow === fast) return true
  }
  return false
}

// 情况一：普通链表，没环
const a = make([1, 2, 3, 4, 5])
console.log('情况一：1->2->3->4->5（无环）')
console.log('   返回：', hasCycle(a, true))

// 情况二：尾巴 5号 拉住 3号，形成环 3->4->5->3
const b = make([1, 2, 3, 4, 5])
at(b, 4).next = at(b, 2)          // 5号 的手改拉 3号
console.log('')
console.log('情况二：1->2->3->4->5，且 5号 拉住 3号（有环）')
console.log('   返回：', hasCycle(b, true))

// 情况三：尾巴拉回头，整条是个圈
const c = make([1, 2, 3])
at(c, 2).next = at(c, 0)          // 3号 拉住 1号
console.log('')
console.log('情况三：1->2->3 且 3号 拉住 1号（整条成圈）')
console.log('   返回：', hasCycle(c, true))

// 情况四：空链表、单节点
console.log('')
console.log('情况四：空链表 →', hasCycle(null), '；单节点 →', hasCycle(make([1])))
