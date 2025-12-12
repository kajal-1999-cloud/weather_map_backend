import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import useSWR from "swr";
import CityModal from "./pages/CityModal";
import "./components/Leaflet";
import { customMarkerIcon } from "./components/Leaflet";
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function App() {
  const {
    data: cities,
    error,
    isLoading,
  } = useSWR("https://weather-map-frontend.onrender.com/api/cities", fetcher, {
    refreshInterval: 30000,
  });
  const [active, setActive] = React.useState(null);
  console.log("cities::data", cities);

  if (isLoading)
    return (
      // <div className="h-screen flex justify-center items-center text-xl">
      //   Loading map...
      // </div>
      <div className="h-screen flex flex-col gap-3 justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
        <p className="text-lg text-gray-700">Loading map...</p>
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex justify-center items-center text-red-600 text-lg ">
        Failed to load cities ⚠
      </div>
    );

  return (
    <div className="h-[80vh] w-[80%] mt-5 m-auto">
      <MapContainer center={[20, 0]} zoom={2} className="h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {cities?.map((c) => (
          <Marker
            key={c.cityId}
            position={[c.coords.lat, c.coords.lon]}
            eventHandlers={{ click: () => setActive(c.cityId) }}
            icon={customMarkerIcon}
          />
        ))}

        {/* <Marker position={[51.5074, -0.1278]} /> */}
      </MapContainer>

      {active && <CityModal cityId={active} onClose={() => setActive(null)} />}
    </div>
  );
}
