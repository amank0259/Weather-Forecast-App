import './App.css';
import { useState } from 'react';
// import search from './assets/icons/search.svg';
import Search from './assets/icons/Search.png';
import { useStateContext } from './Context';
import BackgroundLayout from './components/BackgroundLayout';
import WeatherCard from './components/WeatherCard';
import MiniCard from './components/MiniCard';

function App() {

  const [input, setInput] = useState('')
  const { weather, thisLocation, values, place, setPlace } = useStateContext()

  const submitCity = () => {
    setPlace(input)
    setInput('')
  }

  return (
    <div className='w-full flex flex-col justify-center h-screen text-white relative'>
      <div className='absolute w-[100%] overflow-x-hidden px-8 sm:bottom-0 top-0 z-10'>
        <nav className='w-full p-3 flex justify-between lg:px-60 items-centers'>
          <h1 className='font-bold tracking-wide text-3xl'>Weather Forecast</h1>
          <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded-xl flex items-center p-2 gap-2'>
            <img src={Search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
            <input onKeyUp={(e) => {
              if (e.key === 'Enter') {
                // sumit the form
                submitCity()
              }
            }} type="text" placeholder='Enter Location' className='focus:outline-none w-full text-[#212121] text-lg' value={input} onChange={e => setInput(e.target.value)} />
          </div>
        </nav>
        <footer className='absolute hidden lg:block bottom-0 left-[42%] pb-4 text-2xl'>
          <h4>Created with <span className='text-red-500'>❤️</span>by Aman</h4>
        </footer>
      </div>
      <div className="absolute w-full h-full bg-black opacity-60 z-0"></div>
      <div className='text-white flex flex-col justify-center items-center px-8'><BackgroundLayout></BackgroundLayout></div>
      <main className='w-full flex padding-top h-screen flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {
            values?.slice(1, 7).map(curr => {
              return (
                <MiniCard
                  key={curr.datetime}
                  time={curr.datetime}
                  temp={curr.temp}
                  iconString={curr.conditions}
                />
              )
            })
          }
        </div>
      </main>
    </div>
  )
}

export default App