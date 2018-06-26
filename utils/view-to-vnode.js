export function viewToVnode(name = '', props = {}, ...args) {
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