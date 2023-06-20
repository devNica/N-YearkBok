
export function jsonToObject (data: any): any {
  return new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(data))
    } catch (error) {
      reject(error)
    }
  })
}
