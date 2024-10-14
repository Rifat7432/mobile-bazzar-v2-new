import { TUser } from "../../../../globalTypes/globalTypes";
import UserTableBody from "./UserTableBody";

const UserTable = ({ users }: { users: TUser[] }) => {
  return (
    <div className="overflow-x-auto shadow-lg">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th></th>
            <th>image</th>
            <th>Name</th>
            <th>email</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <UserTableBody
              key={user._id}
              user={user}
              i={i}
            ></UserTableBody>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
