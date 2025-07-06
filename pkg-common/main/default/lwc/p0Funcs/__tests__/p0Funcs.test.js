import { isEmpty, firstNotEmpty, objectMerge, toNum } from "c/p0Funcs";

describe("c-p0-funcs", () => {
  it.each`
    value         | expected
    ${null}       | ${true}
    ${undefined}  | ${true}
    ${""}         | ${true}
    ${[]}         | ${true}
    ${{}}         | ${true}
    ${"abc"}      | ${false}
    ${[1, 2, 3]}  | ${false}
    ${{ a: 1 }}   | ${false}
    ${0}          | ${false}
    ${false}      | ${false}
    ${new Date()} | ${false}
    ${new Map()}  | ${true}
    ${new Set()}  | ${true}
  `("isEmpty($value) should return $expected", ({ value, expected }) => {
    expect(isEmpty(value)).toBe(expected);
  });

  it.each`
    value             | expected
    ${[null, 1]}      | ${1}
    ${[undefined, 2]} | ${2}
    ${["", null, 3]}  | ${3}
    ${[5, null]}      | ${5}
    ${[{}, [], 7]}    | ${7}
  `("firstNotEmpty($value) should return $expected", ({ value, expected }) => {
    expect(firstNotEmpty(...value)).toBe(expected);
  });

  it.each`
    target                   | source                         | expected
    ${{ a: 1, b: 2 }}        | ${{ a: 3, c: 4 }}              | ${{ a: 1, b: 2, c: 4 }}
    ${{ a: 1, b: 2 }}        | ${{ a: null, c: 4 }}           | ${{ a: 1, b: 2, c: 4 }}
    ${{ a: 1, b: 2 }}        | ${{ a: undefined, c: 4 }}      | ${{ a: 1, b: 2, c: 4 }}
    ${{ a: 1, b: 2 }}        | ${{ a: "", c: 4 }}             | ${{ a: 1, b: 2, c: 4 }}
    ${{ a: 1, b: 2 }}        | ${{ a: [], c: 4 }}             | ${{ a: 1, b: 2, c: 4 }}
    ${{ a: 1, b: 2 }}        | ${{ a: {}, c: 4 }}             | ${{ a: 1, b: 2, c: 4 }}
    ${{ a: { x: 7 }, b: 2 }} | ${{ a: { x: 8, y: 9 }, c: 4 }} | ${{ a: { x: 7, y: 9 }, b: 2, c: 4 }}
  `(
    "objectMerge($target, $source) should return $expected",
    ({ target, source, expected }) => {
      expect(objectMerge(target, source)).toEqual(expected);
    }
  );

  it.each`
    input             | num
    ${1}              | ${1}
    ${"1"}            | ${1}
    ${"1.0"}          | ${1}
    ${"1.23"}         | ${1}
    ${NaN}            | ${0}
    ${"abc"}          | ${0}
    ${""}             | ${0}
    ${null}           | ${0}
    ${undefined}      | ${0}
    ${[]}             | ${0}
    ${{}}             | ${0}
    ${new Date()}     | ${0}
    ${new Map()}      | ${0}
    ${new Set()}      | ${0}
    ${true}           | ${0}
    ${false}          | ${0}
    ${[1, 2, 3]}      | ${0}
    ${{ a: 1, b: 2 }} | ${0}
    ${function () {}} | ${0}
  `("toNum($input) should return $num", ({ input, num }) => {
    expect(toNum(input)).toBe(num);
  });
});
