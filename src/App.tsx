import "./App.css";
function App() {
  return (
    <>
      <div
        className={`w-screen h-64 flex items-center flex-col bg-patternBgMobile md:bg-patternBgDesktop bg-no-repeat bg-bottom bg-cover`}
      >
        <div className='flex flex-col gap-6 w-full justify-start items-center p-4'>
          <h1 className='font-semibold text-3xl text-white text-center'>IP Address Tracker</h1>
          <div className='relative flex w-full md:min-w-[425px] md:w-2/6'>
            <input
              className='border-2 w-full rounded-2xl h-14 p-5 pr-16'
              placeholder='Search for any IP address or domain'
            ></input>
            <button className='absolute w-14 h-full right-0 pr-2 bg-black rounded-r-2xl'></button>
          </div>
        </div>
        <div className='absolute flex flex-col md:flex-row items-center justify-between top-[12.5rem] h-28 p-6 bg-white w-1/2 rounded-xl'>
          <div className='h-full gap-2 flex flex-col items-start justify-start w-1/5'>
            <span className='text-[0.5rem] text-gray-500 font-semibold'>IP ADDRESS</span>
            <span className='font-semibold'>192.168.0.1</span>
          </div>
          <div className='w-[1px] h-14 bg-gray-200'></div>
          <div className='h-full gap-2 flex flex-col items-start justify-start w-1/5'>
            <span className='text-[0.5rem] text-gray-500 font-semibold'>LOCATION</span>
            <span className='font-semibold'>Brooklyn, NY 10001</span>
          </div>
          <div className='w-[1px] h-14 bg-gray-200'></div>
          <div className='h-full gap-2 flex flex-col items-start justify-start w-1/5'>
            <span className='text-[0.5rem] text-gray-500 font-semibold'>TIMEZONE</span>
            <span className='font-semibold'>UTC -05:00</span>
          </div>
          <div className='w-[1px] h-14 bg-gray-200'></div>
          <div className='h-full gap-2 flex flex-col items-start justify-start w-1/5'>
            <span className='text-[0.5rem] text-gray-500 font-semibold'>IPS</span>
            <span className='font-semibold'>SpaceX Starlnik</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
