export default function tooltipKeyProptype(
  { displayTooltip, tooltipKey },
  propName,
  componentName
) {
  if (displayTooltip && !tooltipKey) {
    return new Error(
      `Invalid ${propName} supplied to ${componentName}: Please provide the tooltipKey prop`
    );
  }
  return null;
}
