import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CallDetails = () => {
    const {callId} = useParams()
    const [callInsight, updateCallInsight] = useState({})
    const [callEquipment, update]= useState({})

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
        fetch (`http://localhost:8088/loggedCalls?_expand=equipment`)
        .then(response => response.json())
        .then((data) => {
            const singleCall = data[0]
            update(singleCall)
        })
        }, 
        [callId]
        
    )
    return <section className="callDetail" >
    <header className="callDetail_header">Call #{callInsight.id}</header>
    <div>Zone: {callInsight.zoneId}</div>
    <div>Equipment: {callEquipment.equipmentType} {callEquipment.equipmentTypeNumber}</div>
    <div>Date: {callInsight.date}</div>
    <div>Start Time: {callInsight.startTime}</div>
    <div>End Time: {callInsight.endTime}</div>
    <div>Total Downtime: {callInsight.totalAmountOfDowntime}</div>
    <div>What Happened? {callInsight.descriptionOfIssue}</div>
    <div>Repair Made? {callInsight.RepairMade}</div>
    
</section>
}

