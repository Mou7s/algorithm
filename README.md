# 算法学习笔记

用 JavaScript 从零练算法，每个知识点存成一个能直接跑的小文件 —— 无依赖，跑起来就能看见每一步的过程。

> 进度、卡点、教法记录见 [`progress.md`](./progress.md)

## 跑起来

```bash
node linkedlist_02_reverse.js
```

每个文件头两行都写了它讲什么、怎么运行。

## 文件一览

### 链表 `linkedlist_`

| 文件 | 讲什么 |
| --- | --- |
| `linkedlist_01_head.js` | `head` / `cur` 装的是节点，不是数字 |
| `linkedlist_02_reverse.js` | 反转核心 9 行（prev / cur / nxt）+ 1000 条对拍 |
| `linkedlist_03_traverse_and_reverse.js` | 遍历 + 反转，逐步打印指针变化 |
| `linkedlist_04_reverse_step_by_step.js` | 反转四行代码逐行拆解（只用 2 个节点） |
| `linkedlist_05_find_middle.js` | 快慢指针：找中间节点 |
| `linkedlist_06_detect_cycle.js` | 快慢指针：判环 |

### 哈希表 `hash_`

| 文件 | 讲什么 |
| --- | --- |
| `hash_01_first_duplicate.js` | 哈希入门：边看边记 vs 两两比，比次数真的数出来 |
| `hash_02_two_sum.js` | 两数之和（LC 1）：Map 记「数值 → 下标」 |
| `hash_03_map_vs_set.js` | Set 只能说「有没有」，Map 才能说「在第几个位置」 |

### 双指针 `two_pointers_`

| 文件 | 讲什么 |
| --- | --- |
| `two_pointers_01_opposite.js` | 对撞指针：回文、有序数组两数之和（LC 167） |

### 滑动窗口 `sliding_window_`

| 文件 | 讲什么 |
| --- | --- |
| `sliding_window_01_fixed.js` | 固定窗口 + 证伪 + 2000 组对拍 |
| `sliding_window_02_variable.js` | 变长窗口：最长无重复子串（LC 3） |

### 存档 `dp_`

| 文件 | 讲什么 |
| --- | --- |
| `dp_1621_k_segments.js` | LC 1621 线段计数（HARD） |

> [!NOTE]
> `dp_1621_k_segments.js` 先别动：需要动态规划，等学到第 7 块再回看。

## 进度

- [x] 1 复杂度 `O(1) / O(n) / O(n²)`
- [x] 2 数组 · moveZeroes 双指针
- [x] 3 链表 · 遍历 / 反转 / 快慢指针
- [x] 4 哈希 · 对撞指针 · 滑动窗口 · 前缀和
- [ ] 5 栈 / 队列 · 二分 · 排序 · 递归 ← 下一块
- [ ] 6 树 · 图 · BFS / DFS
- [ ] 7 动态规划 · 贪心 · 高频题

前缀和那课已通过，当时没留下代码文件，只有 `progress.md` 里的记录。

---

这些文件是**事后复习参考**，不是第一遍的教材：先看讲解、自己讲一遍，再跑代码对着打印的过程核对。
