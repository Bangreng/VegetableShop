import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { CartContext } from '../../features/cart/CartContext';
import CartPopup from './CartPopup';
import type { CartItem } from '../../features/cart/CartContext';

describe('CartPopup', () => {
  const mockCart: CartItem[] = [
    { 
      id: '1', 
      name: 'Tomato', 
      price: 100, 
      category: 'Vegetable', 
      image: 'tomato.jpg', 
      quantity: 2 
    },
    { 
      id: '2', 
      name: 'Cucumber', 
      price: 50, 
      category: 'Vegetable', 
      image: 'cucumber.jpg', 
      quantity: 1 
    },
  ];

  const mockAddToCart = vi.fn();
  const mockRemoveFromCart = vi.fn();

  const renderCartPopup = (visible = true, cart = mockCart) => {
    return render(
      <MantineProvider>
        <CartContext.Provider
          value={{
            cart,
            totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            addToCart: mockAddToCart,
            removeFromCart: mockRemoveFromCart,
          }}
        >
          <CartPopup visible={visible} />
        </CartContext.Provider>
      </MantineProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Рендерит popup с товарами', () => {
    renderCartPopup();
    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByText('Cucumber')).toBeInTheDocument();
    expect(screen.getByText('$250.00')).toBeInTheDocument();
  });

  it('Удаляет товар из корзины при установке количества в 0 через QuantitySelector', async () => {
    const user = userEvent.setup();
    
    let quantity = 2;
    mockAddToCart.mockImplementation((_item, delta) => {
      quantity += delta;
      if (quantity <= 0) {
        mockRemoveFromCart('1');
      }
    });

    renderCartPopup();

    const decrementButtons = screen.getAllByRole('button', { name: '-' });

    await user.click(decrementButtons[0]);
    await user.click(decrementButtons[0]);

    await waitFor(() => {
      expect(mockRemoveFromCart).toHaveBeenCalledWith('1');
      expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
    });
  });

  it('Обновляет количество товара при изменении через + и -', async () => {
    const user = userEvent.setup();
    renderCartPopup();

    const decrementButtons = screen.getAllByRole('button', { name: '-' });
    const incrementButtons = screen.getAllByRole('button', { name: '+' });

    await user.click(decrementButtons[0]);

    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({ id: '1' }),
      -1
    );

    await user.click(incrementButtons[1]);

    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({ id: '2' }),
      1
    );
  });
});

