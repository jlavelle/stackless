const { adt } = require("@masaeedu/adt")

const trampoline1 = (() => {
  const { match, Done, More } = adt({ Done: ["a"], More: ["() -> Trampoline a"] })

  const runT = k => {
    let r;
    let next = k;
    let more = true;
    while(more) {
      match({
        Done: v => { more = false; r = v; },
        More: k => { next = k(); }
      })(next)
    }
    return r;
  }

  return {
    runT,
    Done,
    More,
    match
  }
})()

module.exports = {
  trampoline1
}
