"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUpdateUserPasswordMutation } from "@/store/features/api/apiSlice";

function EditPassword({ id }: { id: string }) {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [updateUserPassword, { isLoading, isError, isSuccess }] =
    useUpdateUserPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      await updateUserPassword({
        _id: id as string,
        oldPassword,
        newPassword,
      }).unwrap();
      alert("Password updated successfully");
      router.replace(`/profile/${id}`);
    } catch (error) {
      console.error("Failed to update password:", error);
      alert("Failed to update password");
    }
  };
  useEffect(() => {
    if (
      oldPassword &&
      newPassword &&
      confirmNewPassword &&
      newPassword === confirmNewPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [oldPassword, newPassword, confirmNewPassword]);
  return (
    <div>
      <form className="p-20" onSubmit={handleSubmit}>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            style={{
              border: "1.3px solid gray",
              borderRadius: "5px",
              padding: "8px",
              marginBottom: "10px",
              width: "100%",
            }}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{
              border: "1.3px solid gray",
              borderRadius: "5px",
              padding: "8px",
              marginBottom: "10px",
              width: "100%",
            }}
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            style={{
              border: "1.3px solid gray",
              borderRadius: "5px",
              padding: "8px",
              marginBottom: "10px",
              width: "100%",
            }}
          />
        </div>
        <button
          className={`${
            !disabled ? "bg-mainBlue" : "bg-gray-400  cursor-not-allowed  "
          }`}
          type="submit"
          disabled={disabled}
          style={{
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
        {isError && <p>Error updating password</p>}
        {isSuccess && <p>Password updated successfully</p>}
      </form>
    </div>
  );
}

export default EditPassword;
