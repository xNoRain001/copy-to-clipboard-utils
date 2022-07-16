import { hasCopyAttr, hasDeepAttr } from "../utils/index"
import copy from '../methods/copy'
import write from '../methods/write'
import tooltip from "../tooltip/index"
import loadTooltip from "../methods/load-tooltip"

const init = function (copyToClipboard) {
  copyToClipboard.copy = copy
  copyToClipboard.write = write

  document.body.addEventListener('click', (e) => {
    const target = e.target
    
    if (!hasCopyAttr(target)) {
      return
    }
  
    let text = ''
  
    if (hasDeepAttr(target)) {
      text = target.innerText
    } else {
      const childNodes = target.childNodes
  
      for (let i = 0, l = childNodes.length; i < l; i++) {
        const { nodeType, nodeValue } = childNodes[i]
  
        if (nodeType === 3) {
          text += nodeValue.trim() + '\n'
        }
      }

      text = text.slice(0, -1)
    }

    navigator.clipboard.writeText(text)

    tooltip.style.opacity = 0 
    loadTooltip(target, 'Copied!')
  })
}

export default init