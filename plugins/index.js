export const loadImg = (src) => new Promise((resolve, reject) => {
  const img = new Image()
  img.onload = resolve
  img.onerror = reject
  img.src = src
});

export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
