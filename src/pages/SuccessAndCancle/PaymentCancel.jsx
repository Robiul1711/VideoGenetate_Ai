import React from "react";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <XCircle className="text-red-600 w-20 h-20 mb-6" />
      <h1 className="text-2xl font-bold text-red-700 mb-2">
        Payment Cancelled ❌
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Your payment was not completed. If this was a mistake, you can try again
        or choose another payment method.
      </p>
      <Link
        to="/checkout"
        className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancel;
