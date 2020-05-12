function createArray <T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  if (typeof length === 'number' ) {
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
}
console.log(createArray(3, 6))
