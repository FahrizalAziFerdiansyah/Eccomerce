export const formatCurrency = number => {
  return new Intl.NumberFormat('en-ID', {
    maximumSignificantDigits: 3,
  }).format(number);
};
