export type Category = {
    _id: string;
    title: string;
  };
  
export type Subcategory = {
    _id: string;
    title: string;
    category?: Category;
  };

export type ProductVariant = {
    _key: string;
    color?: string;
    size?: string;
    mount?: string;
    price: number;
    image?: { asset: { url: string } };
  };
  
export type Item = {
    _id: string;
    title: string;
    brand?: string;
    variantType?: 'standard' | 'background' | 'lensMount';
    variants?: ProductVariant[];
    catalogVariant?: ProductVariant;
    catalogKey?: string;
    description?: string;
    price?: number;
    availabilityInquiry?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    images?: any[]; 
    subcategory?: Subcategory;
    category?: Category;
    discountedPrice?: number;
  };
