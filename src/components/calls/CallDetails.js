import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CallLog } from "./CallLog"
import "./Calls.css"


export const CallDetails = () => {
    const {callId} = useParams()
    const [callInsight, updateCallInsight] = useState({})
    const [callEquipment, update]= useState({})

    const navigate= useNavigate()
    useEffect(
        () => {
        fetch (`http://localhost:8088/loggedCalls?_expand=user&id=${callId}`)
        .then(response => response.json())
        .then((data) => {
            const singleCall = data[0]
            updateCallInsight(singleCall)
        })
        }, 
        [callId]

    )
    useEffect(
        () => {
        fetch (`http://localhost:8088/loggedCalls?_expand=equipment=${callId}`)
        .then(response => response.json())
        .then((data) => {
            const singleCall = data[0]
            update(singleCall)
        })
        }, 
        [callId]
        
    )
    const deleteCall= () =>{
        return <button onClick={() => {
            fetch (`http://localhost:8088/loggedCalls/${callId}` , {
                method: "DELETE" })
            
        .then(() => {
            navigate("/logbook")
        })
        }} className="deleteCall">Delete</button>
    }
    return <section className="callDetail" >
    <header className="callDetail_header">Call #{callInsight.id}</header>
    <div>Zone: {callInsight.zoneId}</div>
    <div>Equipment: {callEquipment.equipmentType} {callEquipment.equipmentTypeNumber}</div>
    <div>Date: {callInsight.date}</div>
    <div>Start Time: {callInsight.startTime}</div>
    <div>End Time: {callInsight.endTime}</div>
    <div>Total Downtime: {callInsight.totalAmountOfDowntime}</div>
    <div>What Happened? {callInsight.descriptionOfIssue}</div>
    <div>Repair Made? {callInsight.repairMade}</div>
    {deleteCall()}
    
</section>
}

