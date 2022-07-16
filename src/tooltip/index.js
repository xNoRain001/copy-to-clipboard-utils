import content from "./content"

const tooltip = document.createElement('div')

tooltip.style.cssText = `
  z-index: 9999;
  position: fixed;
  opacity: 0;
`
tooltip.appendChild(content)
document.body.appendChild(tooltip)

export default tooltip