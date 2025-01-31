import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Order } from './order.entity';
import { User } from 'src/user/user.entity';
import { Product } from 'src/shop/entities/product.entity';

const Razorpay = require('razorpay');
@Injectable()
export class OrdersService {
  private razorpay: any;
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY_ID,
      key_secret: process.env.RAZORPAY_API_KEY_SECRET,
    });
  }

  async createOrder(firebaseUid: string | null, items: any[], OrderInfo: any) {
    // Construct the order object with the billing details
    const orderObject = {
      Name: `${OrderInfo.firstName} ${OrderInfo.lastName}`,
      CompanyName: OrderInfo.companyName || null,
      Country: OrderInfo.country,
      StreetAddress: `${OrderInfo.streetAddress}, ${OrderInfo.apartment || ''}`,
      City: OrderInfo.city,
      State: OrderInfo.state,
      Pincode: OrderInfo.pinCode,
      PaymentMethod: OrderInfo.paymentMethod,
      Phone: OrderInfo.phone,
      Email: OrderInfo.email,
      OrderNotes: OrderInfo.orderNotes || null,
    };

    // Fetch product information and calculate total price for each item
    const allProducts = await Promise.all(
      items.map(async (product: any) => {
        const productInfo = await this.productRepository.findOneBy({
          id: product.productId,
        });
        return {
          productId: productInfo.id,
          name: productInfo.name,
          price: productInfo.discountprice,
          quantity: product.quantity,
          totalPrice: product.quantity * productInfo.discountprice,
          imageUrl: product.imageUrl,
        };
      }),
    );

    const finalAmount = allProducts.reduce(
      (acc, product) => acc + product.totalPrice,
      0,
    );

    const totalAmount: number = parseInt(
      (finalAmount + finalAmount * 0.028).toFixed(0),
    );

    // Create the order entity
    let razorpayOrderId: string | null = null;
    if (OrderInfo.paymentMethod !== 'cashOnDelivery') {
      const razorpayOrder = await this.razorpay.orders.create({
        amount: totalAmount * 100, // Amount in the smallest currency unit (e.g., paise for INR)
        currency: 'INR',
        receipt: `order_${Date.now()}`,
      });
      razorpayOrderId = razorpayOrder.id;
    }

    const order = this.orderRepository.create({
      firebaseUid,
      orderInfo: orderObject,
      items: allProducts,
      totalAmount,
      razorpayOrderId, // Store the Razorpay order ID or null
    });

    const result = await this.orderRepository.save(order);

    console.log(result);
    return { result, razorpayOrderId };
  }

  async confirmPayment(paymentDetails: any) {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      paymentDetails;

    // Implement your payment verification logic here

    // Example: Find the order by razorpayOrderId and update payment status
    const order = await this.orderRepository.findOneBy({ razorpayOrderId });

    if (!order) {
      throw new Error('Order not found');
    }

    order.paymentStatus = 'confirmed';
    await this.orderRepository.save(order);

    return { success: true };
  }


  async fetchOrders(objectinput: any) {
    // firebaseUid1.toString().trim(); // Remove any extra spaces
    const orders = await this.orderRepository.find({
      where: { firebaseUid: objectinput.firebaseUid, paymentStatus: "confirmed" },
      relations: ['items'],
    });
    return orders;
}
}
