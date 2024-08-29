import React, { useState } from "react";
import { useGetSubscriptionQuery } from "@/store/features/api/apiSlice";
function Users() {
  const [status, setStatus] = useState("Business");
  return (
    <div className="bg-[#1A202C] p-6 rounded-lg h-[400px] ">
      {/* Tabs */}
      <div className="flex space-x-8 text-white text-lg mb-4">
        <button
          onClick={() => setStatus("Business")}
          className={` border-blue-500 ${
            status === "Business" && "border-b-4"
          }`}
        >
          Business
        </button>
        <button
          onClick={() => setStatus("Student")}
          className={` border-blue-500 ${status === "Student" && "border-b-4"}`}
        >
          Student
        </button>
        <button
          onClick={() => setStatus("Starter")}
          className={` border-blue-500 ${status === "Starter" && "border-b-4"}`}
        >
          Starter
        </button>
        <button
          onClick={() => setStatus("pending")}
          className={` border-blue-500 ${status === "pending" && "border-b-4"}`}
        >
          pending
        </button>
      </div>
      <div className="grid grid-cols-7 text-[#94A3B8] py-3 border-b border-[#364153]">
        <div className="col-span-2">Users ({[]?.length})</div>
        <div>username</div>
        <div>Role</div>
        <div>Mobile</div>
        <div>Compny name</div>
        <div>Number of name</div>
      </div>
    </div>
  );
}

export default Users;
