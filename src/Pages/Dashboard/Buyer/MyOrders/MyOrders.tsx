import { useAppSelector } from "../../../../redux/hooks/hooks";
import { useGetOrdersQuery } from "../../../../redux/services/API";
import Loader from "../../../Shered/Loader/Loader";
import MyOrdersTable from "../MyOrdersTable/MyOrdersTable";

const MyOrders = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetOrdersQuery(user?.email as string);
  const orders = data?.data ? data?.data : [];
  return (
    <div className="mt-16">
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div>
          {orders.length > 0 ? (
            <MyOrdersTable orders={orders}></MyOrdersTable>
          ) : (
            <h1 className="text-4xl mt-32 font-semibold  text-center">
              no orders found
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
