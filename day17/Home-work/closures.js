function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());
function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  };
}
const greetOnce = once((name) => `Selam, ${name}!`);
console.log(greetOnce("Dawa"));
console.log(greetOnce("Abdi"));
console.log(greetOnce("Kebede"));
