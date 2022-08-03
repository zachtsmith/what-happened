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
        <h2> My Logbook </h2>
        <article className="callLog">
         {
                calls.map((call, index) => <><Call key={index} id={call.id} equipmentZoneId={call.equipment.zoneId} equipmentType={call.equipment.equipmentType} equipmentTypeNumber={call.equipment.equipmentTypeNumber} date={call.date} issue={call.descriptionOfIssue}/>
                {/* <CallDetails key={index} id={call.id} equipmentZoneId={call.equipment.zoneId} equipmentType={call.equipment.equipmentType} equipmentTypeNumber={call.equipment.equipmentTypeNumber} date={call.date} issueStart={call.startTime} issueEnd={call.endTime} downtime={call.totalAmountOfDowntime} issue={call.descriptionOfIssue} repair={call.repairMade}/> */}
                </>)

            }</article>
    </>

}


