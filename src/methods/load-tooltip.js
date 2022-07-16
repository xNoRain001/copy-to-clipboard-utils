import status from "../global/index"
import tooltip from "../tooltip/index"
import upArrow from '../tooltip/up-arrow'
import downArrow from '../tooltip/down-arrow'
import content from "../tooltip/content"

const loadTooltip = function (clickedEl, text) {
  const {
    offsetLeft: clickedElOffsetLeft,
    offsetTop: clickedElOffsetTop,
    offsetHeight: clickedElHeight,
  } = clickedEl
  
  // content.offsetHeight + arrow.offsetHeight + margin between clicked elements
  const tooltipHeight = 24 + 16 + 3
  let tooltipOffsetLeft = clickedElOffsetLeft
  let tooltipoffsetTop = clickedElOffsetTop
  
  if (tooltipHeight > clickedElOffsetTop) { // up arrow
    tooltip.insertBefore(upArrow, content)
    tooltipoffsetTop += clickedElHeight
  } else { // down arrow
    tooltip.appendChild(downArrow)
    tooltipoffsetTop -= (clickedElHeight + 16 + 3)
  }

  if (text) {
    content.innerText = text
  }
  
  tooltip.style.left = tooltipOffsetLeft + 'px'
  tooltip.style.top = tooltipoffsetTop + 'px'
  tooltip.style.opacity = 1

  status.isShowingTooltip = true
  
  // hide tooltip
  setTimeout(() => {
    tooltip.style.opacity = 0
    content.innerText = 'Copy it'
    status.isShowingTooltip = false
  }, 1500)
}

export default loadTooltip