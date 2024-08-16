import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import items from '../../data/items.json';
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from '@mui/material';


const ItemList: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleAddToCart = (sku: number, basketLimit: number) => {
    const currentQty = cart.find(item => item.sku === sku)?.qty || 0;
    const qtyToAdd = quantities[sku] || 1;
    if (currentQty + qtyToAdd <= basketLimit) {
      addToCart(sku, qtyToAdd);
    } else {
      alert(`Cannot add more than ${basketLimit} items to the cart.`);
    }
  };

  const handleQuantityChange = (sku: number, qty: string) => {
    setQuantities({ ...quantities, [sku]: parseInt(qty) });
  };

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalCost = cart.reduce((acc, item) => {
    const itemDetails = items.find(i => i.sku === item.sku);
    return acc + (itemDetails?.price || 0) * item.qty;
  }, 0);

  return (
    <Box padding="20px">
      <Typography variant="h4" marginBottom="20px" data-testid='items-title'>
        Items List
      </Typography>

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
          <Typography variant="h6" data-testid='items-count'>Items: {totalItems}</Typography>
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
          <Typography variant="h6" data-testid='items-total'>Cost: ${totalCost.toFixed(2)}</Typography>
        </Card>
      </Box>

      <Grid container spacing={2}>
        {items.map(item => (
          <Grid item xs={12} key={item.sku}>
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
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.descr}
                </Typography>
              </Box>
              <Box flex={1} textAlign={{ xs: 'left', sm: 'center' }} marginBottom={{ xs: '10px', sm: '0' }}>
                <Typography variant="body2" color="textSecondary">Price</Typography>
                <Typography variant="h6">${item.price.toFixed(2)}</Typography>
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
                <TextField
                  id='quantity-field'
                  label="Quantity"
                  type="number"
                  value={quantities[item.sku] || ''}
                  onChange={(e) => handleQuantityChange(item.sku, e.target.value)}
                  inputProps={{ min: 0, 'data-testid': 'quantity-field' }}
                  sx={{
                    flex: 1, 
                    marginRight: { sm: '8px' },
                    marginBottom: { xs: '10px', sm: '0' },
                    height: '56px', 
                  }}
                />
                <Button
                  onClick={() => handleAddToCart(item.sku, item.basketLimit)}
                  variant="contained"
                  data-testid='add-item-btn'
                  sx={{
                    flex: 1,
                    marginRight: { sm: '8px' },
                    marginBottom: { xs: '10px', sm: '0' },
                    height: '56px', 
                    textTransform: 'capitalize'
                  }}
                >
                  Add item
                </Button>
                <Button
                  onClick={() => removeFromCart(item.sku)}
                  variant="contained"
                  data-testid='remove-item-btn'
                  sx={{
                    flex: 1,
                    height: '56px', 
                    textTransform: 'capitalize'
                  }}
                >
                  Remove
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="flex-end" marginTop="20px" data-testid='checkout-btn'>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/checkout"
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

export default ItemList;
