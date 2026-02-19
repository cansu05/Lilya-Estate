function parseIntSafe(value) {
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : null;
}

export { parseIntSafe };
