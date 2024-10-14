import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";
import Navbar from "../../Pages/Shered/Navbar/Navbar";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {user && (
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {user.role === "Seller" && (
                <>
                  <li>
                    <Link to={"/dashboard/overview-seller"}>Overview</Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/addProduct"}>Add Product</Link>
                  </li>

                  <li>
                    <Link to={"/dashboard/myProduct"}>My Product</Link>
                  </li>
                </>
              )}
              {user.role === "Buyer" && (
                <>
                  <li>
                    <Link to={"/dashboard/overview-buyer"}>Overview</Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/myOrders"}>My Orders</Link>
                  </li>
                </>
              )}
              {user.role === "Admin" && (
                <>
                  <li>
                    <Link to={"/dashboard/overview-admin"}>Overview</Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/allSellers"}>All Sellers</Link>
                  </li>

                  <li>
                    <Link to={"/dashboard/allBuyers"}>All Buyers</Link>
                  </li>
                  <li>
                    <Link to={"/dashboard/report"}>Reported Items</Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
