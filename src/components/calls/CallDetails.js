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
    {/* <div>Email: {employee?.user?.email}</div>
    <div>Specialty: {employee.specialty}</div>
    <div>Pay Rate: {employee.rate}</div>
    <footer className="employee_footer">Currently working on {employee?.employeeTickets?.length} tickets.</footer> */}
</section>
}