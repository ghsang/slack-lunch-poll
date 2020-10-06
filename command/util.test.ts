import { chunk } from "./util";

test("chunk", () => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];
  expect(chunk(input, 3)).toStrictEqual(expected);
});
