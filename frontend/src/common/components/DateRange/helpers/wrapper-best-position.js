const getStylePosition = (element, tooltip, position) => {
  switch (position) {
    case 'top':
      return {
        top: element.top - tooltip.offsetWidth - 5,
        left: element.left + element.width - tooltip.offsetWidth
      };

    case 'bottom':
      return {
        top: element.top + element.height + 5,
        left: element.left + element.width - tooltip.offsetWidth
      };

    case 'left':
      return {
        top: element.top + element.height - tooltip.offsetWidth,
        left: element.left - tooltip.offsetWidth - 5
      };

    default:
      return {
        top: element.top + element.height - tooltip.offsetWidth,
        left: element.left + element.width + 5
      };
  }
};

const getBestPosition = (style, position, tooltip) => {
  switch (position) {
    case 'top':
      if (style.top - tooltip.offsetWidth < 20) {
        return 'bottom';
      }

      break;

    case 'bottom':
      if (style.top + tooltip.offsetWidth > window.innerHeight - 20) {
        return 'top';
      }

      break;

    case 'left':
      if (style.left < 20) {
        return 'right';
      }
      break;

    default:
      if (style.left + tooltip.offsetWidth > window.innerWidth - 20) {
        return 'left';
      }
      break;
  }

  return position;
};

const getBestStyle = (style, tooltip) => {
  const newStyle = { ...style };

  if (newStyle.left < 20) {
    newStyle.left = 20;
  }

  if (newStyle.left + tooltip.offsetWidth > window.innerWidth - 20) {
    newStyle.left = window.innerWidth - (tooltip.offsetWidth + 20);
  }

  return newStyle;
};

export default function getWrapperBestPosition(element, tooltip, defaultPosition) {
  const elementRect = element.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  tooltipRect.offsetWidth = tooltip.offsetWidth;
  tooltipRect.offsetHeight = tooltip.offsetHeight;

  const style = getStylePosition(elementRect, tooltipRect, defaultPosition);
  const newPosition = getBestPosition(style, defaultPosition, tooltipRect);

  if (newPosition !== defaultPosition) {
    return {
      position: newPosition,
      style: getBestStyle(getStylePosition(elementRect, tooltipRect, newPosition), tooltip)
    };
  }

  return {
    position: defaultPosition,
    style: getBestStyle(style, tooltip)
  };
}
