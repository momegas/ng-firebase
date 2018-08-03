export class Product {
  id?: string;
  name: string;
  slug: string;
  brand: string;
  images: { id: string; url: string; isMain: boolean }[];
}
