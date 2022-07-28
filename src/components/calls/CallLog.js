import { useEffect, useState } from "react"
import "./Calls.css"

export const CallLog = () => {
    const [calls, setCalls] = useState([])
    
    const localUser = localStorage.getItem("whatHappened_user")
    const whatHappenedUserObject = JSON.parse(localUser)

   
    useEffect(
        () => {
            fetch(`http://localhost:8088/loggedCall`)
                .then(response => response.json()).then((callLogArray) => { setCalls(callLogArray) })

        },
        [] // When this array is empty, you are observing initial component state
    )
}