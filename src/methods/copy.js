import { hasDeepAttr } from "../utils/index"
import loadTooltip from "./load-tooltip"
import status from "../global/index"
import tooltip from "../tooltip/index"

const copy = function (clickedEl = null, copiedEl = null) {
  const type1 = clickedEl?.nodeType ?? 0
  const type2 = copiedEl?.nodeType ?? 0

  if (type1 ^ type2) {
    throw new Error('Missing copied element.')
  }

  if (clickedEl && copiedEl) {
    clickedEl.addEventListener('click', () => {
      let text = ''

      if (hasDeepAttr(copiedEl)) {
        text = copiedEl.innerText
      } else {
        const childNodes = copiedEl.childNodes

        for (let i = 0, l = childNodes.length; i < l; i++) {
          const { nodeType, nodeValue } = childNodes[i]

          if (nodeType === 3) {
            text += nodeValue.trim()
          }
        }
      }

      navigator.clipboard.writeText(text)

      tooltip.style.opacity = 0 
      loadTooltip(clickedEl, 'Copied!')
    })

    clickedEl.addEventListener('mouseenter', (e) => {
      if (status.isShowingTooltip === true) {
        return
      }

      loadTooltip(clickedEl)
    })
  }
}

export default copy