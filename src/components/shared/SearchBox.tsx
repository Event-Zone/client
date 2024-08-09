import React, { useEffect, useState } from "react";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

interface Place {
  place_id: string;
  display_name: string;
  [key: string]: any; // Additional fields that might be returned by the API
}

interface SearchBoxProps {
  location: any;
  handleLocation: any;
}

export default function SearchBox(props: SearchBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLocation, location } = props;
  const [searchText, setSearchText] = useState<string>("");
  const [listPlace, setListPlace] = useState<Place[]>([]);

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: "1",
      polygon_geojson: "0",
    };
    const queryString = new URLSearchParams(params).toString();

    fetch(`${NOMINATIM_BASE_URL}${queryString}`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result: Place[]) => {
        console.log(result);
        setListPlace(result);
      })
      .catch((err) => console.log("err: ", err));
  };
  useEffect(() => {
    handleSearch();
  }, [searchText]);
  useEffect(() => {
    console.log("HEHE", location);
  }, [location]);
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={!isOpen && location ? location.address.state : searchText}
            onChange={(event) => {
              setIsOpen(true);

              // Update the searchText state with the user's input
              setSearchText(event.target.value);

              setSearchText(event.target.value);
            }}
          />
        </div>
      </div>
      {isOpen ? (
        <div>
          <ul className="mt-2">
            {listPlace.map((item) => (
              <div key={item.place_id}>
                <li
                  className="flex items-center p-2 border-b border-gray-300 cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                    handleLocation(item);
                  }}
                >
                  <img
                    src="/locationIcon.png"
                    alt="Placeholder"
                    className="w-10 h-10 mr-2"
                  />
                  <span>{item.display_name}</span>
                </li>
              </div>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
