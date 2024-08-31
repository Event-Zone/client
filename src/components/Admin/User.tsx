import React, { useState } from "react";
import {
  useGetSubscriptionQuery,
  useGetUsersByPackQuery,
} from "@/store/features/api/apiSlice";
import Progress from "../shared/Progress";
import Message from "../shared/Message";

function User({ user, setSelected }: { user: any; setSelected: Function }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setSelected((prevSelected: any) =>
        prevSelected.filter(
          (selectedUser: any) => selectedUser._id !== user._id
        )
      );
    } else {
      setSelected((prevSelected: any) => [...prevSelected, user]);
    }
  };

  if (!user) return <Progress />;
  return (
    <tr key={user._id} className="border-b border-[#364153]">
      <td className="py-3 px-4 flex items-center w-fit">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={toggleCheckbox}
          className="h-4 w-4 mr-1"
        />
        <img
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}event/image/${user.profilePicture}`}
          alt={user.userName}
          className="h-14 w-14 rounded-full mr-1"
        />
        <div className="overflow-hidden">
          <p className="text-white whitespace-normal font-bold">
            {user.fullname}
          </p>
          <p className="text-[#94A3B8] text-xs whitespace-normal ">
            {user.email}
          </p>
        </div>
      </td>
      <td className="py-3 px-4 text-white">{user?.username}</td>
      <td className="py-3 px-4 text-white">{user?.role}</td>
      <td className="py-3 px-4 text-white">{user?.phone}</td>
      <td className="py-3 px-4 text-white">{user?.company}</td>

      <td className="py-3 px-4 text-white">
        {user?.eventsIds?.length || "N/A"}
      </td>
    </tr>
  );
}

export default User;
