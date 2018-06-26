(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.lper = {})));
}(this, (function (exports) { 'use strict';

/**
 * @description: 合并target和source。两者均为对象
 * @param target 
 * @param source 
 */

/**
 * @description: 设置元素属性
 * @param element: dom
 * @param pName: 属性名称，字符串
 * @param pValue: 属性值：处理对象，函数，普通值，null或false四种情况
 */
function setElementProp(element, pName, pValue) {
  if (pName === "style") { // 处理pName是style的情况
    for (var i in pValue) {

      // 绑定style属性到element上，style是个对象
      element[pName][i] = pValue[i] === null ? "" : pValue[i];
    }
  } else if (typeof pValue === "function" && pName in element){ // 绑定事件
    element[pName] = pValue === null ? "" : pValue;
  } else if (pName && pValue) {
    element.setAttribute(pName, pValue);
  } else if (value === null || value === false) {
    element.removeAttribute(pName);
  }
  return element;
}

/**
 * @description: 创建元素
 * @param node 
 */
function createElement(node) {
  var element = typeof node === "string" || typeof node === "number"
                ? document.createTextNode(node)
                : document.createElement(node.name);
  if (node.props) {
    for (var pName in node.props) {
      setElementProp(element, pName, node.props[pName]);
    }
  }
  if (Array.isArray(node.children) && node.children.length > 0) {
    node.children.forEach(child => {
      element.appendChild(createElement(child));
    });
  }
  return element;
}

/**
 * @description: 将dom节点转为虚拟DOM树结构
 * @param element 
 * @param map
 * @extends: nodeType === 1 // 元素节点
 *           nodeType === 2 // 属性节点
 *           nodeType === 3 // 文本节点
 *           element.nodeName
 *           element.childNodes
 *           element.nodeType
 *           element.nodeValue
 */

function viewToVnode(name = '', props = {}, ...args) {
  const _allArgs = Array.prototype.slice.call(arguments);
  const argsLength = args.length;
  const _childsLen = _allArgs.length - argsLength;
  const children = [];
  if (_childsLen > 0) {
    for (let i = _childsLen; i < argsLength; i++) {
      if (Array.isArray(args[i])) {
        args[i].forEach(item => {
          if (item !== null && typeof item !== "boolean") {
            children.push(item);
          }
        });
      } else {
        if (args[i] !== null && typeof args[i] !== "boolean") {
          children.push(args[i]);
        }
      }
    }
  }
  return typeof name === "function" ? name(props, children) 
    : {name, props, children};
}

/**
 * 
 * @param {Object} init 
 */
function start(init) {
  const {
    view,
    container = document.body
  } = init;
  if (typeof view === 'undefined') return;

  const { el = 'div', props } = view;
  const _eleTree = viewToVnode(el, props);

  container.appendChild(createElement(_eleTree));
}

exports.start = start;
exports.viewToVnode = viewToVnode;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=lper.js.map
