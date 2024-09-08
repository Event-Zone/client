import { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useSuspendUserMutation,
  useUpdatePackMutation,
  useValidateSubscriptionMutation,
} from "@/store/features/api/apiSlice";
import Progress from "../shared/Progress";
import Message from "../shared/Message";

interface DropdownProps {
  label: string;
  options: string[];
  selected: any;
  refetchUsers: Function;
  refetchSusb: Function;
  setPack: Function;
}

const Dropdown = ({
  refetchSusb,
  setPack,
  selected,
  label,
  options,
  refetchUsers,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<any>(false);
  const [updatePack, packResult] = useUpdatePackMutation();
  const [suspendUser, suspendUserResult] = useSuspendUserMutation();
  const [validateSubscription, validateSubscriptionResult] =
    useValidateSubscriptionMutation();
  const [deleteUser, deleteUserResult] = useDeleteUserMutation();
  useEffect(() => {
    if (suspendUserResult.status === "rejected") {
      setMessage({
        type: 0,
        content: suspendUserResult.data,
      });
    } else if (suspendUserResult.status === "fulfilled") {
      console.log("fulfilled");
      refetchUsers();
    }
  }, [suspendUserResult]);
  useEffect(() => {
    if (deleteUserResult.status === "rejected") {
      setMessage({
        type: 0,
        content: deleteUserResult.data,
      });
    } else if (deleteUserResult.status === "fulfilled") {
      refetchSusb();
    }
  }, [deleteUserResult]);
  useEffect(() => {
    if (validateSubscriptionResult.status === "rejected") {
      setMessage({
        type: 0,
        content: validateSubscriptionResult.data,
      });
    } else if (validateSubscriptionResult.status === "fulfilled") {
      // refetchSusb();
      setPack("Business");
      console.log(validateSubscriptionResult.data);
      // setPack(validateSubscriptionResult.data.pack);
    }
  }, [validateSubscriptionResult]);
  const handleOptionClick = (option: string) => {
    if (option === "Delete") {
      deleteUser(selected);
    } else if (option === "Suspend") {
      console.log("Suspend", selected);
      suspendUser(selected);
    } else if (option === "validate subscription") {
      console.log("validate subscription", selected);
      validateSubscription(selected);
    } else {
      updatePack({ ids: selected, pack: option });
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[#2c2f38] text-sm poppins-medium text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#2c2f38] ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                className="text-gray-300 block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      {(packResult.isLoading ||
        suspendUserResult.isLoading ||
        deleteUserResult.isLoading) && <Progress />}
      {/* {error && (
        <Message message={{ type: 0, content: "error updating pack" }} />
      )}
      {suspendError && (
        <Message message={{ type: 0, content: suspendError.message }} />
      )}
      {deleteUserError && (
        <Message message={{ type: 0, content: "error deleting user" }} />
      )} */}
    </div>
  );
};

export default Dropdown;
