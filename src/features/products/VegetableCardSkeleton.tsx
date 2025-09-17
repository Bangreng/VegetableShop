import { Box, Skeleton } from '@mantine/core';

export default function VegetableCardSkeleton() {
  return (
    <Box
      component="div"
      style={{
        height: '414px',
        width: '302px',
        borderRadius: '24px',
        backgroundColor: 'white',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: 276,
          borderRadius: 12,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Skeleton height="100%" width="100%" radius="md" />
        <Box
          component="div"
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="2.44444" height="19.5556" rx="1.22222" fill="#CED4DA" />
            <rect x="4.88892" y="6.51849" width="2.44444" height="6.51852" rx="1.22222" fill="#CED4DA" />
            <rect x="9.77783" y="3.25928" width="2.44444" height="13.037" rx="1.22222" fill="#CED4DA" />
            <rect x="14.6666" y="6.51849" width="2.44444" height="6.51852" rx="1.22222" fill="#CED4DA" />
            <rect x="19.5555" width="2.44444" height="19.5556" rx="1.22222" fill="#CED4DA" />
          </svg>
        </Box>
      </Box>
    </Box>
  );
}
