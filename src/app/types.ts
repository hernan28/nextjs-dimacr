export type Category = {
    _id: string;
    title: string;
  };
  
export type Subcategory = {
    _id: string;
    title: string;
    category?: Category;
  };
  
export type Item = {
    _id: string;
    title: string;
    description?: string;
    price?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    images?: any[]; 
    subcategory?: Subcategory;
  };