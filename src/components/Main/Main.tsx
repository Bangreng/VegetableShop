import useProducts from '../../hooks/useProducts';
import { Box, Text } from '@mantine/core';
import VegetableCard from '../../features/products/VegetableCard';
import VegetableCardSkeleton from '../../features/products/VegetableCardSkeleton';

export default function Main() {
  const { catalog, loading } = useProducts();

  return (
    <Box
      component="main"
      style={{
        backgroundColor: '#F3F5FA',
        paddingLeft: '80px',
        paddingRight: '80px',
        paddingTop: '60px',
        minHeight: '500px',
      }}
    >
      <Text
        component="h2"
        style={{ fontSize: '32px', fontWeight: 600, marginBottom: '49px' }}
      >
        Catalog
      </Text>

      <Box
        component="div"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '25px',
          paddingBottom: '20px',
        }}
      >
        {loading
          ? 
            Array.from({ length: 12 }).map((_, index) => (
              <VegetableCardSkeleton key={index} />
            ))
          : 
            catalog.map(({ id, name, image, price, category }) => (
              <VegetableCard
                key={id}
                id={id}
                name={name}
                image={image}
                price={price}
                category={category}
              />
            ))}
      </Box>
    </Box>
  );
}