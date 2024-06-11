import axios from "axios";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./App.css";
import arrow from "./assets/images/icon-arrow.svg";
import localizationIcon from "./assets/images/localization-icon.png";

type ipData = {
  ip: string;
  location: string;
  lat: number;
  lng: number;
  timezone: string;
  isp: string;
};

function App() {
  const [ipSearchValue, setIpSearchValue] = useState<string>();
  const [data, setData] = useState<ipData>({
    ip: "",
    location: "",
    lat: 0,
    lng: 0,
    timezone: "",
    isp: "",
  });

  const mapRef = useRef<any>(null);

  const customIcon = new Icon({
    iconUrl: localizationIcon,
    iconSize: [38, 38],
  });

  async function fetchUserIP() {
    try {
      const res = await axios.get("https://api.ipify.org?format=json");
      searchForIP(res.data.ip);
    } catch (err) {
      console.error("Error fetching user IP:", err);
    }
  }

  async function searchForIP(ip: string | undefined = ipSearchValue) {
    try {
      const answer = await axios.get(
        `
        https://geo.ipify.org/api/v2/country,city?apiKey=at_HU7kXlFZ9IDWNZyYK8XWOTg9cF06s&ipAddress=${ip}`
      );

      if (mapRef.current) {
        mapRef.current.flyTo([answer.data.location.lat, answer.data.location.lng], 12);
      }

      setData({
        ip: answer.data.ip,
        location:
          answer.data.location.city +
          " " +
          answer.data.location.country +
          " " +
          answer.data.location.postalCode,
        lat: answer.data.location.lat,
        lng: answer.data.location.lng,
        timezone: answer.data.location.timezone,
        isp: answer.data.isp.length > 0 ? answer.data.isp : "Not found",
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserIP();
  }, []);

  return (
    <div className='w-screen h-screen relative'>
      <div
        className={`w-full  h-1/4 flex items-center flex-col bg-patternBgMobile md:bg-patternBgDesktop bg-no-repeat bg-bottom bg-cover relative`}
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
              onClick={() => searchForIP(ipSearchValue)}
              className='absolute w-14 h-full right-0  bg-black hover:bg-gray-700 rounded-r-2xl flex items-center justify-center'
            >
              <img className='scale-125' src={arrow}></img>
            </button>
          </div>
        </div>
        <div className='z-10 md:absolute flex flex-col md:flex-row items-center justify-between md:h-28 p-6 bg-white md:w-7/12 -bottom-14 md:min-w-[757px] md:max-w-[1000px] rounded-xl gap-3'>
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
      <div className='h-3/4 w-screen'>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} ref={mapRef}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker icon={customIcon} position={[data.lat, data.lng]}>
            <Popup>Right here</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className='absolute flex bottom-2 z-10 w-full items-center justify-center '>
        Challenge by
        <a href='https://www.frontendmentor.io?ref=challenge' target='_blank'>
          Frontend Mentor
        </a>
        . Coded by
        <a
          href='https://www.frontendmentor.io/profile/aneiqu'
          target='_blank'
          className='text-blue-700 pl-1'
        >
          Aneiqu
        </a>
        .
      </div>
    </div>
  );
}

export default App;
