import { useEffect, useState } from 'react'
import cloud1 from './assets/cloud1.webp';
import cloud2 from './assets/cloud2.webp';
import cloud3 from './assets/cloud3.webp';
import cloud4 from './assets/cloud4.png';


import './App.css'

function App() {

const [city,setCity]=useState('Delhi')

const [wetherData,setWetherData]=useState(null)

  const currentDate=new Date();
  const months=['Jan','feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
  const month=months[currentDate.getMonth()]
  const day=currentDate.getDate()
const year=currentDate.getFullYear()

const date=`${month} ${day} ,${year}`

const API_KEY="d086dbca5d6d41bc3aba5d52d1f15034";
const fetchWetherData = async()=>{
  try {
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
  
  const data=await response.json()
  console.log(data);
  setWetherData(data)

  }catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
    fetchWetherData();
  },[])


 
const handleInputChange=(e)=>{
console.log(e.target.value);
setCity(e.target.value)
}


const handleSubmit=(e)=>{
  e.preventDefault();
fetchWetherData()
}
 
const getWeatherIconUrl=(main)=>{
switch (main) {
  case  "Clouds":
    return cloud3
  case "Rain":
    return cloud1
  case "Haze":
    return cloud2
  case "Clear":
    return cloud4
  default:
    return null
}
 }



  return (
    <>
     <div>
        <section>
            <div className="main">
                <div className="face">
                {
                wetherData && (
                  <>
                    <h1 className="time">{date}</h1>
                    <h2 className='city'>{wetherData.name}</h2>
                    <img className="container_img" src={getWeatherIconUrl(wetherData.weather[0].main)} width="180px" alt="Weather Icon" />
                    <h3 className='temp'>{Math.floor(wetherData.main.temp-273.15)-1}&#176;C </h3>
                  <h4 className='message'>{wetherData.weather[0].main}</h4>
                    <form className='form' onSubmit={handleSubmit}>
                      <input className='input' type='text'placeholder='Enter City Name' onChange={handleInputChange} />
                      <button type="button" class="btn btn-outline-light mb-1">Get</button>
                    </form>
                    </>
                )
            }
       </div>
            </div>
        </section>
    </div>












{/* 
      */}

    </>
  )
}

export default App
