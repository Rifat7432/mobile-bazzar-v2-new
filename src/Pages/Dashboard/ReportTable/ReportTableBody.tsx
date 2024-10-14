import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDeleteProductMutation } from "../../../redux/services/API";
import { TProduct } from "../../../globalTypes/globalTypes";

const ReportTableBody = ({
  reportedProduct,
  i,
}: {
  reportedProduct: TProduct;
  i: number;
}) => {
  const [deleteProduct] = useDeleteProductMutation();
  const { _id, img, sellerId, productName } = reportedProduct;
  const { name } = sellerId;
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
        await deleteProduct(_id);
        Swal.fire("Deleted!", `${productName}  has been deleted.`, "success");
      }
    });
  };

  return (
    <tr>
      <th>{i + 1}</th>
      <td>
        {" "}
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={img} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td>{productName}</td>
      <td>{name}</td>

      <td>
        <button onClick={handleDelete} className="btn  btn-error btn-circle">
          <FaTrashAlt></FaTrashAlt>
        </button>
      </td>
    </tr>
  );
};

export default ReportTableBody;
