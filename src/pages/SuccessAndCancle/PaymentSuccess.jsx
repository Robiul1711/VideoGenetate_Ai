import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <CheckCircle className="text-green-600 w-20 h-20 mb-6" />
      <h1 className="text-2xl font-bold text-green-700 mb-2">
        Payment Successful 🎉
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Thank you for your purchase! Your payment has been processed
        successfully. You will receive an email confirmation shortly.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
