import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "./CardButton.css";
import { TProduct } from "../../../globalTypes/globalTypes";
import { Link } from "react-router-dom";

const CategoryProductCard = ({ product }: { product: TProduct }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const { img, resalePrice, productName, _id } = product;
  return (
    <div
      data-aos="flip-left"
      className="card rounded-md card-compact hover:border-slate-800 hover:border-2 hover:shadow-2xl bg-base-100 shadow-lg w-72 mx-auto"
    >
      <Link to={`/detail-product/${_id}`} className="w-72">
        <figure>
          <img src={img} className="h-72" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title cursor-text select-text">{productName}</h2>
          <p className="text-lg font-medium">Resale price : {resalePrice} tk</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryProductCard;
