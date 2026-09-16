// 链表基础：遍历 / 反转（三根手指）
// 运行：node linkedlist_03_traverse_and_reverse.js

class Node {
  constructor(val, next = null) { this.val = val; this.next = next }
}

// 辅助：把链表打印成 "1->2->3" 的样子（最多打 10 个，防止写出环后死循环）
const show = (head) => {
  const out = []
  let cur = head, guard = 0
  while (cur && guard++ < 10) { out.push(cur.val); cur = cur.next }
  if (!cur && guard < 10) out.push('null')
  return out.join('->')
}

const make = (arr) => {
  let head = null
  for (let i = arr.length - 1; i >= 0; i--) head = new Node(arr[i], head)
  return head
}

// 遍历
function walk(head) {
  const seen = []
  let cur = head
  while (cur) { seen.push(cur.val); cur = cur.next }
  return seen
}

// 反转：三根手指 prev / cur / nxt
function reverse(head, log) {
  let prev = null
  let cur = head
  if (log) log(0, prev, cur, '开局')
  let step = 0
  while (cur) {
    const nxt = cur.next // 1. nxt 先抓住后面，防止丢
    cur.next = prev      // 2. 当前这只手改方向
    prev = cur           // 3. prev 挪过来
    cur = nxt            // 4. cur 往前走
    step++
    if (log) log(step, prev, cur, `第${step}步`)
  }
  return prev // 循环结束时 cur 是 null，新头是 prev
}

const head = make([1, 2, 3])
console.log('原始链表：', show(head))
console.log('遍历一遍：', walk(head).join(','))
console.log('--- 反转每一步 ---')

const reversed = reverse(make([1, 2, 3]), (step, prev, cur, tag) => {
  console.log(
    `${tag}: prev=${prev ? prev.val : 'null'}  cur=${cur ? cur.val : 'null'}  ` +
    `（prev 那一串已接好：${show(prev)}；cur 那串还没动：${show(cur)}）`
  )
})

console.log('反转后：', show(reversed))

// 对拍：和数组反转比
const cases = [[1], [1, 2], [1, 2, 3], [5, 4, 3, 2, 1], []]
let pass = 0
for (const c of cases) {
  const got = walk(reverse(make(c)))
  const want = [...c].reverse()
  const ok = JSON.stringify(got) === JSON.stringify(want)
  if (ok) pass++
  else console.log('  ❌', JSON.stringify(c), 'got', got, 'want', want)
}
console.log(`对拍：${pass}/${cases.length} 通过`)
