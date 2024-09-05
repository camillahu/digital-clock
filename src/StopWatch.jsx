import React, {useState, useRef} from "react";

function StopWatch() {

    const [seconds, setSecondsTimer] = useState(0);
    const [milliSeconds, setMilliSecondsTimer] = useState(0); //endres hver 10. millisekund i startTimer. 
    // de to over tracker sekunder og millisekunder og man kan endre på verdien til variablene ved å bruke funksjonen de tilhører. 

    const intervalRef = useRef(null);
    // denne hooken brukes for å lage en referanse som kan endre seg, men som forblir den samme verdien om man re-rendrer og vil ikke lage re-rendrers. 

    function startTimer() {
         if(!intervalRef.current) { //starter timeren hvis den ikke er startet ennå- current vil være null om den ikke kjører. 
            intervalRef.current =  setInterval(() => {
                setMilliSecondsTimer((m) => {
                    if(m >= 99) {
                        setSecondsTimer((s) => s + 1);
                        return 0;
                    } else return m + 1;
                });
            }, 10);
            //denne funksjonen kalles med en callback(milliSeconds-variablen) som oppdateres hvert 10. millisekund. 
            //setMilliSecondsTimes kalles med en anonym funksjon som får den nåværende verdien til milliSeconds.
            //hvis m når 99, så blir m til 0 og s blir til +1, hvis ikke så blir m +1.
        }
    }

    function stopTimer() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        //stopper timeren ved å cleare intervallen og resetter intervajRef.current til null. 
        //staten til seconds og milliSeconds forblir den samme, som gjør at programmet vil huske verdien til variablene slik at de "fryses" på skjermen. 
        //dette skjer pga. useState. 
    }

    function clearTimer() {
        stopTimer();  //passer på at timeren stopper og intervallen blir cleara.
        setSecondsTimer(0);  
        setMilliSecondsTimer(0);
        //resten bare setter begge constene til 0. 
    }

    function addZero(timer) {
        return timer < 10 ? `0${timer}` : timer;
        //legger til 0 før variablene hvis de er under 10. 
    }


    return(
    <div className="clock-container">
        <div className="clock">
            <span>{addZero(seconds)}:{addZero(milliSeconds)}</span>
        </div>
        <div>
            <button onClick= {startTimer}>Start timer</button>
            <button onClick= {stopTimer}>Stop timer</button>
            <button onClick= {clearTimer}>Clear timer</button>
        </div>
        
    </div>)
}

export default StopWatch