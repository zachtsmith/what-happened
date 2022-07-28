import { useEffect, useState } from "react"
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
        <h2> My Calls </h2>
        <article className="calls">
            {
                calls.map((call) => {
                    return <section className="call" key={call.id}> <header>Zone {call.equipment.zoneId} {call.equipment.equipmentType} {call.equipment.equipmentTypeNumber}</header> <li className="call_description"> {call.descriptionOfIssue} </li>
                    </section>
                }
                )

            }</article>
    </>

}