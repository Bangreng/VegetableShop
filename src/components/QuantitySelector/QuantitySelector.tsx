import { Box, ActionIcon, Text } from '@mantine/core';

type QuantitySelectorProps = {
  value: number;
  onChange: (newValue: number) => void;
  width?: number;
  height?: number;
}

export default function QuantitySelector({ value, onChange, width = 90, height = 30 }: QuantitySelectorProps) {
  const buttonSize = height;
  const textWidth = width - buttonSize * 2;

  return (
    <Box
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <ActionIcon
        style={{
          width: buttonSize,
          height: buttonSize,
          minWidth: buttonSize,
          backgroundColor: '#DEE2E6',
          color: 'black',
        }}
        onClick={() => onChange(Math.max(value - 1, 0))}
        disabled={value <= 0}
      >
        -
      </ActionIcon>

      <Text
        style={{
          width: textWidth,
          textAlign: 'center',
          fontWeight: 600,
          lineHeight: `${height}px`,
          
        }}
      >
        {value}
      </Text>

      <ActionIcon
        style={{
          width: buttonSize,
          height: buttonSize,
          minWidth: buttonSize,
          backgroundColor: '#DEE2E6',
          color: 'black',
        }}
        onClick={() => onChange(value + 1)}
      >
        +
      </ActionIcon>
    </Box>
  );
}


