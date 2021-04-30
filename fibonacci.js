export default function fibonacci() {
  return new FibonacciIterable();
}

class FibonacciIterable {
  *[Symbol.iterator]() {
    let twoAgo = 1;
    let oneAgo = 1;

    yield twoAgo;
    yield oneAgo;

    while (true) {
      const next = oneAgo + twoAgo;
      yield next;
      twoAgo = oneAgo;
      oneAgo = next;
    }
  }
}
