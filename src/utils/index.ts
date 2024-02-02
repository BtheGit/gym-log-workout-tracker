// For manually coercing <Input type="number" /> fields to numbers for processing.
export function inputToNumber(inputValue: string) {
  const convertedValue = +inputValue;
  return Number.isNaN(convertedValue) ? 0 : convertedValue;
}
