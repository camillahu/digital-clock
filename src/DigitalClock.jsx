import React, {useState, useEffect} from "react";

function DigitalClock() {

    const [time, setTime] = useState(new Date());


    //Denne setter igang klokka når komponenten mountes og oppdateres hvert sekund.
    useEffect(() => {
        const intervalId = setInterval(() =>{
            setTime(new Date());
        }, 1000);

        //For å sikre seg mot bugs om komponenten unmountes, "skrur vi av" klokka når komponenten unmountes 
        return() => {
            clearInterval(intervalId);
        }
    }, []);

    // Denne funksjonen formaterer tiden bed å bruke getHours, Minutes og Seconds og putter de i variablene. 
    function formatTime() {
        
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        //Denne setter på AM eller PM ut i fra om klokka er mer enn 12 for å ikke ha 24-timers klokke. 
        const meridiam = hours >= 12 ? "PM" : "AM";

        //Denne formelen gir en 12 timers klokke. 
        hours = hours % 12 || 12;

        return(`${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiam}`)
    }

    //Denne legger til 0 på starten dersom tallet er bare et nummer. 
    function padZero(number) {
        return (number < 10 ? '0' : '') + number;
    }

    return(
        <div className="clock-container">
            <div className="clock">
                <span>{formatTime()}</span>
            </div>
        </div>)
}

export default DigitalClock