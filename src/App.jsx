
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  let dateAPI=new Date();

  let [time,setTime]=useState([]);
  let [date,setDate]=useState('');
  let [city,setCity]=useState('')
let cities=[
  {name:'دمشق',id:1, value:'Damascus'},
    {name:'دير الزور',id:2, value:'Deir ez-Zor'},
  {name:'حلب',id:3, value:'Aleppo'},
  {name:'درعا',id:4,value:'Homs'},
  {name:'حمص',id:5,value:'Homs'},
  {name:'طرطوس',id:6 ,value:'Dera'},

];
useEffect(()=>{
  let timePraying=async()=>{
    try{
const response=await fetch(`https://api.aladhan.com/v1/timingsByCity/${dateAPI}?city=Sy&country=${city}`)
const data=await response.json();
setTime(data.data.timings);
setDate(data.data.date.gregorian.date)
    }
    catch(error){
      console.error(error)
    }
  }
  timePraying()

},[city])

const formateTime=(time)=>{
  if(!time)
    return '00:00';
  let [hours,minuts]=time.split(":").map(Number);
  hours=hours%12 || 12;
  return`${hours}:${minuts<10?'0'+minuts:minuts}`
}





  return (
    <>
     <section>
      <div className="box">
        <header>
          <div className="city">
<h3>المدينة</h3>
<select value={city} onChange={(event)=>{
setCity(event.target.value)
}} >
  {cities.map((city)=>{
    return(
      <option  key={city.id} value={city.value}>{city.name}</option>
    )
  })}
</select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <p>{date}</p>
          </div>
        </header>
        <div className="timePraying">
          <ul>
            <li>
              <span>:الفجر</span>
              <span>AM {formateTime(time.Fajr)}</span>
            </li>
            <li>
              <span>:الظهر</span>
              <span>PM {formateTime(time.Dhuhr)}</span>
            </li>
            <li>
              <span>:العصر</span>
              <span>PM {formateTime(time.Asr)}</span>
            </li>
            <li>
              <span>:المغرب</span>
              <span>PM {formateTime(time.Maghrib)}</span>
            </li>
            <li>
              <span>:العشاء</span>
              <span>PM {formateTime(time.Isha)}</span>
            </li>
          </ul>
        </div>
      </div>
     </section>
    </>
  )
}

export default App
