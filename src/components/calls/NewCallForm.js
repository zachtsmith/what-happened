import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { EquipmentSelection } from "./EquipmentSelection"
import { ZoneSelection } from "./ZoneSelection"

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
                .then(response => response.json()).then((equipmentArray) => {setEquipment(equipmentArray) })

        },
        [] // When this array is empty, you are observing initial component state
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
        [] // When this array is empty, you are observing initial component state
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
            descriptionOfIssue: "",
            RepairMade: ""
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
            {/* <ZoneSelection zoneChoice={updateCallList} />
          <EquipmentSelection equipmentChoice={newCall} /> */}
          <fieldset>
                <div className="form-group">
                    <label htmlFor="zone">Zone</label>
                    <select onChange={
                        (evt) => {
                            const copy = { ...newCall }
                            copy.zoneId = evt.target.value
                            updateCallList(copy)
                        }
                    } >
                        {zones.map(
                            (zone, index) => (<option value={zones.zoneId} key={index}
                            >{zone?.zoneNumber}</option>
                            ))}

                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="equipment">Equipment Detail</label>
                    <select onChange={
                        (evt) => {
                            const copy = { ...newCall }
                            copy.equipmentId = evt.target.value
                            updateCallList(copy)
                    }   
                                
                    } >
                        {equipments.map(
                            (equipment, index) => (
                        <option value={newCall.equipmentId} key={index}

                            >Zone {equipment?.zoneId} {equipment?.equipmentType} #{equipment?.equipmentTypeNumber}</option>
                            ))}

                    </select>
                </div>
            </fieldset> 
         <fieldset>
                <div className="form-group">
                    <label htmlFor="issues">Issue Type and Root Cause</label>
                    <select onChange={
                        (evt) => {
                            const copy = { ...newCall }
                            copy.issueDetailsId = evt.target.value
                            updateCallList(copy)
                        }
                    } >
                        {issues.map(
                            (issue, index) => (<option value={issue.issueDetailsId} key={index}

                            >Type:{issue?.whatTypeOfIssue} Root Cause:{issue?.causeOfIssue}</option>
                            ))}

                    </select>
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