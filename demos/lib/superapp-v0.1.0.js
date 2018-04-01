(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.superapp = {})));
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

function viewToVnode(name = '', props = {}) {
  let _argsArray = Array.prototype.slice.call(arguments);
  let _argLength = _argsArray.length;
  let children = [];
  if (_argLength - 2 > 0) {
    for (let i = 2; i < _argLength; i++) {
      if (Array.isArray(_argsArray[i])) {
        _argsArray[i].forEach(item => {
          if (item !== null && typeof item !== "boolean") {
            children.push(item);
          }
        });
      } else {
        if (_argsArray[i] !== null && typeof _argsArray[i] !== "boolean") {
          children.push(_argsArray[i]);
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
  if (!init.viewVNode) return;
  let _viewVNode = init.viewVNode;
  let _container = init.container ? init.container : document.body;
  _container.appendChild(createElement(_viewVNode));
}

exports.start = start;
exports.viewToVnode = viewToVnode;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=superapp.js.map
