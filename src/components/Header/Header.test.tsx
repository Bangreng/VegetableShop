
import { describe, it, expect } from 'vitest';
import Header from './Header';
import { CartProvider } from '../../features/cart/CartContext';
import { fireEvent, getByText, screen, within, render } from "@testing-library/react";
import { MantineProvider } from '@mantine/core';

describe('Header', () => {
  it('отображает кнопку Cart', () => {
    render(
      <MantineProvider>
        <CartProvider>
          <Header />
        </CartProvider>
      </MantineProvider>
    );

    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
  });

  it('Открывается popup при клике на кнопку Cart', () => {
    render(
      <MantineProvider>
        <CartProvider>
          <Header />
        </CartProvider>
      </MantineProvider>
    );

    const cartButton = screen.getByRole('button', { name: /Cart/i });
    expect(cartButton).toBeInTheDocument();

    fireEvent.click(cartButton)
    expect(screen.getByText(/Your cart is empty!/i)).toBeInTheDocument();
  })

  it('Происходит закрытие popup при  клике на кнопку Cart', () => {
    render(
      <MantineProvider>
        <CartProvider>
          <Header />
        </CartProvider>
      </MantineProvider>      
    )

    const cartBtn = screen.getByRole('button', {name: /Cart/i});
    expect(cartBtn).toBeInTheDocument();

    fireEvent.click(cartBtn);
    expect(screen.getByText(/Your cart is empty!/i)).toBeInTheDocument();

    fireEvent.click(cartBtn);
    expect(screen.queryByText(/Your cart is empty!/i)).not.toBeInTheDocument();
  })
});