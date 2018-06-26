import {createElement, toVnode, viewToVnode, setElementProp} from "../utils/index"

/**
 * 
 * @param {Object} init 
 */
function start(init) {
  const {
    view,
    container = document.body
  } = init
  if (typeof view === 'undefined') return;

  const { el = 'div', props } = view;
  const _eleTree = viewToVnode(el, props);

  container.appendChild(createElement(_eleTree))
}

export {
  start,
  viewToVnode
}