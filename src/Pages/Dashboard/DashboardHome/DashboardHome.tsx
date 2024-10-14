import { useAppSelector } from "../../../redux/hooks/hooks";
import AdminOverview from "../Overview/AdminOverview";
import BuyarOverview from "../Overview/BuyarOverview";
import SellerOverview from "../Overview/SellerOverview";


const DashboardHome = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div>
      {user && (
        <div>
          {user.role === "Admin" && <AdminOverview></AdminOverview>}
          {user.role === "Seller" && <SellerOverview></SellerOverview>}
          {user.role === "Buyer" && <BuyarOverview></BuyarOverview>}
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
