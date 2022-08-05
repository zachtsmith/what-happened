import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Calls.css"


export const CallDetails = () => {
    const { callId } = useParams()
    const [callInsight, updateCallInsight] = useState({})
    // const [callEquipment, update] = useState([])

    const localUser = localStorage.getItem("whatHappened_user")
    const whatHappenedUserObject = JSON.parse(localUser)

    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/loggedCalls?_expand=user&id=${callId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCall = data[0]
                    updateCallInsight(singleCall)
                })
        },
        [callId]

    )
    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8088/equipment`)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 update(data)
    //             })
    //     },
    //     []
    // )

    // function will render the delete button on the insidividual calls if the logged in user submitted that call.
    const deleteCall = () => {
        if (whatHappenedUserObject.id === callInsight.userId) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/loggedCalls/${callId}`, {
                    method: "DELETE"
                })
                .then(() => {
                    navigate("/home")
                })
        }} className="deleteCall">Delete</button>
    } else {
        return ""
    }
}


    return <section className="callDetail" >
        <header className="callDetail_header">Call #{callInsight.id}</header>
        <div>Zone: {callInsight.zoneId}</div>
        <div>Date: {callInsight.date}</div>
        <div>Start Time: {callInsight.startTime}</div>
        <div>End Time: {callInsight.endTime}</div>
        <div>Total Downtime: {callInsight.totalAmountOfDowntime}</div>
        <div>What Happened? {callInsight.descriptionOfIssue}</div>
        <div>Repair Made? {callInsight.repairMade}</div>
        <div className="delete_button">{deleteCall()}</div>

    </section>
}

