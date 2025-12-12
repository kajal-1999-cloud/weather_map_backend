// import React from "react";
// import useSWR from "swr";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// export default function CityModal({ cityId, onClose }) {
//   const { data } = useSWR(`http://localhost:4000/api/city/${cityId}`, (url) =>
//     fetch(url).then((r) => r.json())
//   );
//   const latest = data?.latest;

//   if (!latest) return null;

//   const aqi = latest.aqi ?? 0;
//   const aqiColor =
//     aqi <= 50 ? "green" : aqi <= 100 ? "yellow" : aqi <= 200 ? "orange" : "red";

//   return (
//     <div className="modal">
//       <button onClick={onClose}>Close</button>
//       <h2>{latest.name}</h2>
//       <div style={{ width: 80 }}>
//         <CircularProgressbar
//           value={Math.min(100, latest.temperature + 50)}
//           text={`${latest.temperature}°C`}
//         />
//       </div>
//       <div style={{ background: aqiColor }}>AQI: {aqi}</div>
//       <table>
//         <tbody>
//           <tr>
//             <td>Humidity</td>
//             <td>{latest.humidity}%</td>
//           </tr>
//           <tr>
//             <td>Pressure</td>
//             <td>{latest.pressure} hPa</td>
//           </tr>
//           <tr>
//             <td>Currency → INR</td>
//             <td>{latest.currencyToINR}</td>
//           </tr>
//           <tr>
//             <td>Last updated</td>
//             <td>{new Date(latest.timestamp).toLocaleString()}</td>
//           </tr>
//         </tbody>
//       </table>
//       {/* Add a chart for history using data.history */}
//     </div>
//   );
// }

import useSWR from "swr";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CityModal({ cityId, onClose }) {
  const { data } = useSWR(`https://weather-map-frontend.onrender.com/api/city/${cityId}`, (url) =>
    fetch(url).then((r) => r.json())
  );
  const latest = data?.latest;

  if (!latest) return null;

  const aqi = latest.aqi ?? 0;
  const aqiColor =
    aqi <= 50 ? "green" : aqi <= 100 ? "yellow" : aqi <= 200 ? "orange" : "red";

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
     style={{ backdropFilter: "blur(6px)",
        backgroundColor: "rgba(255,255,255,0.2)", zIndex: 9999 }} 
    >
      <div className="bg-white rounded-lg p-6 w-[400px] max-w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 rounded-full px-2 py-1"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">{latest.name}</h2>
        <div className="w-20 mb-4">
          <CircularProgressbar
            value={Math.min(100, latest.temperature + 50)}
            text={`${latest.temperature}°C`}
          />
        </div>
        <div
          className={`text-white px-2 py-1 rounded mb-4`}
          style={{ backgroundColor: aqiColor }}
        >
          AQI: {aqi}
        </div>
        <table className="w-full text-left">
          <tbody>
            <tr>
              <td>Humidity</td>
              <td>{latest.humidity}%</td>
            </tr>
            <tr>
              <td>Pressure</td>
              <td>{latest.pressure} hPa</td>
            </tr>
            <tr>
              <td>Currency → INR</td>
              <td>{latest.currencyToINR}</td>
            </tr>
            <tr>
              <td>Last updated</td>
              <td>{new Date(latest.timestamp).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
