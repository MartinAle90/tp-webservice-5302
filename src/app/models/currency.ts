export interface CurrencyResponse {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  result: number; // Este es el valor convertido que nos interesa
}