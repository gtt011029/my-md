class GenericsNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T
}
let genericsNumber = new GenericsNumber<number>()
genericsNumber.zeroValue = 0
genericsNumber.add = function (x, y) {
  return x + y
}
genericsNumber.add(2, 4)