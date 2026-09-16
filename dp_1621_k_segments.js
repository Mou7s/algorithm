// dp_1621_k_segments.js —— LeetCode 1621 大小为 K 的不重叠线段的数目
// 存档参考（不是教材）。运行：node dp_1621_k_segments.js
//
// 题意：0..n-1 共 n 个点，选 恰好 k 条线段，每条至少盖住两个点（左<右），
// 线段之间不能重叠，但端点可以重合；线段不必盖满所有点。
// 求方案数，对 1e9+7 取余。

const MOD = 1000000007n;

// ---------- 解法一：DP ----------
// dp[i][j] = 只用 0..i 这些点，放下 j 条线段的方案数（i 可以不被用到）
// 想最后一条线段右端点落在 i 上，左端点可以是任意 t (0 <= t < i)，
// 前面的 j-1 条线段都能缩在 0..t 里（t 和它重合没关系，端点允许重合）。
// dp[i][j] = dp[i-1][j]                     // 点 i 不是任何线段的右端点
//          + sum_{t=0}^{i-1} dp[t][j-1]     // 点 i 是最后一条的右端点
function solveDP(n, k) {
  const dp = Array.from({ length: n }, () => new Array(k + 1).fill(0n));
  for (let i = 0; i < n; i++) dp[i][0] = 1n; // 一条都不放：1 种（空方案）
  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      let sum = dp[i - 1][j];             // 不用点 i
      for (let t = 0; t < i; t++) sum = (sum + dp[t][j - 1]) % MOD; // 用点 i 收尾
      dp[i][j] = sum;
    }
  }
  return dp[n - 1][k];
}

// ---------- 解法二：组合公式 ----------
// 答案 = C(n + k - 1, 2k)  （下面 combo 用逆元算）
function solveCombo(n, k) {
  const N = n + k - 1, R = 2 * k;
  if (R > N) return 0;
  const fact = [1n];
  for (let i = 1; i <= N; i++) fact.push(fact[i - 1] * BigInt(i) % MOD);
  const powMod = (a, e) => { let r = 1n; a %= MOD; while (e > 0n) { if (e & 1n) r = r * a % MOD; a = a * a % MOD; e >>= 1n; } return r; };
  const inv = (a) => powMod(a, MOD - 2n);
  return fact[N] * inv(fact[R]) % MOD * inv(fact[N - R]) % MOD;
}

// ---------- 暴力枚举（小 n 交叉验证） ----------
function brute(n, k) {
  const segs = [];
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) segs.push([a, b]);
  let cnt = 0;
  const pick = [];
  const dfs = (start) => {
    if (pick.length === k) { cnt++; return; }
    for (let i = start; i < segs.length; i++) {
      const [a, b] = segs[i];
      // 与已选最后一条不重叠：允许端点重合 -> 上一条的右端 <= 本条的左端
      if (pick.length && pick[pick.length - 1][1] > a) continue;
      pick.push(segs[i]); dfs(i + 1); pick.pop();
    }
  };
  dfs(0);
  return BigInt(cnt) % MOD;
}

// ---------- 交叉验证 ----------
let bad = 0, cases = 0;
for (let n = 2; n <= 8; n++) {
  for (let k = 1; k <= n - 1; k++) {
    const b = brute(n, k), d = solveDP(n, k), c = solveCombo(n, k);
    cases++;
    if (b !== d || b !== c) { bad++; console.log(`❌ n=${n} k=${k} brute=${b} dp=${d} combo=${c}`); }
  }
}
console.log(`交叉验证：${cases} 组 (n=2..8 全部 k)，不一致 = ${bad}`);

// ---------- 官方样例 ----------
const samples = [[4, 2, 5], [3, 1, 3], [30, 7, 796297179], [5, 3, 7], [3, 2, 1]];
for (const [n, k, want] of samples) {
  const got = solveDP(n, k), got2 = solveCombo(n, k);
  console.log(`n=${n} k=${k} -> dp=${got} combo=${got2} 期望=${want} ${got === BigInt(want) && got2 === BigInt(want) ? '✅' : '❌'}`);
}

// ---------- 逐格打印 n=4,k=2 的 dp 表（讲题时看） ----------
console.log('\nn=4,k=2 的 dp 表（行=i 用到的最大点，列=j 线段数）：');
const d = Array.from({ length: 4 }, () => new Array(3).fill(0));
for (let i = 0; i < 4; i++) d[i][0] = 1;
for (let i = 1; i < 4; i++) for (let j = 1; j <= 2; j++) { let s = d[i - 1][j]; for (let t = 0; t < i; t++) s += d[t][j - 1]; d[i][j] = s; }
console.log('        j=0 j=1 j=2');
d.forEach((row, i) => console.log(`i=${i}     ` + row.join('   ')));
