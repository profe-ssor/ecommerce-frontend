// Service to connect to your hosted Paystack integration
// Backend API: https://paystack-integration-ldwp.onrender.com
// Frontend: https://pay-stack-dun.vercel.app/

export interface PaystackPaymentData {
  email: string;
  amount: number;
  currency?: string;
  payment_method?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_country?: string;
  callback_url?: string;
  metadata?: Record<string, unknown>;
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: string;
    reference: string;
    amount: number;
    paid_at: string;
    channel: string;
    gateway_response: string;
  };
}

// Use proxy for development to avoid CORS issues
const PAYSTACK_BASE_URL = '/api/paystack';

export const initializePaystackPayment = async (paymentData: PaystackPaymentData): Promise<PaystackResponse> => {
  try {
    console.log('Making request to:', `${PAYSTACK_BASE_URL}/api/payments/initialize/`);
    console.log('Request payload:', paymentData);
    
    const response = await fetch(`${PAYSTACK_BASE_URL}/api/payments/initialize/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error text:', errorText);
      throw new Error(`Paystack API error: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log('Response data:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error initializing Paystack payment:', error);
    throw error;
  }
};

// Function to test API connection
export const testProxyConnection = async () => {
  console.log('Testing API connection...');
  console.log('Current PAYSTACK_BASE_URL:', PAYSTACK_BASE_URL);
  
  try {
    // Test the index endpoint
    const response = await fetch(`${PAYSTACK_BASE_URL}/api/payments/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API test response:', response.status, response.statusText);
    
    if (response.ok) {
      const data = await response.text();
      console.log('API test data:', data.substring(0, 200) + '...');
    }
  } catch (error) {
    console.error('API test failed:', error);
  }
};

export const verifyPaystackPayment = async (reference: string): Promise<PaystackVerificationResponse> => {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/api/payments/verify/${reference}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Paystack verification error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying Paystack payment:', error);
    throw error;
  }
}; 