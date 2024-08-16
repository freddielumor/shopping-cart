describe('Item List Component', () => {

  it('renders the itemList flow', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-testid="items-count"]').should('contain', 'Items: 0');
    cy.get('[data-testid="items-total"]').should('contain', 'Cost: $0.00');

    cy.get('input[id="quantity-field').eq(0).clear().type('2');
    cy.contains('Add item').click();

    cy.get('[data-testid="items-count"]').should('contain', 'Items: 2');
    cy.get('[data-testid="items-total"]').should('contain', 'Cost: $2.02');  // Adjust based on item price

    cy.get('[data-testid="checkout-btn"]').should('contain', 'Checkout').click();
  });

});

