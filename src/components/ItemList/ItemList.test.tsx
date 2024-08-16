import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../utils/testingUtils'
import ItemList from './ItemList';



describe('ItemList Component', () => {
    it('renders the ItemList content', () => {
    render(
     <ItemList />
    );

    expect(screen.getByText(/Items List/)).toBeInTheDocument();
    expect(screen.getByTestId('items-count')).toBeInTheDocument();
    expect(screen.getByText(/Cost/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('add-item-btn')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('remove-item-btn')[0]).toBeInTheDocument();
    expect(screen.getByTestId('checkout-btn')).toBeInTheDocument();
  });

  it('adds the apple product to cart and updates the total', () => {
    render(
      <ItemList />
    );

    fireEvent.change(screen.getAllByLabelText(/Quantity/i)[0], { target: { value: '2' } });
    fireEvent.click(screen.getAllByText(/Add Item/i)[0]);

    expect(screen.getByText(/Items: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Cost: \$2.02/i)).toBeInTheDocument(); 
  });

  it('does not add more items than the basket limit', () => {
    window.alert = jest.fn();

    render(
      <ItemList />
    );

    fireEvent.change(screen.getAllByLabelText(/Quantity/i)[0], { target: { value: '5' } });
    fireEvent.click(screen.getAllByText(/Add Item/i)[0]);

    expect(screen.getByText(/Items: 0/i)).toBeInTheDocument(); 
  });
});
