let topArray = []

const Danmu = function (contElem, text, color, size, top, speed, fixed) {
  const screenWidth = window.innerWidth
  const rootSize = parseFloat(document.querySelector('html').style.fontSize)
  if (text === '' || text === undefined) {
    return
  }
  if (!/^#/.test(color)) {
    color = getRandomColor()
  }
  if (typeof size !== 'number') {
    size = getRandom(0.35 * rootSize, 0.8 * rootSize)
  } else {
    size *= rootSize
  }
  if (typeof top !== 'number') {
    top = getRandom(1 * rootSize, 12 * rootSize)
    while (~~top in topArray) {
      top = getRandom(1 * rootSize, 12 * rootSize)
    }
    topArray.push(top)
  } else {
    top *= rootSize
  }
  if (typeof speed !== 'number') {
    speed = getRandom(1.5 / 36 * rootSize, 2.5 / 36 * rootSize)
  } else {
    speed = speed / 36 * rootSize
  }
  let right = -size * text.length
  const styleStr = `position: absolute; right: ${right}px; font-size: ${size}px; color: ${color}; top: ${top}px; white-space: nowrap; ${fixed ? 'z-index: 111' : ''}`
  this.element = document.createElement('span')
  this.element.setAttribute('style', styleStr)
  this.value = document.createTextNode(text)
  this.element.appendChild(this.value)
  contElem.appendChild(this.element)
  const flag = setInterval(() => {
    right += speed
    if (right > screenWidth) {
      clearInterval(flag)
      contElem.removeChild(this.element)
    }
    this.element.style.right = right + 'px'
  }, 13)
}

function getRandomColor () {
  let color = '#'
  while (color.length < 7) {
    color += '0123456789abcdef'[Math.floor(Math.random() * 16)]
  }
  return color
}

function getRandom (min, max) {
  return Math.random() * (max - min + 1) + min
}

export default Danmu
