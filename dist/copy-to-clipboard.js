(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.copyToClipboard = factory());
})(this, (function () { 'use strict';

  var hasCopyAttr = function hasCopyAttr(target) {
    return target.attributes.copy !== void 0;
  };

  var hasDeepAttr = function hasDeepAttr(target) {
    return target.attributes.deep !== void 0;
  };

  var status = {
    isShowingTooltip: false
  };

  var content = document.createElement('div');
  content.style.cssText = "\n  font-size: 10px;\n  color: #fafafa;\n  padding: 4px;\n  background: #757575;\n  border-radius: 4px;\n";
  content.innerText = 'Copy it';

  var tooltip = document.createElement('div');
  tooltip.style.cssText = "\n  z-index: 9999;\n  position: fixed;\n  opacity: 0;\n";
  tooltip.appendChild(content);
  document.body.appendChild(tooltip);

  var upArrow = document.createElement('div');
  upArrow.style.cssText = "\n  width: 0px;\n  height: 0px;\n  border: 8px solid transparent;\n  border-bottom: 8px solid #757575;\n  margin: 0 auto;\n";

  var downArrow = document.createElement('div');
  downArrow.style.cssText = "\n  width: 0px;\n  height: 0px;\n  border: 8px solid transparent;\n  border-top: 8px solid #757575;\n  margin: 0 auto;\n";

  var loadTooltip = function loadTooltip(clickedEl, text) {
    var clickedElOffsetLeft = clickedEl.offsetLeft,
        clickedElOffsetTop = clickedEl.offsetTop,
        clickedElHeight = clickedEl.offsetHeight; // content.offsetHeight + arrow.offsetHeight + margin between clicked elements

    var tooltipHeight = 24 + 16 + 3;
    var tooltipOffsetLeft = clickedElOffsetLeft;
    var tooltipoffsetTop = clickedElOffsetTop;

    if (tooltipHeight > clickedElOffsetTop) {
      // up arrow
      tooltip.insertBefore(upArrow, content);
      tooltipoffsetTop += clickedElHeight;
    } else {
      // down arrow
      tooltip.appendChild(downArrow);
      tooltipoffsetTop -= clickedElHeight + 16 + 3;
    }

    if (text) {
      content.innerText = text;
    }

    tooltip.style.left = tooltipOffsetLeft + 'px';
    tooltip.style.top = tooltipoffsetTop + 'px';
    tooltip.style.opacity = 1;
    status.isShowingTooltip = true; // hide tooltip

    setTimeout(function () {
      tooltip.style.opacity = 0;
      content.innerText = 'Copy it';
      status.isShowingTooltip = false;
    }, 1500);
  };

  var copy = function copy() {
    var _clickedEl$nodeType, _copiedEl$nodeType;

    var clickedEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var copiedEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var type1 = (_clickedEl$nodeType = clickedEl === null || clickedEl === void 0 ? void 0 : clickedEl.nodeType) !== null && _clickedEl$nodeType !== void 0 ? _clickedEl$nodeType : 0;
    var type2 = (_copiedEl$nodeType = copiedEl === null || copiedEl === void 0 ? void 0 : copiedEl.nodeType) !== null && _copiedEl$nodeType !== void 0 ? _copiedEl$nodeType : 0;

    if (type1 ^ type2) {
      throw new Error('Missing copied element.');
    }

    if (clickedEl && copiedEl) {
      clickedEl.addEventListener('click', function () {
        var text = '';

        if (hasDeepAttr(copiedEl)) {
          text = copiedEl.innerText;
        } else {
          var childNodes = copiedEl.childNodes;

          for (var i = 0, l = childNodes.length; i < l; i++) {
            var _childNodes$i = childNodes[i],
                nodeType = _childNodes$i.nodeType,
                nodeValue = _childNodes$i.nodeValue;

            if (nodeType === 3) {
              text += nodeValue.trim();
            }
          }
        }

        navigator.clipboard.writeText(text);
        tooltip.style.opacity = 0;
        loadTooltip(clickedEl, 'Copied!');
      });
      clickedEl.addEventListener('mouseenter', function (e) {
        if (status.isShowingTooltip === true) {
          return;
        }

        loadTooltip(clickedEl);
      });
    }
  };

  var write = function write(text) {
    var writeClick = document.body.addEventListener('click', function () {
      navigator.clipboard.writeText(text);
      document.body.removeEventListener('click', writeClick);
    });
  };

  var init = function init(copyToClipboard) {
    copyToClipboard.copy = copy;
    copyToClipboard.write = write;
    document.body.addEventListener('click', function (e) {
      var target = e.target;

      if (!hasCopyAttr(target)) {
        return;
      }

      var text = '';

      if (hasDeepAttr(target)) {
        text = target.innerText;
      } else {
        var childNodes = target.childNodes;

        for (var i = 0, l = childNodes.length; i < l; i++) {
          var _childNodes$i = childNodes[i],
              nodeType = _childNodes$i.nodeType,
              nodeValue = _childNodes$i.nodeValue;

          if (nodeType === 3) {
            text += nodeValue.trim() + '\n';
          }
        }

        text = text.slice(0, -1);
      }

      navigator.clipboard.writeText(text);
      tooltip.style.opacity = 0;
      loadTooltip(target, 'Copied!');
    });
  };

  var copyToClipboard = Object.create(null);
  init(copyToClipboard);

  return copyToClipboard;

}));
