import { useState, useRef } from "react"
import DigitalClock from "./DigitalClock"
import StopWatch from "./StopWatch"

function App() {

  const [page, setPage] = useState('digitalClock');
  const [buttonText, setButtonText] = useState('Go to stop watch')

  const intervalRef = useRef(null);
  // denne hooken brukes for å lage en referanse som kan endre seg, men som forblir den samme verdien om man re-rendrer og vil ikke lage re-rendrers. 

  const [stopWatchTime, setStopWatchTime] = useState({
    seconds: 0,
    milliSeconds:0,
  });

  function changePage() {

    if(page=== 'digitalClock') {
      setPage('stopWatch');
      setButtonText('Go to digital clock');
    } else {
      setPage('digitalClock');
      setButtonText('Go to stop watch');
    }
  }

  function showComponent(){
    return page=== 'digitalClock' ? 
    <DigitalClock/> : 
    <StopWatch storeTime= {intervalRef} 
    time={stopWatchTime} 
    setTime={setStopWatchTime}/>;
    //parameterene sendes med til stop-watch så de kan brukes der. 
  }

  return (
    <div>
      <button className="page-button" onClick={changePage}>{buttonText}</button>
        <div className= "page-container">
          {showComponent()}
        </div>
    </div>
    
  )
}

export default App
