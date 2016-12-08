const Event = {
  addEvent: (domElem, event, func) => {
    if (document.addEventListener) {
      return domElem.addEventListener(event, func)
    } else if (document.attachEvent) {
      return domElem.attachEvent(event, func)
    }
    domElem['on' + event] = func
  },
  isMoveHorizontal: (startX, startY, currX, currY) => {
    if (Math.abs(currX - startX) > Math.abs(currY - startY)) {
      return true
    }
    return false
  },
  isMoveVertical: (startX, startY, currX, currY) => {
    if (Math.abs(currX - startX) < Math.abs(currY - startY)) {
      return true
    }
    return false
  }
}

module.exports = Event
