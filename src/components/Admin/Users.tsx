import React, { useEffect, useState } from "react";
import {
  useGetSubscriptionsQuery,
  useGetUsersQuery,
} from "@/store/features/api/apiSlice";
import Progress from "../shared/Progress";
import User from "./User";
import Dropdown from "./Dropdown";
import SearchInput from "./SearchInput";
function Users() {
  const [pack, setPack] = useState("Business");
  const [users, setUsers] = useState<any>([]);
  const [selected, setSelected] = useState<any>([]);

  const {
    data: fetchedSubscriptions,
    error,
    isSuccess: subscriptionsSuccess,

    isLoading,
    refetch,
  } = useGetSubscriptionsQuery(pack, {
    skip: pack === "Suspended",
  });

  const {
    data: fetchedUsers,
    error: usersError,
    isSuccess: usersSuccess,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useGetUsersQuery();

  useEffect(() => {
    console.log("subss", fetchedSubscriptions);
  }, [fetchedSubscriptions]);
  useEffect(() => {
    console.log("fetchedUsers///////", fetchedUsers);
  }, [fetchedUsers]);
  const [mergedData, setMergedData] = useState<any>();
  useEffect(() => {
    console.log("refetched//////////////////////////");

    if (fetchedUsers && fetchedSubscriptions) {
      let mmdata = fetchedUsers.filter((user: any) => !user.suspended);
      mmdata = mmdata
        .filter((user: any) =>
          fetchedSubscriptions.some(
            (subscription: any) => subscription._id === user.subscription
          )
        )
        .map((user: any) => {
          const subscription = fetchedSubscriptions.find(
            (subscription: any) => subscription._id === user.subscription
          );
          return {
            ...user,
            userId: user._id,
            ...subscription,
            eventsIds: user.eventsIds,
          };
        });
      setMergedData(mmdata);
    }
  }, [fetchedUsers, fetchedSubscriptions]);

  useEffect(() => {
    switch (pack) {
      case "pending":
        refetch();

        console.log("Pending", mergedData);
        setUsers(
          mergedData.filter((user: any) => {
            console.log(user.validated);
            return !user.validated;
          })
        );
        break;
      case "Suspended":
        refetchUsers();

        console.log("suspended", fetchedUsers);
        setUsers(
          fetchedUsers
            .filter((user: any) => {
              console.log(user);
              return user?.suspended === true;
            })
            .map((user: any) => ({
              ...user,
              userId: user._id,
              eventsIds: user.eventsIds,
            }))
        );
        break;
      case "Visitors":
        refetchUsers();

        console.log("Visitors", fetchedUsers);
        setUsers(
          fetchedUsers
            .filter((user: any) => {
              console.log(user);
              return !user?.subscription;
            })
            .map((user: any) => ({
              ...user,
              userId: user._id,
              eventsIds: user.eventsIds,
            }))
        );
        break;

      default:
        refetch();
        refetchUsers();
        console.log("pack", pack);
        if (mergedData) {
          setUsers(
            mergedData.filter((user: any) => {
              return user.pack === pack && user.validated;
            })
          );
        }
        break;
    }
    setSelected([]);
  }, [pack, mergedData]);
  useEffect(() => {
    console.log("Selected", selected);
  }, [selected]);

  return (
    <div className="bg-[#1A202C] p-1 rounded-lg h-[400px] ">
      {/* Tabs */}
      <div className="flex space-x-8 text-white text-lg mb-4">
        <button
          onClick={() => setPack("Business")}
          className={` border-blue-500 ${pack === "Business" && "border-b-4"}`}
        >
          Business
        </button>
        <button
          onClick={() => setPack("Student")}
          className={` border-blue-500 ${pack === "Student" && "border-b-4"}`}
        >
          Student
        </button>
        <button
          onClick={() => setPack("Starter")}
          className={` border-blue-500 ${pack === "Starter" && "border-b-4"}`}
        >
          Starter
        </button>
        <button
          onClick={() => setPack("Visitors")}
          className={` border-blue-500 ${pack === "Visitors" && "border-b-4"}`}
        >
          Visitors
        </button>
        <button
          onClick={() => setPack("pending")}
          className={` border-blue-500 ${pack === "pending" && "border-b-4"}`}
        >
          pending
        </button>
        <button
          onClick={() => setPack("Suspended")}
          className={` border-blue-500 ${pack === "Suspended" && "border-b-4"}`}
        >
          Suspended
        </button>
      </div>
      <div className="flex justify-between items-center bg-[#1f2029] p-4">
        <div className="flex space-x-4">
          <Dropdown
            setPack={setPack}
            refetchUsers={refetchUsers}
            refetchSusb={refetch}
            selected={selected}
            label="Account"
            options={["Delete", "Suspend", "validate subscription"]}
          />
          <Dropdown
            setPack={setPack}
            refetchSusb={refetch}
            refetchUsers={refetchUsers}
            selected={selected}
            label="Change Subscription"
            options={["Starter", "Student", "Business"]}
          />
        </div>
        <SearchInput
          pack={pack}
          setPack={setPack}
          setUsers={setUsers}
          users={users}
        />
      </div>
      <div className="overflow-y-scroll h-[90%]">
        <table className="min-w-full table-auto">
          <thead className="bg-[#364153] text-[#94A3B8]">
            <tr>
              <th className="py-3 px-10 text-left">Users ({users?.length})</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Mobile</th>
              <th className="py-3 px-4 text-left">Company Name</th>
              <th className="py-3 px-4 text-left">Number of Events</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user: any) => {
                return (
                  <User setSelected={setSelected} key={user._id} user={user} />
                );
              })}
          </tbody>
        </table>
      </div>
      {(usersLoading || isLoading) && <Progress />}
    </div>
  );
}

export default Users;
