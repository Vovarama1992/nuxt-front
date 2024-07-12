const { format } = new Intl.NumberFormat("ru", {
  style: "currency",
  currency: "RUB",
});

export const usePriceFormat = (price: number): string => format(price);
