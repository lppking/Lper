export function viewToVnode(name = '', props = {}) {
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