const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createProduct() {
  // Создаем продукт
  const product = await stripe.products.create({
    name: 'Card Prank',
    description: 'Handwritten mystery prank card',
  });

  // Создаем цену для продукта
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 898, // $8.98 в центах
    currency: 'usd',
  });

  console.log('Price ID:', price.id);
  return price.id;
}

createProduct(); 