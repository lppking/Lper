/**
 * @description: 创建元素
 * @param node 
 */
import {setElementProp} from "./set-element-prop";
export function createElement(node) {
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