// head 到底是什么
// 运行：node head.js

class Node { constructor(val, next = null) { this.val = val; this.next = next } }

function reverse(head) {
  let prev = null, cur = head
  while (cur) { const nxt = cur.next; cur.next = prev; prev = cur; cur = nxt }
  return prev
}

const make = (arr) => { let h = null; for (let i = arr.length - 1; i >= 0; i--) h = new Node(arr[i], h); return h }

const head = make([1, 2, 3])   // head 拿到了第一个人（1号）

console.log('head.val            =', head.val)                 // 第一个人是谁
console.log('head.next.val       =', head.next.val)            // 第二个人是谁
console.log('head.next.next.val  =', head.next.next.val)       // 第三个人是谁
console.log('head.next.next.next  =', head.next.next.next)     // 后面没了
console.log('')

// head 和 cur 都是"变量"，只是名字不同，装的东西都是"第一个人"
let cur = head
console.log('cur === head ?', cur === head)   // true：它们指着同一个盒子
console.log('')

const newHead = reverse(head)   // 把整条链交给 reverse，拿回新的第一人
console.log('反转后 newHead.val   =', newHead.val, '（新头）')
console.log('反转后 head.val      =', head.val, '（head 还指着 1号，但 1号 现在是尾巴了）')
console.log('反转后 head.next     =', head.next, '（尾巴的手拉空）')
