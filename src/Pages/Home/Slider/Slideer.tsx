
import { TProduct } from "../../../globalTypes/globalTypes";
import CustomCarousel from "./custom-slider";

const Slider = ({ advertiseProducts }: { advertiseProducts: TProduct[] }) => {
  //   const { data: allProducts = [], refetch } = {};
  const images: {
    imgURL: string;
    imgAlt: string;
  }[] = [];
  if (advertiseProducts.length > 0) {
    advertiseProducts.map((advertiseProduct) => {
      images.push({
        imgURL: advertiseProduct.img,
        imgAlt: advertiseProduct.img,
      });
    });
  }
  return (
    <div className="max-w-[1200px] mx-auto -z-50">
      <CustomCarousel>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} className="object-contain" alt={image.imgAlt} />;
        })}
      </CustomCarousel>
    </div>
  );
};

export default Slider;
