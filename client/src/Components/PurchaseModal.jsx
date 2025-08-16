import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PurchaseModal = ({ closeModal, isOpen, product,fetchProduct }) => {
  const { user } = useAuth();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [orderData, setOrderData] = useState({
    customer: {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    },
    seller: product?.seller,
    medicineId: product?._id,
    quantity: 1,
    price: product?.price,
    productName: product?.name,
    productCategory: product?.category,
    productImage: product?.imageUrl,
  });
  //   handle quantity form
  const handleQuantity = (value) => {
    const totalQuantity = parseInt(value);
    if (
      totalQuantity > product.quantity ||
      totalQuantity < 1 ||
      isNaN(totalQuantity)
    )
      return toast.error("Invalid quantity selected");
    const calculatedPrice = totalQuantity * product.price;
    setSelectedQuantity(totalQuantity);
    setTotalPrice(calculatedPrice);

    setOrderData((prev) => {
      return {
        ...prev,
        quantity: totalQuantity,
        price: calculatedPrice,
      };
    });
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Medicine Name: {product.name}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Customer: {user?.displayName}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Price per unit: ${product.price}
              </p>
            </div>
            <div className="my-2">
              <p className="text-sm text-gray-500">
                Available Quantity: {product.quantity}
              </p>
            </div>
            <hr />
            <p className="text-center">Order Info: </p>
            <div className="mt-2">
              <input
                type="number"
                min={1}
                max={product.quantity}
                value={selectedQuantity}
                onChange={(e) => handleQuantity(e.target.value)}
                className="border text-center px-3 py-1"
              />
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Selected Quantity: {selectedQuantity}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Total Price: {totalPrice}</p>
            </div>
          {/* stipe payment form */}
          <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} fetchProduct={fetchProduct} closeModal={closeModal} orderData={orderData} user={user}/>
          </Elements>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
