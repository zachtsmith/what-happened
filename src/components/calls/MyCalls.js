import { React } from "react-router-dom"
import { useEffect, useState } from "react"
import { Call } from "./Call"
import "./Calls.css"

export const MyCalls = () => {
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
                calls.map((call) => {
                    if (whatHappenedUserObject.id === call.userId) {
                        return <>
                            <Call key={call.id} id={call.id} equipmentZoneId={call.equipment.zoneId} equipmentType={call.equipment.equipmentType} equipmentTypeNumber={call.equipment.equipmentTypeNumber} date={call.date} issue={call.descriptionOfIssue} downtime={call.totalAmountOfDowntime}/></>
                    }

                    else {
                        return ""
                    }
                }
                )
            }</article>
    </>

}




