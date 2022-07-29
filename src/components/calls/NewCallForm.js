import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewCallForm = () => {
    const [newCall, updateCallList] = useState({
        zoneId: null,
        equipmentId: null,
        issueDetailsId: null,
        date: null,
        startTime: null,
        endTime: null,
        totalAmountOfDowntime: null,
        descriptionOfIssue: null,
        RepairMade: null
    })
    const [calls, setCalls] = useState([])
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()
    const localUser = localStorage.getItem("whatHappened_user")
    const whatHappenedUserObject = JSON.parse(localUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/zones`)
                .then(response => response.json()).then((callLogArray) => { setCalls(callLogArray) })

        },
        [] // When this array is empty, you are observing initial component state
    )
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const callToSendToAPI = {
            userId: whatHappenedUserObject.id,
            zoneId: newCall.zoneId,
            equipmentId: newCall.equipmentId,
            issueDetailsId: newCall.issueDetailsId,
            date: newCall.date,
            startTime: newCall.startTime,
            endTime: newCall.endTime,
            totalAmountOfDowntime: newCall.totalAmountOfDowntime,
            descriptionOfIssue: "",
            RepairMade: ""
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/loggedCalls`, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(callToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/")
            })
    }

    return (
        <form className="newCallForm">
            <h2 className="newCallForm__title">New Call</h2>

            <div className="form-group">
                <label htmlFor="description">Zone</label>
                <select className="calls" id="calls" >
                    {calls.map(
                        (call) => (<option value={newCall.zoneId}
                            onChange={
                                (evt) => {
                         updateCallList(evt.target.value)
                                }}
                        >{call?.zoneNumber}</option>
                        ))}

                </select>
            </div>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit to Logbook
            </button>
        </form>
    )
}