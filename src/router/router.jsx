import Dashboard from "@/components/admin/Dashboard";
import MyProjects from "@/components/admin/MyProjects";
import MySubscription from "@/components/admin/MySubscription";
import Setting from "@/components/admin/Setting";
import MyPricePlan from "@/components/common/Dashboard_Components/MyPricePlan";
import VideoEditorInterface from "@/components/common/Dashboard_Components/VideoEditorInterface";
import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import Layout from "@/layout/Layout";
import About from "@/pages/AboutPage/About";
import ForgetPassword from "@/pages/AuthPages/ForgetPassword";
import NewPasswordSet from "@/pages/AuthPages/NewPasswordSet";
import SignIn from "@/pages/AuthPages/SignIn";
import SignUp from "@/pages/AuthPages/SignUp";
import VerifyOtp from "@/pages/AuthPages/VerifyOtp";
import Home from "@/pages/home/Home";
import Pricing from "@/pages/PricingPage/Pricing";
import PaymentCancel from "@/pages/SuccessAndCancle/PaymentCancel";
import PaymentSuccess from "@/pages/SuccessAndCancle/PaymentSuccess";

import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import EditVIdeo from "@/components/admin/EditVIdeo";

const router = createBrowserRouter([
  // Auth
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "new-password-set",
        element: <NewPasswordSet />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/cancle",
        element: <PaymentCancel />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "edit/:id",
        element: <EditVIdeo />,
      },

      {
        path: "my-projects",
        element: <MyProjects />,
      },
      {
        path: "my-subscription",
        element: <MySubscription />,
      },
      {
        path: "settings",
        element: <Setting />,
      },
    ],
  },
]);

export default router;
