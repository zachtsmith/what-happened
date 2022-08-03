import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const NewCallForm = () => {
    const [newCall, updateCallList] = useState([{
        zoneId: 0,
        equipmentId: 0,
        issueDetailsId: 0,
        date: "",
        startTime: "",
        endTime: "",
        totalAmountOfDowntime: 0,
        descriptionOfIssue: "",
        RepairMade: ""
    }])
    const [zones, setZones] = useState([])
    const [equipments, setEquipment] = useState([])
    const [displayedEquipment, setEquipmentDisplayed] = useState([])
    const [issues, setIssueDetails] = useState([])

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
                .then(response => response.json()).then((zonesArray) => { setZones(zonesArray) })

        },
        [] // When this array is empty, you are observing initial component state
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/equipment`)
                .then(response => response.json()).then((equipmentArray) => { setEquipment(equipmentArray) })

        },
        [] 
    )
    useEffect(
        () => {
            if (equipments.zoneId === newCall.zoneId) {
                setEquipmentDisplayed(equipments)
            }
        }, [newCall])
    useEffect(
        () => {
            fetch(`http://localhost:8088/issueDetails`)
                .then(response => response.json()).then((issuesArray) => { setIssueDetails(issuesArray) })

        },
        [] 
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const callToSendToAPI = {
            userId: whatHappenedUserObject.id,
            zoneId: newCall.zoneId,
            equipmentId: newCall.equipmentId,
            issueDetailsId: newCall.issueDetailsId,
            date: newCall.date,
            startTime: newCall.startTime,
            endTime: newCall.endTime,
            totalAmountOfDowntime: newCall.totalAmountOfDowntime,
            descriptionOfIssue: newCall.descriptionOfIssue,
            repairMade: newCall.repairMade
        }

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
{/* Display Zone */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="zone">Zone </label>
                    <select onChange={
                        (evt) => {
                            const copy = { ...newCall }
                            copy.zoneId = parseInt(evt.target.value)
                            updateCallList(copy)
                        }
                    } ><option value={0}> Select... </option>
                        {zones.map(
                            (zone, index) => {
                                return (<option value={zone.id} key={index}
                                >{zone?.id}</option>
                                )
                            })}

                    </select>
                </div>
            </fieldset>
            {/* Display Equipment */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="equipment">Equipment Detail </label>
                    <select onChange={
                        (evt) => {
                            const copy = { ...newCall }
                            copy.equipmentId = parseInt(evt.target.value)
                            updateCallList(copy)
                        }

                    } ><option value={0}> Select... </option>
                        {equipments.map(
                            (equipment, index) => {
                                return (
                                    <option value={equipment.id} key={index}

                                    >Zone {equipment?.zoneId}  {equipment?.equipmentType} #{equipment?.equipmentTypeNumber}</option>)
                            }
                        )}

                    </select>
                </div>
            </fieldset>
            {/* Display Issue */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="issues">Issue Type and Root Cause</label>
                    <select onChange={
                        (evt) => {
                            const copy = { ...newCall }
                            copy.issueDetailsId = parseInt(evt.target.value)
                            updateCallList(copy)
                        }
                    } ><option value={0}> Select... </option>
                        {issues.map(
                            (issue, index) => {return (<option value={issue.id} key={index}

                            > {issue?.whatTypeOfIssue} : {issue?.causeOfIssue}</option>)}
                            )}

                    </select>
                </div>
            </fieldset>
            {/* Display Date */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Date"
                        value={newCall.date}
                        onChange={
                            (evt) => {
                                const copy = { ...newCall }
                                copy.date = evt.target.value
                                updateCallList(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/* Display StartTime */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        placeholder="Start Time of Repair"
                        value={newCall.startTime}
                        onChange={
                            (evt) => {
                                const copy = { ...newCall }
                                copy.startTime = evt.target.value
                                updateCallList(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/* Display EndTime */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="endTime">End Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        placeholder="End Time of Repair"
                        value={newCall.endTime}
                        onChange={
                            (evt) => {
                                const copy = { ...newCall }
                                copy.endTime = evt.target.value
                                updateCallList(copy)
                            }
                        } />
                </div>
            </fieldset>
             {/* Display Total Downtime */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="totalTime">Total Downtime</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="(minutes)"
                        value={newCall.totalAmountOfDowntime}
                        onChange={
                            (evt) => {
                                const copy = { ...newCall }
                                copy.totalAmountOfDowntime = parseInt(evt.target.value)
                                updateCallList(copy)
                            }
                        } />
                </div>
            </fieldset>
            {/* Display Issue Entry Form */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="whatHappened">What Happened?</label>
                    <input
                        required autoFocus
                        type="form"
                        className="form-control"
                        placeholder=""
                        value={newCall.descriptionOfIssue}
                        onChange={
                            (evt) => {
                                const copy = { ...newCall }
                                copy.descriptionOfIssue = evt.target.value
                                updateCallList(copy)
                            }
                        } />
                </div>
            </fieldset>
             {/* Display Repair Description */}
             <fieldset>
                <div className="form-group">
                    <label htmlFor="repair">What did you do to fix it?</label>
                    <input
                        required autoFocus
                        type="form"
                        className="form-control"
                        placeholder=""
                        value={newCall.repairMade}
                        onChange={
                            (evt) => {
                                const copy = { ...newCall }
                                copy.repairMade = evt.target.value
                                updateCallList(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit to Logbook
            </button>
        </form>
    )
}