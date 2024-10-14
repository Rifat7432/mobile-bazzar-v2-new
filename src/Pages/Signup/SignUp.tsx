import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { storToken, storUserData } from "../../redux/features/authSlice";
import {
  useCreateUserByGoogleMutation,
  useCreateUserMutation,
} from "../../redux/services/API";
import { signUpFnProvider } from "../../Fairbase/firebaseUtils";
import { TResponse, TUser } from "../../globalTypes/globalTypes";

const SignUp = () => {
  const [createUser] = useCreateUserMutation();
  const [createUserByGoogle] = useCreateUserByGoogleMutation();
  const navigate = useNavigate();
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useAppDispatch();
  const handleSignUp = (data: FieldValues) => {
    const { name, email, password, role, userImg } = data;
    if (role === "" || role === "Select one") {
      return toast.error("Please select an option");
    }
    const image = userImg[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?&key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.success) {
          const img = data.data.url;
          try {
            const accountData = await signUpFnProvider.signUpWithEmail(
              email,
              password
            );

            if (accountData) {
              const res = (await createUser({
                id: accountData,
                name,
                email,
                password,
                role,
                userImg: img,
              })) as TResponse<{
                user: TUser;
                token: string;
              }>;
              if (res?.data?.success) {
                const userData: TUser = res?.data?.data?.user as TUser;
                dispatch(storToken(res?.data?.data?.token as string));
                dispatch(
                  storUserData({
                    _id: userData._id,
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role,
                    userImg: userData.userImg,
                    sellerVerified: userData.sellerVerified,
                  })
                );
                navigate("/");
                reset({
                  email: "",
                  password: "",
                  userImg: "",
                  role: "Select one",
                });
                toast.success("SignUp successfully");
                await signUpFnProvider.updateUser(name, img);
              }
            }
          } catch (err) {
            toast.error("Invalid Email or Password");
          }
        }
      });
  };

  const gooLogin = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "if you sign up by google you will consider as a buyer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const userData = await signUpFnProvider.googleSignUp();
          if (userData) {
            const res = (await createUserByGoogle({
              ...userData,
              password: import.meta.env.VITE_GOOGLE_LOGIN_DEFAULT_PASS,
            })) as TResponse<{
              user: TUser;
              token: string;
            }>;
            if (res?.data?.success) {
              const userData: TUser = res?.data?.data?.user as TUser;
              dispatch(storToken(res?.data?.data?.token as string));
              dispatch(
                storUserData({
                  _id: userData._id,
                  id: userData.id,
                  name: userData.name,
                  email: userData.email,
                  role: userData.role,
                  userImg: userData.userImg,
                  sellerVerified: userData.sellerVerified,
                })
              );
              navigate("/");
              return toast.success("SignUp successfully");
            }
            if (res?.error) {
              toast.error(res?.error.data.massage);
            }
          }
        } catch (err) {
          toast.error("Something went wrong");
        }
      }
    });
  };
  return (
    <div className="hero py-10">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img
            className=" rounded shadow-xl lg:mr-10"
            style={{ width: "500px" }}
            src="https://i.ibb.co/BGVDn7h/mobile-login-concept-illustration-114360-135.webp"
            alt=""
          />
        </div>
        <div className="card w-96 py-5  shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
            <h1 className="text-4xl font-bold">Sign Up</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                className="input input-bordered w-full "
                {...register("name", { required: "Enter your name" })}
              />
              {errors?.name && (
                <p className="text-red-500">
                  {errors?.name?.message as string}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <input
                type={"email"}
                className="input input-bordered w-full"
                {...register("email", {
                  required: "Enter Your email",
                })}
              />
              {errors?.email && (
                <p className="text-red-500">
                  {errors?.email?.message as string}
                </p>
              )}
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={"password"}
                className="input input-bordered w-full "
                {...register("password", { required: "Enter your password" })}
              />
              {errors?.password && (
                <p className="text-red-500">
                  {errors?.password?.message as string}
                </p>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Sign Up as</span>
              </label>
              <select
                {...register("role", { required: "Enter your name" })}
                className="select select-bordered w-full max-w-xs"
              >
                <option defaultValue={""} disabled selected>
                  Select one
                </option>
                <option defaultValue={"Buyer"}>Buyer</option>
                <option value={"Seller"}>Seller</option>
              </select>
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="file"
                className="input input-bordered w-full "
                {...register("userImg", { required: "Upload your image" })}
              />
              {errors?.userImg && (
                <p className="text-red-500">
                  {errors?.userImg?.message as string}
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn myButton">SignUp</button>
            </div>
          </form>
          <div>
            <label className="ml-5 label">
              <p>
                Already have account
                <Link
                  to={"/login"}
                  className="label-text-alt link text-lg text-orange-500 link-hover"
                >
                  {" "}
                  Login
                </Link>
              </p>
            </label>
          </div>
          <div className="divider">OR</div>
          <button
            onClick={gooLogin}
            className="btn w-4/5 mx-auto btn-outline myOutlineButton"
          >
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
