import {createElement, toVnode, viewToVnode, setElementProp} from "../utils/index"

/**
 * 
 * @param {Object} init 
 */
function start(init) {
  const {
    view,
    container = document.body,
    state,
    actions
  } = init
  if (typeof view === 'undefined') return;

  typeof view === 'string'
    ? container.innerHTML = view
    : container.appendChild(createElement(view))
}

export {
  start,
  viewToVnode
}