import { useState, useEffect } from 'react';
import ky from 'ky';
import type { Product } from './../types/Product';

export default function useProducts() {
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        const products = await ky
          .get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
          .json<Product[]>();
        setCatalog(products);
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, []);

  return { catalog, loading };
}