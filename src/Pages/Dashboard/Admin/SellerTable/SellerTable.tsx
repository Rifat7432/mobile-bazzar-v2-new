import { TUser } from "../../../../globalTypes/globalTypes";
import SellerTableBody from "./SellerTableBody";

const SellerTable = ({ users }: { users: TUser[] }) => {
  return (
    <div className="overflow-x-auto shadow-lg">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th></th>
            <th>image</th>
            <th>Name</th>
            <th>Email</th>
            <th>verification</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <SellerTableBody key={user._id} user={user} i={i}></SellerTableBody>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerTable;
