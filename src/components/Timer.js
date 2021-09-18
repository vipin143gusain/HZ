import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {
    
    const {initialMinute = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const seconds = props.timeValue;
    const setSeconds = props.setTimeValue;

    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                    props.setTimeValue(0);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? null
            : <div> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</div> 
        }
        </div>
    )
}

export default Timer;