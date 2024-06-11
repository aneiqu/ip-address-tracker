import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import arrow from "./assets/images/icon-arrow.svg";

import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

type ipData = {
  ip: string;
  location: string;
  latlng: Array<number>;
  timezone: string;
  isp: string;
};

function App() {
  const [ipSearchValue, setIpSearchValue] = useState<string>();
  const [data, setData] = useState<ipData>({
    ip: "",
    location: "",
    latlng: [],
    timezone: "",
    isp: "",
  });

  (async function () {
    const startingIP = (await axios.get("https://api.ipify.org?format=json")).data.ip;
    searchForIP(startingIP);
  })();
  async function searchForIP(ip: string) {
    try {
      const answer = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_tN6vqB12ker8IkVgsa6ec1GFIvnDF&ipAddress=${
          ip ? ip : ipSearchValue
        }`
      );
      setData({
        ip: answer.data.ip,
        location:
          answer.data.location.city +
          " " +
          answer.data.location.country +
          " " +
          answer.data.location.postalCode,
        latlng: [answer.data.location.lat, answer.data.location.lng],
        timezone: answer.data.location.timezone,
        isp: answer.data.isp.length > 0 ? answer.data.isp : "Not found",
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <div className='w-screen h-screen'>
      <div
        className={`w-full h-1/3 flex items-center flex-col bg-patternBgMobile md:bg-patternBgDesktop bg-no-repeat bg-bottom bg-cover`}
      >
        <div className='flex flex-col gap-6 w-full justify-start items-center p-4'>
          <h1 className='font-semibold text-3xl text-white text-center'>IP Address Tracker</h1>
          <div className='relative flex w-full md:min-w-[425px] md:w-2/6'>
            <input
              onChange={(e) => setIpSearchValue(e.target.value)}
              className='border-2 w-full rounded-2xl h-14 p-5 pr-16 focus:outline-none'
              placeholder='Search for any IP address or domain'
            ></input>
            <button
              onClick={searchForIP}
              className='absolute w-14 h-full right-0  bg-black rounded-r-2xl flex items-center justify-center'
            >
              <img className='scale-125' src={arrow}></img>
            </button>
          </div>
        </div>
        <div className='z-10 md:absolute flex flex-col md:flex-row items-center justify-between md:top-[12.5rem] md:min-h-28 p-6 bg-white  md:w-7/12 md:min-w-[757px] md:max-w-[1000px] rounded-xl gap-3'>
          <div className='h-full md:gap-2 flex flex-col items-center justify-center md:items-start md:justify-start md:w-1/5'>
            <span className='text-[0.5rem] text-gray-500 font-semibold'>IP ADDRESS</span>
            <span className='font-semibold text-lg'>{data.ip}</span>
          </div>
          <div className='hidden md:block w-[1px] h-14 bg-gray-200'></div>
          <div className='h-full md:gap-2 flex flex-col items-center justify-center md:items-start md:justify-start md:w-1/5'>
            <span className='text-[0.5rem] text-gray-500 font-semibold'>LOCATION</span>
            <span className='font-semibold text-lg'>{data.location}</span>
          </div>
          <div className='hidden md:block w-[1px] h-14 bg-gray-200'></div>
          <div className='h-full md:gap-2 flex flex-col items-center justify-center md:items-start md:justify-start md:w-1/5'>
            <span className='text-[0.5rem] text-gray-500 font-semibold'>TIMEZONE</span>
            <span className='font-semibold text-lg'>{data.timezone}</span>
          </div>
          <div className='hidden md:block w-[1px] h-14 bg-gray-200'></div>
          <div className='h-full md:gap-2 flex flex-col items-center justify-center md:items-start md:justify-start md:w-1/5'>
            <span className='text-[0.5rem] text-gray-500 font-semibold'>IPS</span>
            <span className='font-semibold text-lg'>{data.isp}</span>
          </div>
        </div>
      </div>
      <div className='h-2/3 w-screen'>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
