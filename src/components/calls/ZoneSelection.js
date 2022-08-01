import { useEffect, useState } from "react"

export const ZoneSelection = ({zoneChoice}) => {
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
    useEffect(
        () => {
            fetch(`http://localhost:8088/zones`)
                .then(response => response.json()).then((zonesArray) => { setZones(zonesArray) })

        },
        [zoneChoice] // When this array is empty, you are observing initial component state
    )
    return (<fieldset>
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
                            (zone, index) => (<option value={zoneChoice.zoneId} key={index}
                            >{zone?.zoneNumber}</option>
                            ))}

                    </select>
                </div>
            </fieldset>)
}