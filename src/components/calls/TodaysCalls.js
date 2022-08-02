import { useEffect, useState } from "react"
import React from "react"
import { Link } from "react-router-dom"
import { Call } from "./Call"
import { format } from "date-fns";
import "./Calls.css"

export const TodaysCalls = () => {
    const [todaysCalls, setTodaysCalls] = useState([])

    const localUser = localStorage.getItem("whatHappened_user")
    const whatHappenedUserObject = JSON.parse(localUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/loggedCalls?_expand=equipment`)
                .then(response => response.json()).then((todaysCallsArray) => { setTodaysCalls(todaysCallsArray) })

        },
        [] // When this array is empty, you are observing initial component state
    )
    let todaysDate = () => {
        let showdate = new Date()
        let formattedDate = format(showdate, "yyyy do MMMM")
        // showdate.getFullYear() + '-' + (showdate.getMonth() + 1) + '-' + showdate.getDate()
        return formattedDate
    }

    console.log(todaysDate())
    console.log(todaysCalls.map((call) => call.date))

    return <>
        <h2> Today's Calls </h2>
        <article className="todaysCalls">
            {
                todaysCalls.map((call) => {
                    if (todaysDate() === todaysCalls.date) return
                    <Call key={`call==${call.id}`} id={call.id} equipmentZoneId={call.equipment.zoneId} equipmentType={call.equipment.equipmentType} equipmentTypeNumber={call.equipment.equipmentTypeNumber} issue={call.descriptionOfIssue} />
                    return ""
                })}
        </article>
    </>
    }
             



