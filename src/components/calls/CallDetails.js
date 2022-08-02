import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CallDetails = () => {
    const {callId} = useParams()
    const [callInsight, updateCallInsight] = useState({})

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
    return <section className="callDetail" >
    <header className="callDetail_header">{callInsight.zoneId}</header>
    <div>Zone: {}</div>
    <div>Equipment: {employee.specialty}</div>
    <div>Problem: {employee.rate}</div>
    <footer className="employee_footer">Currently working on {employee?.employeeTickets?.length} tickets.</footer>
</section>
}

// zoneId: 0,
//         equipmentId: 0,
//         issueDetailsId: 0,
//         date: "",
//         startTime: "",
//         endTime: "",
//         totalAmountOfDowntime: 0,
//         descriptionOfIssue: "",
//         RepairMade: ""