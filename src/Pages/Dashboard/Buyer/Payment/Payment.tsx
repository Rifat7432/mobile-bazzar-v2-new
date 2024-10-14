import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { useGetOrderQuery } from "../../../../redux/services/API";
import { TOrder } from "../../../../globalTypes/globalTypes";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "../../../Shered/Loader/Loader";
// const stripePromise = loadStripe(process.env.);
const stripePromise = loadStripe(import.meta.env.VITE_APP_Stripe_PK);

const Payment = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderQuery(id as string);
  if (isLoading) {
    return <Loader></Loader>;
  }
  const { productName, productPrice } = data?.data as TOrder;
  return (
    <div className="w-11/12 mx-auto mt-16">
      <div>
        <p className="text-3xl font-semibold">Payment for {productName}</p>
        <p className="text-xl">
          Please pay <strong>{productPrice} tk</strong> for {productName}
        </p>
      </div>
      <div className="my-6">
        <Elements stripe={stripePromise}>
          <CheckoutForm data={data?.data} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
