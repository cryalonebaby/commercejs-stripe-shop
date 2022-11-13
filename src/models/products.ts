export interface IProduct {
  id: string,
  name: string,
  description: string,
  active: boolean,
  categories: any[],
  price: {
    raw: number,
    formatted: string,
    formatted_with_symbol: string,
    formatted_with_code: string
  }
  image: {
    id: string,
    url: string
  },
}
