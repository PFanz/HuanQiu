const Util = {
  arrInArr: (arr, arrs) => {
    return arrs.some(item => {
      if (item[0] === arr[0] && item[1] === arr[1]) {
        return true
      }
    })
  }
}

export default Util
