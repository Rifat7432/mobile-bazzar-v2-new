import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { storToken, storUserData } from "../../redux/features/authSlice";
import { signUpFnProvider } from "../../Fairbase/firebaseUtils";
import {
  useCreateUserByGoogleMutation,
  useLoginUserMutation,
} from "../../redux/services/API";
import { TResponse, TUser } from "../../globalTypes/globalTypes";

const Login = () => {
  const [createUserByGoogle] = useCreateUserByGoogleMutation();
  const [loginUserIntoDB] = useLoginUserMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.from.pathname || "/";
  const dispatch = useAppDispatch();

  const handleLogin = async (data: FieldValues) => {
    const { email, password } = data;
    try {
      const loginData = await signUpFnProvider.loginWithEmail(email, password);
      if (loginData) {
        const res = (await loginUserIntoDB({ email, password })) as TResponse<{
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
          navigate(form, { replace: true });
          reset({
            email: "",
            password: "",
          });
          return toast.success("Login successfully");
        }
        if (res?.error) {
          toast.error(res?.error.data.massage);
        }
      }
    } catch (err) {
      toast.error("Invalid Email or Password");
    }
  };

  const handleError = () => {
    if (errors) {
      if (errors.email) {
        return toast.error(errors.email.message as string);
      } else if (errors.password) {
        return toast.error(errors.password.message as string);
      }
    }
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
            const password = import.meta.env.VITE_GOOGLE_LOGIN_DEFAULT_PASS;
            const res = (await createUserByGoogle({
              ...userData,
              password,
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
              navigate(form, { replace: true });
              return toast.success("Login successfully");
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
  const openModal = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dialog: any = document.getElementById("my_modal_3");
    dialog.showModal();
  };
  const demoLogin = async (loginData: { email: string; password: string }) => {
    const { email, password } = loginData;
    try {
      const loginData = await signUpFnProvider.loginWithEmail(email, password);
      if (loginData) {
        const res = (await loginUserIntoDB({ email, password })) as TResponse<{
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
          navigate(form, { replace: true });
          return toast.success("Login successfully");
        }
        if (res?.error) {
          toast.error(res?.error.data.massage);
        }
      }
    } catch (err) {
      toast.error("Invalid Email or Password");
    }
  };
  return (
    <div className="hero py-10">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img
            className=" rounded shadow-xl lg:mr-10"
            style={{ width: "500px" }}
            src="https://i.ibb.co/D8vXF65/mobile-login-concept-illustration-114360-83.webp"
            alt=""
          />
        </div>
        <div className="card w-96 py-5 shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(handleLogin)} className="card-body">
            <h1 className="text-4xl font-bold">Login now!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type={"email"}
                className="input input-bordered w-full "
                {...register("email", { required: "Enter your email" })}
              />
              {errors?.email && (
                <p className="text-red-500">
                  {errors?.email?.message as string}
                </p>
              )}
            </div>
            <div className="form-control">
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
            <div className="form-control mt-6">
              <button onClick={handleError} className="btn myButton">
                Login
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <button
            onClick={openModal}
            className="btn w-4/5 mx-auto btn-accent btn-outline"
          >
            Use Demo Account
          </button>
          <div>
            <label className="ml-5 label">
              <p>
                New to Mobile Bazzar
                <Link
                  to={"/signup"}
                  className="label-text-alt link text-lg text-orange-500 link-hover"
                >
                  {" "}
                  Create an account
                </Link>
              </p>
            </label>
          </div>
          <div className="divider">OR</div>
          <button
            onClick={gooLogin}
            className="btn w-4/5 mx-auto btn-success btn-outline myOutlineButton"
          >
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl">Login with Demo Accounts!</h3>
          <div className="flex justify-between items-center p-5">
            <div>
              <h4 className="text-lg font-medium">Admin Account</h4>
              <p className="text-md font-thin">Email : admin@gmail.com</p>
              <p>Password : 123456</p>
            </div>
            <div>
              <button
                className="btn btn-accent"
                onClick={() =>
                  demoLogin({ email: "admin@gmail.com", password: "123456" })
                }
              >
                Login
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center p-5">
            <div>
              <h4 className="text-lg font-medium">Seller Account</h4>
              <p className="text-md font-thin">Email : seller@gmail.com</p>
              <p>Password : 123456</p>
            </div>
            <div>
              <button
                className="btn btn-accent"
                onClick={() =>
                  demoLogin({ email: "seller@gmail.com", password: "123456" })
                }
              >
                Login
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center p-5">
            <div>
              <h4 className="text-lg font-medium">Buyer Account</h4>
              <p className="text-md font-thin">Email : buyer@gmail.com</p>
              <p>Password : 123456</p>
            </div>
            <div>
              <button
                className="btn btn-accent"
                onClick={() =>
                  demoLogin({ email: "buyer@gmail.com", password: "123456" })
                }
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
