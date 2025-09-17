import { Text, Box, Button } from '@mantine/core'
import { IconShoppingCart } from '@tabler/icons-react';
import { useCart } from '../../hooks/useCart';
import { useState } from 'react';
import CartPopup from '../../features/cart/CartPopup';

export default function Header() {
    const { totalItems } = useCart();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <Box
            component="header"
            style={{
                position: 'sticky',
                top: 0,
                height: '59px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '20px',
                zIndex: 1000,
                paddingRight: '20px',
            }}
        >
            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '209px',
                        height: '33px',
                        paddingLeft: '12px',
                        borderRadius: '31px',
                        backgroundColor: '#F7F7F7',
                        fontFamily: 'Inter, sans-serif',
                    }}
                >
                    <Text
                        component="a"
                        href="/"
                        style={{
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '22px',
                            color: '#000000',
                            lineHeight: '100%'
                        }}
                    >
                        Vegetable
                    </Text>
                    <Text
                        component="a"
                        href="/shop"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 500,
                            backgroundColor: '#54B46A',
                            color: 'white',
                            width: '80px',
                            height: '33px',
                            borderRadius: '21px',
                            textDecoration: 'none',
                            fontSize: '20px',
                            lineHeight: '100%'
                        }}
                    >
                        SHOP
                    </Text>
                </Box>
                <Box pos='relative'>
                    <Button
                        
                        style={{
                            backgroundColor: '#54B46A',
                            border: 'none',
                            color: 'white',
                            width: '144px',
                            height: '44px',
                            borderRadius: '8px',
                        }}
                        onClick={() => setIsPopupOpen((prev) => !prev)}
                    >
                        <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', justifyContent: 'center' }}>
                            {totalItems > 0 && (
                                <Box
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        backgroundColor: 'white',
                                        color: '#54B46A',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 600,
                                        fontSize: '12px',
                                    }}
                                >
                                    {totalItems}
                                </Box>
                            )}
                            <Text fw={600}>Cart</Text>
                            <IconShoppingCart size={20} />
                        </Box>
                    </Button>

                    <CartPopup visible={isPopupOpen} />
                </Box>
            </Box>
        </Box>
    );
}