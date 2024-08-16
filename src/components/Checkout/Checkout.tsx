import React from 'react';
import { useCart } from '../../context/CartContext';
import items from '../../data/items.json';
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalCost = cart.reduce((acc, item) => {
    const itemDetails = items.find(i => i.sku === item.sku);
    return acc + (itemDetails?.price || 0) * item.qty;
  }, 0);

  const handleAddToCart = (sku: number, basketLimit: number) => {
    const currentQty = cart.find(item => item.sku === sku)?.qty || 0;
    if (currentQty + 1 <= basketLimit) {
      addToCart(sku, 1);
    } else {
      alert(`Cannot add more than ${basketLimit} items for this product.`);
    }
  };

  return (
    <Box padding="20px">
      <Box display="flex" alignItems="center" marginBottom="20px">
         <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{ marginRight: '10px', textTransform: 'capitalize' }}
        >
          Back
        </Button>
        <Typography variant="h4" flexGrow={1} data-testid='checkout-title'>
          Checkout
        </Typography>
       
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        marginBottom="20px"
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            border: '1px solid #ddd',
            flex: 1,
            marginBottom: { xs: '10px', sm: '0' },
            marginRight: { sm: '10px' },
          }}
        >
          <Typography variant="h6" data-testid='checkout-items-count'>Items: {totalItems}</Typography>
        </Card>
        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            border: '1px solid #ddd',
            flex: 1,
            marginLeft: { sm: '10px' },
          }}
        >
          <Typography variant="h6" data-testid='checkout-items-cost'>Cost: ${totalCost.toFixed(2)}</Typography>
        </Card>
      </Box>

      <Grid container spacing={2}>
        {cart.map(cartItem => {
          const item = items.find(i => i.sku === cartItem.sku);
          return (
            <Grid item xs={12} key={cartItem.sku}>
              <Card
                sx={{
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box flex={2} marginBottom={{ xs: '10px', sm: '0' }}>
                  <Typography variant="h6">{item?.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item?.descr}
                  </Typography>
                </Box>
                <Box flex={1} textAlign={{ xs: 'left', sm: 'center' }}>
                  <Typography variant="h6">${(item?.price || 0).toFixed(2)}</Typography>
                </Box>
                <Box
                  flex={3}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                  marginLeft={{ xs: 0, sm: '16px' }}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                >
                  <Typography flex={1} textAlign="center">
                    Qty: {cartItem.qty}
                  </Typography>
                  <Typography flex={1} textAlign="center">
                    Total: ${(item?.price || 0 * cartItem.qty).toFixed(2)}
                  </Typography>
                  <Button
                    onClick={() => handleAddToCart(cartItem.sku, item?.basketLimit || 0)}
                    variant="contained"
                    data-testid='add-items-btn'
                    sx={{
                      flex: 1,
                      marginRight: { sm: '8px' },
                      marginBottom: { xs: '10px', sm: '0' },
                      height: '40px',
                      textTransform: 'capitalize'
                    }}
                  >
                    Add item
                  </Button>
                  <Button
                    onClick={() => removeFromCart(cartItem.sku)}
                    variant="contained"
                    data-testid='remove-items-btn'
                    sx={{
                      flex: 1,
                      height: '40px',
                      textTransform: 'capitalize'
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box display="flex" justifyContent="flex-end" marginTop="20px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert('Checkout Complete!')}
          disabled={!totalItems}
          data-testid='checkout-btn'
          sx={{
            textTransform: 'capitalize'
          }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;
