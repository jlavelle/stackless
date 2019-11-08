const test = require("ava")
const { trampoline1 } = require("./index")

test("trampoline1", t => {
  const { Done, More, runT } = trampoline1;
  const fact = num => {
    const rec = n => acc => {
      if (n == 0) return Done(acc);
      else return More(() => rec(n - 1)(acc * n))
    }
    return rec(num)(1)
  }

  t.is(24, runT(fact(4)));

  runT(fact(100000))

  t.pass()
})
