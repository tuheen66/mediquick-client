"use client";
import { Button } from "@/components/ui/button";

import {
  // citySelector,
  // clearCart,
  // grandTotalSelector,
  // orderedMedicinesSelector,
  // orderSelector,
  // shippingAddressSelector,
  // shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
// import { setTotalPrice } from "@/redux/features/checkoutSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { createOrder } from "@/services/OrderService";
import Link from "next/link";

// import { useEffect } from "react";
// import { toast } from "sonner";

export type IOrder = {
  products: {
    product: string;
    quantity: number;
  }[];
  shippingAddress: string;
  paymentMethod: string;
};

const Payments = () => {
  const subTotal = useAppSelector(subTotalSelector).toFixed(2);
  // const shippingCost = useAppSelector(shippingCostSelector);
  // const order = useAppSelector(orderSelector);
  // const grandTotal = useAppSelector(grandTotalSelector).toFixed(2);
  // const city = useAppSelector(citySelector);
  // const shippingAddress = useAppSelector(shippingAddressSelector);
  // const cartProducts = useAppSelector(orderedMedicinesSelector);

  const dispatch = useAppDispatch();

  // const handleOrder = async () => {
  //   const orderLoading = toast.loading("Order is being placed");
  //   try {
  //     if (!city) {
  //       throw new Error("City is missing");
  //     }
  //     if (!shippingAddress) {
  //       throw new Error("Shipping address is missing");
  //     }

  //     if (cartProducts.length === 0) {
  //       throw new Error("Cart is empty, what are you trying to order ??");
  //     }

  //     const res = await createOrder(order);

  //     if (res.success) {
  //       toast.success(res.message, { id: orderLoading });
  //       dispatch(setTotalPrice({ totalPrice: grandTotal }));

  //       dispatch(clearCart());
  //     }

  //     if (!res.success) {
  //       toast.error(res.message, { id: orderLoading });
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message, { id: orderLoading });
  //   }
  // };

  return (
    <div className=" rounded-md h-fit p-5 w-80">
      <h1 className="text-2xl font-bold">Cost of Medicine</h1>
      <div className="space-y-2 my-4">
        <div className="flex justify-between">
          <p className="text-gray-800 ">Total</p>
          <p className="font-semibold">BDT {subTotal}</p>
        </div>

        {/* <div className="flex justify-between">
          <p className="text-gray-800 ">Shipment Cost</p>
          <p className="font-semibold">BDT {shippingCost}</p>
        </div> */}
      </div>
      {/* <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-800 ">Grand Total</p>
        <p className="font-semibold">BDT {grandTotal}</p>
      </div> */}
      <Link href={"/checkout"}>
        <Button className="w-full text-xl  py-5 bg-orange-500 hover:bg-orange-800 text-white">
          Proceed to checkout
        </Button>
      </Link>
    </div>
  );
};

export default Payments;
