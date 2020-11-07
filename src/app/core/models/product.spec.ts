import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product({
      id: 1,
      brand: 'brand',
      description: 'description',
      image: 'image',
      price: 1,
      discount: 10
    })).toBeTruthy();
  });
});
