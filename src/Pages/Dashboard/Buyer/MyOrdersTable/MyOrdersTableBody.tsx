import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

import Swal from "sweetalert2";
import { useDeleteOrderMutation } from "../../../../redux/services/API";
import { TOrder } from "../../../../globalTypes/globalTypes";


const MyOrdersTableBody = ({ order, i }: { order: TOrder; i: number }) => {
  const [deleteOrder] = useDeleteOrderMutation();
  const { _id, productName, productPrice, productImg, meetingLocation, paid } =
    order;
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
        await deleteOrder(_id);
        Swal.fire("Deleted!", `${productName}  has been deleted.`, "success");
      }
    });
  };
  return (
    <tr>
      <th>{i + 1}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={productImg} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td>{productName}</td>
      <td>{productPrice} tk</td>
      <td>{meetingLocation}</td>
      <td>
        {paid === true ? (
          <p>Paid</p>
        ) : (
          <Link to={`/dashboard/payment/${_id}`} className="btn myButton">
            Pay
          </Link>
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

export default MyOrdersTableBody;
