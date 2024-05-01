import React from "react";

export default function MyOrders() {
  return (
    <div className="font-bold flex flex-col justify-between h-[60vh] ">
      <p>My Orders</p>
      <div className="flex justify-center items-center">
        <button>You have no active orders!</button>
      </div>
      <div></div>
    </div>
  );
}
