import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const REVERSE_GEOCODING_URL = "https://nominatim.openstreetmap.org/reverse?";

interface Place {
  place_id: string;
  display_name: string;
  [key: string]: any;
}

interface SearchBoxProps {
  location: any;
  handleLocation: any;
}

const reverseGeocode = async (lat: number, lon: number) => {
  const params = {
    lat: `${lat}`,
    lon: `${lon}`,
    format: "json",
    addressdetails: "1",
  };
  const queryString = new URLSearchParams(params).toString();
  const url = `${REVERSE_GEOCODING_URL}${queryString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result.address;
  } catch (error) {
    console.error("Reverse geocoding error: ", error);
    return null;
  }
};

export default function SearchBox(props: SearchBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLocation, location } = props;
  const [searchText, setSearchText] = useState<string>("");
  const [listPlace, setListPlace] = useState<Place[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(
    null
  );

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
        if (result.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
          setListPlace(result);
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  useEffect(() => {
    console.log("Location updated: ", location);
  }, [location]);

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        setSelectedCoords([lat, lon]);

        // Get address details
        const address = await reverseGeocode(lat, lon);
        const stateName = address?.state || "Unknown";
        console.log("Address: ", address);
        handleLocation({
          place_id: "manual",
          display_name: `Selected Location: [${lat}, ${lon}]`,
          address: { commercial: searchText, state: stateName },
          lat,
          lon,
        });

        setIsOpen(false);
      },
    });
    return selectedCoords ? <Marker position={selectedCoords}></Marker> : null;
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={
              !isOpen && location ? location.address?.commercial : searchText
            }
            onChange={(event) => {
              setIsOpen(true);
              setSearchText(event.target.value);
            }}
          />
        </div>
      </div>
      {isOpen && (
        <div>
          {noResults ? (
            <div className="mt-2">
              <p>
                No results found. Please select a location on the map below:
              </p>
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapClickHandler />
                {selectedCoords && <Marker position={selectedCoords}></Marker>}
              </MapContainer>
            </div>
          ) : (
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
                      src="/icons/locationIcon.png"
                      alt="Placeholder"
                      className="w-10 h-10 mr-2"
                    />
                    <span>{item.display_name}</span>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
