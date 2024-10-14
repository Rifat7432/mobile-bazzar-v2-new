import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useDeleteUserMutation,
  useVerifySellerMutation,
} from "../../../../redux/services/API";
import { TUser } from "../../../../globalTypes/globalTypes";
import { signUpFnProvider } from "../../../../Fairbase/firebaseUtils";

const SellerTableBody = ({ user, i }: { user: TUser; i: number }) => {
  const [deleteUser] = useDeleteUserMutation();
  const [verifyUser] = useVerifySellerMutation();
  const { name, email, sellerVerified, userImg, _id } = user;
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(user?._id);
        await signUpFnProvider.removeAccount();
        Swal.fire("Deleted!", ` Seller ${name} has been deleted.`, "success");
      }
    });
  };
  const verify = async () => {
    await verifyUser(_id);

    toast.success("Seller verified successfully");
  };

  return (
    <tr>
      <th>{i + 1}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={userImg} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        {sellerVerified ? (
          <div className="badge badge-accent">Verified</div>
        ) : (
          <button onClick={verify} className="btn myButton btn-sm">
            Verify
          </button>
        )}
      </td>
      <td>
        <button onClick={handleDelete} className="btn  btn-error btn-circle">
          <FaTrashAlt></FaTrashAlt>
        </button>
      </td>
    </tr>
  );
};

export default SellerTableBody;
