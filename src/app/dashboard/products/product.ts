export class Product {
  id?: string;
  name: string;
  slug: string;
  brand: string;
  images: { url: string; isMain: boolean }[];
}
