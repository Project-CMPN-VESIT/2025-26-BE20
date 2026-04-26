export function getColor(varName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}
export const getLightModePrimary = () => getColor('--color-primary');
export const getLightModeSecondary = () => getColor('--color-secondary');