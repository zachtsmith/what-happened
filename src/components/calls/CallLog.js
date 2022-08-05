import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Call } from "./Call"
import { CallDetails } from "./CallDetails"

import "./Calls.css"

export const CallLog = () => {
    const [calls, setCalls] = useState([])
    
    const localUser = localStorage.getItem("whatHappened_user")
    const whatHappenedUserObject = JSON.parse(localUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/loggedCalls?_expand=equipment`)
                .then(response => response.json()).then((callLogArray) => { setCalls(callLogArray) })

        },
        [] // When this array is empty, you are observing initial component state
    )
   

    return <>
        <h2> Company Logbook </h2>
        <article className="callLog">
         {
                calls.map((call) => <Call key={`call==${call.id}`} id={call.id} userId={call.userId} equipmentZoneId={call.equipment.zoneId} equipmentType={call.equipment.equipmentType} equipmentTypeNumber={call.equipment.equipmentTypeNumber} date={call.date} issue={call.descriptionOfIssue} downtime={call.totalAmountOfDowntime}/>
                 )

            }</article>
    </>

}


