import { describe, it, expect, vi } from 'vitest';
import { render, screen} from "@testing-library/react";
import { MantineProvider } from '@mantine/core';
import Main from './Main';
import { CartProvider } from '../../features/cart/CartContext';
import userEvent from '@testing-library/user-event';

const mockUseProducts = vi.fn();
const addToCartMock = vi.fn();


vi.mock('../../hooks/useCart', () => ({
  useCart: () => ({ addToCart: addToCartMock }),
}));

vi.mock('../../hooks/useProducts', () => ({
  default: () => mockUseProducts(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Main', () => {
  it('Показывает скелетоны, когда идет загрузка', () => {
    mockUseProducts.mockReturnValue({ catalog: [], loading: true });
    const { container } = render(
      <MantineProvider>
        <CartProvider>
          <Main />
        </CartProvider>
      </MantineProvider>
    );

    const skeletons = container.getElementsByClassName('mantine-Skeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('Рендерит все товары из каталога после загрузки', () => {
    const mockCatalog = [
      { id: '1', name: 'Tomato', image: 'tomato.jpg', price: 100, category: 'Vegetable' },
      { id: '2', name: 'Cucumber', image: 'cucumber.jpg', price: 50, category: 'Vegetable' },
    ];
    mockUseProducts.mockReturnValue({ catalog: mockCatalog, loading: false });

    render(
      <MantineProvider>
        <CartProvider>
          <Main />
        </CartProvider>
      </MantineProvider>
    );

    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByText('Cucumber')).toBeInTheDocument();
  });

   it('Добавляет товар в корзину при клике на Add to Cart', async () => {
    const user = userEvent.setup();

    mockUseProducts.mockReturnValue({
      catalog: [
        { id: '1', name: 'Tomato', image: 'tomato.jpg', price: 100, category: 'Vegetable' }
      ],
      loading: false,
    });

    render(
      <MantineProvider>
        <CartProvider>
          <Main />
        </CartProvider>
      </MantineProvider>
    );

    const addButton = await screen.findByRole('button', { name: /add to cart/i });
    await user.click(addButton);

    expect(addToCartMock).toHaveBeenCalledWith(
      { id: '1', name: 'Tomato', image: 'tomato.jpg', price: 100, category: 'Vegetable' },
      0
    );
  });
});
