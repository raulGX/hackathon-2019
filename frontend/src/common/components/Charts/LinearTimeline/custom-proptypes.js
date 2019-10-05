export default function gradientIdProptype(
  { hasReferenceLine, gradientId },
  propName,
  componentName
) {
  if (hasReferenceLine && !gradientId) {
    return new Error(
      `Invalid ${propName} supplied to ${componentName}: Please provide a unique gradientId`
    );
  }
  return null;
}
