const write = function (text) {
  const writeClick = document.body.addEventListener('click', () => {
    navigator.clipboard.writeText(text)
    document.body.removeEventListener('click', writeClick)
  })
}

export default write