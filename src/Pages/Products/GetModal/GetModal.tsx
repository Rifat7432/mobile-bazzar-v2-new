import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { useCreateOrderMutation } from "../../../redux/services/API";

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
const GetModal = ({
  modalData,
  setModalData,
}: {
  modalData: TProductDetail;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setModalData: any;
}) => {
  const [createOrder] = useCreateOrderMutation();
  const { user } = useAppSelector((state) => state.auth);
  const {
    reset,
    register,
    // formState: { errors },
    handleSubmit,
  } = useForm();
  const handleSignUp = async (data: FieldValues) => {
    const { meetingLocation, mobileNumber } = data;
    const booking = {
      productId: modalData?._id,
      productName: modalData?.productName,
      productPrice: modalData?.resalePrice,
      productImg: modalData?.img,
      buyerName: user?.name,
      buyerEmail: user?.email,
      meetingLocation,
      mobileNumber,
    };
   const or = await createOrder(booking);
   console.log(or);
    setModalData(null);
    reset({ mobileNumber: "", meetingLocation: "" });
  };
  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
            <h1 className="text-3xl font-bold">Booking information</h1>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Product name</span>
              </label>
              <input
                defaultValue={modalData?.productName}
                disabled
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                defaultValue={modalData?.resalePrice}
                disabled
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={user?.name}
                disabled
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <input
                defaultValue={user?.email}
                disabled
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Meeting location</span>
              </label>
              <input
                className="input input-bordered w-full "
                {...register("meetingLocation", {
                  required: "Enter your meeting location",
                })}
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Mobile number</span>
              </label>
              <input
                className="input input-bordered w-full "
                {...register("mobileNumber", {
                  required: "Enter your mobile number",
                })}
              />
            </div>
            <div className="form-control mt-6">
              {user?.role === "Buyer" ? (
                <button className="btn myButton">Submit</button>
              ) : (
                <div className="badge badge-info gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  A buyer can only buy product
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetModal;
