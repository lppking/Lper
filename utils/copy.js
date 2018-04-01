/**
 * @description: 合并target和source。两者均为对象
 * @param target 
 * @param source 
 */
export function copy(target, source) {
  var obj = {};

  for (var i in target) obj[i] = target[i];
  for (var i in source) obj[i] = source[i];

  return obj;
}