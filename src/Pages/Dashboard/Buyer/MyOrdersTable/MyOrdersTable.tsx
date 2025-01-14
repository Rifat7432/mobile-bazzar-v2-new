import { TOrder } from "../../../../globalTypes/globalTypes";
import MyOrdersTableBody from "./MyOrdersTableBody";

const MyOrdersTable = ({ orders }: { orders: TOrder[] }) => {
  return (
    <div className="overflow-x-auto shadow-lg">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Location</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <MyOrdersTableBody
              key={order._id}
              order={order}
              i={i}
              
            ></MyOrdersTableBody>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrdersTable;
