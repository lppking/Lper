import {viewToVnode} from '../utils'

/**
 * @description: 传入一个空节点
 */
test("empty vnode", () => {
  expect(viewToVnode("div")).toEqual({
    name: "div",
    props: {},
    children: []
  })
});

/**
 * @description: 包含一个child
 */
test("a child", () => {
  const _target = {
    name: "div",
    props: {},
    children: ["child"]
  };
  expect(viewToVnode("div", {}, ["child"])).toEqual(_target);

  expect(viewToVnode("div", {}, "child")).toEqual(_target);
});

/**
 * @description: 包含一个子节点
 */
test("vnode with a single child vnode", () => {
  expect(viewToVnode("div", {},[
    viewToVnode("h1", {}, 1)
  ])).toEqual({
    name: 'div',
    props: {},
    children: [
      {
        name: 'h1',
        props: {},
        children: [1]
      }
    ]
  });
});

/**
 * @description: 包含各种类型的child
 */
test("kinds of children", () => {
  expect(viewToVnode("div", {}, "a", "b", "c")).toEqual({
    name: "div",
    props: {},
    children: ["a", "b", "c"]
  });

  expect(viewToVnode("div", {}, "a", 1, "b", 2)).toEqual({
    name: "div",
    props: {},
    children: ["a", 1, "b", 2]
  });

  expect(viewToVnode("div", {}, "a", 1, "b", viewToVnode("p", {}, "child"))).toEqual({
    name: "div",
    props: {},
    children: ["a", 1, "b", {
      name: "p",
      props: {},
      children: ["child"]
    }]
  });
});

/**
 * @description: 测试包含props的情况
 */
test("test vnode with props", () => {
  const props = {
    id: "foot",
    class: "footer",
    style: {
      color: "red"
    }
  };
  expect(viewToVnode("div", props, ["sub"])).toEqual({
    name: "div",
    props,
    children: ["sub"]
  });
});

/**
 * @description: 测试children过滤null和boolean的情况
 */
test("skip null and Boolean children", () => {
  const _target = {
    name: "div",
    props: {},
    children: []
  };

  expect(viewToVnode("div", {}, null)).toEqual(_target);
  expect(viewToVnode("div", {}, true)).toEqual(_target);
  expect(viewToVnode("div", {}, false)).toEqual(_target);
});

/**
 * @description: name属性支持为function的情况
 */
test("name is a function", () => {
  const com = (props, children) => viewToVnode("div", props, children);

  expect(viewToVnode(com, {id: "foot"}, [viewToVnode(com, {id: "bar"})])).toEqual({
    name: "div",
    props: {
      id: "foot"
    },
    children: [{
      name: "div",
      props: {
        id: "bar"
      },
      children: []
    }]
  });
});

/**
 * @description: name是个function且不包含props，最终输出结果包含默认props
 */
test("default props", () => {
  const com = ({ name = "world" }, children) => 
    viewToVnode("div", {}, "Hello " + name);

  expect(viewToVnode(com)).toEqual({
    name: "div",
    props: {},
    children: ["Hello world"]
  });
});