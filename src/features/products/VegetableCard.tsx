import type { Product } from "../../types/Product";
import { Box, Image, Text, Button } from '@mantine/core';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';

export default function VegetableCard({ id, name, image, price, category }: Product) {
  const [count, setCount] = useState(0);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({ id, name, image, price, category }, count);
    setCount(0);
  };

  return (
    <Box
      component="div"
      style={{
        height: '390px',
        width: '302px',
        borderRadius: '24px',
        backgroundColor: 'white',
      }}
    >
      <Image
        src={image}
        alt={name}
        height="276px"
        width="276px"
        style={{ padding: '16px' }}
      />

      <Box style={{ padding: '0 16px' }}>
        <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Text style={{ fontWeight: 600, fontSize: '18px', marginRight: '12px' }}>
              {name.split(' - ')[0]}
            </Text>
            <Text style={{ fontWeight: 600, fontSize: '14px', color: '#868E96' }}>
              {name.split(' - ')[1]}
            </Text>
          </Box>
          <QuantitySelector value={count} onChange={setCount} />
        </Box>

        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: 600, fontSize: '24px' }}>${price}</Text>
          <Button
            style={{
              backgroundColor: '#E7FAEB',
              color: '#3B944E',
              borderRadius: 8,
              width: 204,
              height: 44,
            }}
            onClick={handleAdd}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
}


