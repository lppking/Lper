import {copy} from '../utils';

/**
 * @description: target和source均为空对象的情况
 */
test("empty object", () => {
  const target = {};
  const source = {};
  expect(copy(target, source)).toEqual({});
});

/**
 * @description: 一项为空的情况
 */
test("only one is not empty", () => {
  const notEmpty = {
    name: "lpp",
    age: 18
  };
  const empty = {};
  expect(copy(notEmpty, empty)).toEqual(notEmpty);
  expect(copy(empty, notEmpty)).toEqual(notEmpty);
});

/**
 * @description: target和source均不为空
 */
test("all not empty", () => {
  const target = {
    name: "lpp",
    age: 18
  };
  const source = {
    tel: "13111111111",
    addr: "BJ"
  };
  expect(copy(target, source)).toEqual({
    name: "lpp",
    age: 18,
    tel: "13111111111",
    addr: "BJ"
  });
});

/**
 * @description: source覆盖target属性
 */
test("override", () => {
  const target = {
    name: "Tom",
    age: 29,
    addr: "BJ"
  };
  const source = {
    name: "lpp",
    age: 18,
    tel: "13111111111"
  };
  expect(copy(target, source)).toEqual({
    name: "lpp",
    age: 18,
    tel: "13111111111",
    addr: "BJ"
  });
});