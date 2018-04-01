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
export function toVnode(element, map = [].map) {
  return {
    name: element.nodeName.toLowerCase(),
    props: {},
    children: map.call(element.childNodes, function(element) {
      return element.nodeType === 3
        ? element.nodeValue
        : toVnode(element, map)
    })
  }
}