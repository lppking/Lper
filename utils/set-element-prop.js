/**
 * @description: 设置元素属性
 * @param element: dom
 * @param pName: 属性名称，字符串
 * @param pValue: 属性值：处理对象，函数，普通值，null或false四种情况
 */
export function setElementProp(element, pName, pValue) {
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