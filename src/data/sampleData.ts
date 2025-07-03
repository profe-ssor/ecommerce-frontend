// import type { Order, PaymentMethod, Product } from "../types/index2";


// export const sampleProducts: Product[] = [
//   {
//     id: '1',
//     name: 'Premium Wireless Headphones',
//     price: 299.99,
//     image: 'https://images.pexels.com/photos/3945681/pexels-photo-3945681.jpeg',
//     category: 'Electronics',
//     description: 'High-quality wireless headphones with noise cancellation'
//   },
//   {
//     id: '2',
//     name: 'Smart Fitness Watch',
//     price: 199.99,
//     image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg',
//     category: 'Wearables',
//     description: 'Advanced fitness tracking with heart rate monitoring'
//   },
//   {
//     id: '3',
//     name: 'Mechanical Gaming Keyboard',
//     price: 149.99,
//     image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
//     category: 'Gaming',
//     description: 'RGB backlit mechanical keyboard for gaming enthusiasts'
//   },
//   {
//     id: '4',
//     name: 'Ultra-Wide Monitor',
//     price: 449.99,
//     image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
//     category: 'Displays',
//     description: '34-inch curved ultra-wide display for productivity'
//   },
//   {
//     id: '5',
//     name: 'Wireless Charging Pad',
//     price: 39.99,
//     image: 'https://images.pexels.com/photos/4316/mobile-phone-portable-technology-phone.jpg',
//     category: 'Accessories',
//     description: 'Fast wireless charging for compatible devices'
//   }
// ];

// export const samplePaymentMethods: PaymentMethod[] = [
//   {
//     id: '1',
//     type: 'credit',
//     last4: '4242',
//     brand: 'Visa'
//   },
//   {
//     id: '2',
//     type: 'paypal'
//   },
//   {
//     id: '3',
//     type: 'apple_pay'
//   }
// ];

// export const sampleOrders: Order[] = [
//   {
//     id: '1',
//     orderNumber: 'ORD-2024-001',
//     date: '2024-01-15',
//     status: 'delivered',
//     items: [
//       {
//         id: '1',
//         product: sampleProducts[0],
//         quantity: 1
//       },
//       {
//         id: '2',
//         product: sampleProducts[1],
//         quantity: 2
//       }
//     ],
//     total: 699.97,
//     shippingAddress: {
//       fullName: 'John Doe',
//       address: '123 Main St',
//       city: 'New York',
//       state: 'NY',
//       zipCode: '10001',
//       country: 'USA'
//     },
//     paymentMethod: samplePaymentMethods[0]
//   },
//   {
//     id: '2',
//     orderNumber: 'ORD-2024-002',
//     date: '2024-01-20',
//     status: 'processing',
//     items: [
//       {
//         id: '3',
//         product: sampleProducts[2],
//         quantity: 1
//       }
//     ],
//     total: 149.99,
//     shippingAddress: {
//       fullName: 'John Doe',
//       address: '123 Main St',
//       city: 'New York',
//       state: 'NY',
//       zipCode: '10001',
//       country: 'USA'
//     },
//     paymentMethod: samplePaymentMethods[1]
//   }
// ];