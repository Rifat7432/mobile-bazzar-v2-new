import { useAdvertisedProductsQuery } from "../../../redux/services/API";
import Loader from "../../Shered/Loader/Loader";
import Advertised from "../Advertised/Advertised";
import CategorySection from "../CategorySection/CategorySection";
import Discount from "../Discount/Discount";
import Slider from "../Slider/Slideer";

const Home = () => {
  const { data, isLoading } = useAdvertisedProductsQuery("");
  const advertiseProducts = data?.data ? data?.data : [];
  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div>
          <div className="pt-5">
            {" "}
            <Slider advertiseProducts={advertiseProducts}></Slider>
            <Discount></Discount>
          </div>
          {advertiseProducts.length > 0 && (
            <Advertised advertiseProducts={advertiseProducts}></Advertised>
          )}
          <CategorySection></CategorySection>
          <div className="bg-base-100 p-5 mt-10">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Why Choose Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    Competitive Pricing
                  </h3>
                  <p>
                    We offer the best prices in the market, whether you're
                    looking for the latest models or budget-friendly options.
                    Our price-match guarantee ensures you always get the best
                    deal.
                  </p>
                </div>
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    Quality Assurance & Warranty
                  </h3>
                  <p>
                    All our phones go through stringent quality checks, whether
                    new or refurbished, and we offer warranties of up to 1 year
                    to give you peace of mind.
                  </p>
                </div>
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    Easy Return & Exchange Policy
                  </h3>
                  <p>
                    Our hassle-free return and exchange policy ensures you can
                    easily swap or return your phone within the specified
                    period.
                  </p>
                </div>
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    Secure Payment Options
                  </h3>
                  <p>
                    We provide multiple secure payment gateways with encryption,
                    including credit/debit cards, PayPal, and installment plans.
                  </p>
                </div>
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    24/7 Customer Support
                  </h3>
                  <p>
                    Our dedicated support team is available 24/7 to assist you
                    with any queries related to orders, technical issues, or
                    returns.
                  </p>
                </div>
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    Wide Selection of Brands
                  </h3>
                  <p>
                    We offer a wide range of mobile brands, from flagship models
                    to affordable phones, catering to every customer’s needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-base-100 p-5 mt-10">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Partnered Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    Mobile Repair Services
                  </h3>
                  <p>
                    We partner with certified repair centers to offer discounted
                    and priority repair services for cracked screens, battery
                    replacements, and more.
                  </p>
                </div>
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    Mobile Insurance
                  </h3>
                  <p>
                    Choose from our mobile insurance plans, covering accidental
                    damage, theft, and malfunctions for long-term peace of mind.
                  </p>
                </div>
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    Accessory Deals
                  </h3>
                  <p>
                    Enjoy exclusive deals on phone accessories like cases,
                    chargers, and screen protectors, available at discounted
                    bundle rates with your phone purchase.
                  </p>
                </div>
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    Buyback Program
                  </h3>
                  <p>
                    Trade in your old phone through our buyback program for cash
                    or store credit, making your next purchase more affordable.
                  </p>
                </div>
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    Extended Warranties
                  </h3>
                  <p>
                    Extend your coverage beyond the standard warranty with our
                    partnered extended warranty plans, offering up to two extra
                    years of protection.
                  </p>
                </div>
                <div className="card shadow-lg p-6 bg-base-200 hover:border-slate-800 hover:border-2 hover:shadow-2xl">
                  <h3 className="font-semibold text-xl mb-4">
                    Financing & Installments
                  </h3>
                  <p>
                    We offer flexible installment plans through our financing
                    partners, allowing you to spread the cost of your new phone
                    into easy monthly payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
