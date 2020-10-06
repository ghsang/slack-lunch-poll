// https://stackoverflow.com/questions/32308370/what-is-the-syntax-for-typescript-arrow-functions-with-generics
const chunk = <T>(arr: Array<T>, chunkSize: number): Array<T>[] => {
  var chunks = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    chunks.push(arr.slice(i, i + chunkSize));
  return chunks;
};

export { chunk };
