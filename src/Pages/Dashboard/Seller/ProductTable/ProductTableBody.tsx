import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { TProduct } from "../../../../globalTypes/globalTypes";
import {
  useAdvertiseProductMutation,
  useDeleteProductMutation,
} from "../../../../redux/services/API";

const ProductTableBody = ({ product, i }: { product: TProduct; i: number }) => {
  const { img, productName, resalePrice, status, _id, advertise } = product;
  const [productAdvertise] = useAdvertiseProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const advertiseProduct = async () => {
    await productAdvertise(_id);
    toast.success("advertise successful");
  };

  const handleDelete = () => {
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
        Swal.fire("Deleted!", ` Product  has been deleted.`, "success");
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
              <img src={img} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <td>{productName}</td>
      <td>{resalePrice} tk</td>
      <td>{status}</td>
      <td>
        {status === "available" && advertise === false && (
          <button onClick={advertiseProduct} className="btn myButton">
            Advertise
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

export default ProductTableBody;
