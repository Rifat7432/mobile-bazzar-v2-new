import { useParams } from "react-router-dom";
import {
  useDetailProductQuery,
  useReportProductMutation,
} from "../../../redux/services/API";
import { FaCheck } from "react-icons/fa";
import Loader from "../../Shered/Loader/Loader";
import { useState } from "react";
import GetModal from "../GetModal/GetModal";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { useAppSelector } from "../../../redux/hooks/hooks";

type TProductDetail = {
  _id: string;
  img: string;
  date: string;
  purchase: string;
  originalPrice: number;
  resalePrice: number;
  productName: string;
  useYears: string;
  categoryId: {
    _id: string;
    category: string;
    categoryLogo: string;
  };
  condition: string;
  description: string;
  status: "sold" | "available";
  location: string;
  phoneNumber: string;
  report: boolean;
  sellerId: {
    id: string;
    email: string;
    name: string;
    role: "Seller";
    userImg: string;
    password: string;
    sellerVerified: boolean;
  };
  advertise: boolean;
};
const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [modalData, setModalData] = useState<TProductDetail | null>(null);
  const [reportProduct] = useReportProductMutation();
  const { data, isLoading } = useDetailProductQuery(id as string);
  if (isLoading) {
    return <Loader></Loader>;
  }
  const product: TProductDetail = data?.data;
  const {
    img,
    date,
    location,
    resalePrice,
    originalPrice,
    useYears,
    productName,
    condition,
    description,
    sellerId,
    categoryId,
    _id,
    report,
  } = product;
  const { name, sellerVerified, userImg } = sellerId;
  const manageModal = () => {
    setModalData(product);
  };
  const handelReport = async () => {
    if (!report) {
      await reportProduct(_id);
      toast.success(`${productName} reported successfully`);
    } else {
      return toast.success(`${productName} reported successfully`);
    }
  };
  let rating = 4;
  if (sellerVerified) {
    rating += 1;
  }
  if (report) {
    rating = rating - 0.5;
  }
  return (
    <>
      <div className="w-11/12 max-w-[1200px] mx-auto">
        <div className="card lg:card-side bg-base-100">
          <figure>
            <img src={img} alt="Album" className="w-96 max-h-[600px]" />
          </figure>
          <div className="card-body justify-center">
            <div>
              <div className="flex gap-4 items-center">
                <h2 className="text-2xl font-semibold">{productName}</h2>
                <h2 className="text-xs font-thin flex">
                  <MapPin size={16} />
                  {location}
                </h2>
              </div>
              <div className="flex sm:gap-6 gap-2 items-center">
                <h2 className="sm:text-md text-xs font-thin">
                  {categoryId.category}
                </h2>
                <h2 className="sm:text-md text-xs font-thin">
                  Condition : {condition}
                </h2>
                <h2 className="sm:text-md text-xs font-thin">
                  Year of Used : {useYears} year
                </h2>
              </div>
            </div>
            <div className="py-5 grid grid-cols-1 sm:grid-cols-3  gap-6 md:gap-0 ">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={userImg}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-11/12 ml-2">
                  <div className="flex">
                    <h3 className="font-medium">{name}</h3>
                    {sellerVerified && (
                      <div className="avatar w-1/4 ml-2">
                        <div className="mask mask-decagon bg-blue-600 text-white p-1 ">
                          <FaCheck></FaCheck>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex">
                    <h4>{date}</h4>
                  </div>
                </div>
              </div>
              <div className="flex">
                <h3 className="text-xl px-3 font-semibold">{rating}</h3>

                <div className="rating">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-sm font-thin">
                  <del>{originalPrice}</del> BDT
                </h2>
                <h2 className="text-lg font-semibold">{resalePrice} BDT</h2>
              </div>
            </div>
            <div className="card-actions justify-between items-center gap-6 my-5">
              <button
                disabled={user ? false : true}
                className="btn myButton w-52 max-w-96"
              >
                <label className="w-52 max-w-96" onClick={manageModal} htmlFor="my-modal-3">
                  {user ? 'Book Now' : 'Login for Order' }
                </label>
              </button>

              <button
                onClick={handelReport}
                className="btn myButton w-52 max-w-96"
                disabled={user ? false : true}
              >
                {user ? 'Report' : 'Login for Report' }
              </button>
            </div>
            <h5 className="text-xs">DETAIL</h5>
            <h2 className="">{description} </h2>
          </div>
        </div>
      </div>
      {modalData && (
        <GetModal modalData={modalData} setModalData={setModalData}></GetModal>
      )}
    </>
  );
};

export default ProductDetail;
