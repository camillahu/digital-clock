

function StopWatch({storeTime, time, setTime}) {


    function startTimer() {
         if(!storeTime.current) { 
            //starter timeren hvis den ikke er startet ennå- current vil være null om den ikke kjører. 
            //() storeTime er her en useRef som vi får fra App. 
            storeTime.current =  setInterval(() => {
                setTime((t) => {
                    let newMilliSeconds = t.milliSeconds +1;
                    let newSeconds = t.seconds;
                    if(t.milliSeconds >= 99) {
                        newMilliSeconds = 0;
                        newSeconds = t.seconds +1;
                    } 
                    return {
                        seconds: newSeconds,
                        milliSeconds: newMilliSeconds,
                    };
                });
            }, 10);
            //denne funksjonen kalles med en callback(time-objektet) som oppdateres hvert 10. millisekund. 
            //setTime kalles med en arrow-funksjon som får den nåværende verdien til time.
            //hvis ms når 99, så blir ms til 0 og s blir til +1, hvis ikke så blir ms +1.
        }
    }

    function stopTimer() {
        clearInterval(storeTime.current);
        storeTime.current = null;
        //stopper timeren ved å cleare intervallen og resetter intervajRef.current(fra app) til null. 
        //staten til seconds og milliSeconds forblir den samme, som gjør at programmet vil huske verdien til variablene slik at de "fryses" på skjermen. 
        //dette skjer pga. useState. 
    }

    function clearTimer() {
        stopTimer();  //passer på at timeren stopper og intervallen blir cleara.
        setTime({seconds: 0, milliSeconds: 0,})
        //resten bare setter begge constene til 0. 
    }

    function addZero(timer) {
        return timer < 10 ? `0${timer}` : timer;
        //legger til 0 før variablene hvis de er under 10. 
    }


    return(
    <div className="clock-container">
        <div className="clock">
            <span>{addZero(time.seconds)}:{addZero(time.milliSeconds)}</span>
        </div>
        <div>
            <button onClick= {startTimer}>Start timer</button>
            <button onClick= {stopTimer}>Stop timer</button>
            <button onClick= {clearTimer}>Clear timer</button>
        </div>
        
    </div>)
}

export default StopWatch