import { useEffect, useState } from "react";

const SearchInput = ({
  users,
  setUsers,
  setPack,
  pack,
}: {
  users: any;
  pack: any;
  setUsers: Function;
  setPack: Function;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      if (pack !== "Business") setPack("Business");
      else setPack("Student");
    } else {
      setUsers(
        users.filter((user: any) =>
          user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="rounded-md border border-gray-300 bg-[#2c2f38] text-sm poppins-medium text-white py-2 pl-4 pr-10 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10a4 4 0 11-8 0 4 4 0 018 0zm0 0v4m0 0h12a4 4 0 100-8h-1.5M8 18H6.5m0 0v-2m0 0h2a6 6 0 100-12H5m3 12h1a6 6 0 006-6v1m0-1H8v-2"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;
