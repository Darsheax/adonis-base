export const filter = async (array: Array<any>, callback: Function) => {
  return await Promise.all(array.map(item => callback(item))).then(t => array.filter((_, i) => t[i]))
}
