// GrowUps Razorpay Integration Helper
// Key ID: rzp_test_TYGuf1uL6B9fAl
// Key Secret: yGkEiMIsAWuZaRuBARcQiumO

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const RAZORPAY_KEY_ID = 'rzp_test_TYGuf1uL6B9fAl';

export interface RazorpayPaymentOptions {
  amountINR: number;
  purpose: string;
  description: string;
  userName: string;
  userEmail: string;
  userContact?: string;
  onSuccess: (response: { razorpay_payment_id: string; razorpay_order_id?: string; razorpay_signature?: string }) => void;
  onFailure?: (error: any) => void;
}

export const openRazorpayCheckout = (options: RazorpayPaymentOptions) => {
  if (typeof window === 'undefined') return;

  const rzpOptions = {
    key: RAZORPAY_KEY_ID,
    amount: options.amountINR * 100, // In Paise (1 INR = 100 Paise)
    currency: 'INR',
    name: 'GrowUps Startup Ecosystem',
    description: `${options.purpose}: ${options.description}`,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    handler: function (response: any) {
      options.onSuccess(response);
    },
    prefill: {
      name: options.userName,
      email: options.userEmail,
      contact: options.userContact || '+91 98765 43210'
    },
    notes: {
      platform: 'GrowUps AI Platform',
      purpose: options.purpose
    },
    theme: {
      color: '#2563EB' // Innovation Blue
    },
    modal: {
      ondismiss: function () {
        if (options.onFailure) {
          options.onFailure({ message: 'Payment cancelled by user' });
        }
      }
    }
  };

  if (window.Razorpay) {
    const rzp = new window.Razorpay(rzpOptions);
    rzp.open();
  } else {
    // Fallback simulated payment modal if SDK is loading or offline
    const confirmed = window.confirm(
      `[GrowUps Razorpay Test Checkout]\n\nPurpose: ${options.purpose}\nAmount: ₹${options.amountINR.toLocaleString('en-IN')}\nKey: ${RAZORPAY_KEY_ID}\n\nClick OK to simulate successful test payment authorization.`
    );
    if (confirmed) {
      const mockPaymentId = 'pay_test_' + Math.random().toString(36).substring(2, 12).toUpperCase();
      options.onSuccess({ razorpay_payment_id: mockPaymentId });
    } else if (options.onFailure) {
      options.onFailure({ message: 'Cancelled by user' });
    }
  }
};
