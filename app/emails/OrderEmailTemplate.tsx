export function OrderEmailTemplate(orderId: number, totalPrice: number) {
  return `
    <h2>Order Progressing</h2>

    <p>Your OrderId <strong>${orderId}</strong> At <strong>Exclusive</strong></p>
    <p>With Total Price <strong>$${totalPrice}</strong></p>
    <p>Is Now <strong>In Progress</strong> And Will Be Delivered Through</p>
    <p><strong>The Next 7 Days</strong></p>
  `;
}
