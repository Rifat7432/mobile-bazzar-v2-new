import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
// import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import CategoryProducts from "../Pages/Products/CategoryProducts/CategoryProducts";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/SignUp";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Blog from "../Pages/Blog/Blog";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct/AddProduct";
import MyProduct from "../Pages/Dashboard/Seller/MyProduct/MyProduct";
import AllSellers from "../Pages/Dashboard/Admin/AllSellers/AllSellers";
import AllBuyers from "../Pages/Dashboard/Admin/AllBuyers/AllBuyers";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders/MyOrders";
import Report from "../Pages/Dashboard/Admin/Report/Report";
import Payment from "../Pages/Dashboard/Buyer/Payment/Payment";
import NothingFound from "../Pages/NothingFound/NothingFound";
import SubRoute from "./SubRoute";
import Private from "./Private";
import ProductDetail from "../Pages/Products/ProductDetail/ProductDetail";
import SellerOverview from "../Pages/Dashboard/Overview/SellerOverview";
import BuyarOverview from "../Pages/Dashboard/Overview/BuyarOverview";
import AdminOverview from "../Pages/Dashboard/Overview/AdminOverview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/category/:id",
        element: <CategoryProducts></CategoryProducts>,
      },
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/detail-product/:id",
        element: <ProductDetail></ProductDetail>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Private>
        <Dashboard></Dashboard>
      </Private>
    ),
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/addProduct",
        element: (
          <SubRoute role="Seller">
            <AddProduct></AddProduct>
          </SubRoute>
        ),
      },
      {
        path: "/dashboard/overview-seller",
        element: (
          <SubRoute role="Seller">
            <SellerOverview></SellerOverview>
          </SubRoute>
        ),
      },
      {
        path: "/dashboard/myProduct",
        element: (
          <SubRoute role="Seller">
            <MyProduct></MyProduct>
          </SubRoute>
        ),
      },
      {
        path: "/dashboard/allSellers",
        element: (
          <SubRoute role="Admin">
            <AllSellers></AllSellers>
          </SubRoute>
        ),
      },
      {
        path: "/dashboard/allBuyers",
        element: (
          <SubRoute role="Admin">
            <AllBuyers></AllBuyers>
          </SubRoute>
        ),
      },
      {
        path: "/dashboard/myOrders",
        element: (
          <SubRoute role="Buyer">
            <MyOrders></MyOrders>
          </SubRoute>
        ),
      },
      {
        path: "/dashboard/overview-buyer",
        element: (
          <SubRoute role="Buyer">
            <BuyarOverview></BuyarOverview>
          </SubRoute>
        ),
      },
      {
        path: "/dashboard/overview-admin",
        element: (
          <SubRoute role="Admin">
            <AdminOverview></AdminOverview>
          </SubRoute>
        ),
      },
      {
        path: "/dashboard/report",
        element: (
          <SubRoute role="Admin">
            <Report></Report>
          </SubRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <SubRoute role="Buyer">
            <Payment></Payment>
          </SubRoute>
        ),
      },
      {
        path: "/dashboard/*",
        element: <NothingFound></NothingFound>,
      },
    ],
  },
  {
    path: "*",
    element: <NothingFound></NothingFound>,
  },
]);
export default router;
