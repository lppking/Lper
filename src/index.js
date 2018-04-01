import {createElement, toVnode, viewToVnode, setElementProp} from "../utils/index"

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

export {
  start,
  viewToVnode
}