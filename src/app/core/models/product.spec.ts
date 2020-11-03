import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product({id: '1', name: 'uno'})).toBeTruthy();
  });
});
