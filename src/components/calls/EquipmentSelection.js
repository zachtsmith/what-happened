import { useEffect, useState } from "react"

export const EquipmentSelection = ({equipmentChoice}) => {
    const [equipments, setEquipment] = useState([])
    const [displayedEquipment, setEquipmentDisplayed] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/equipment`)
                .then(response => response.json()).then((equipmentArray) => {setEquipment(equipmentArray) })

        },
        [] // When this array is empty, you are observing initial component state
    )
    useEffect(
        () => {
           if (equipments.zoneId === equipmentChoice.zoneId) {
                setEquipmentDisplayed(equipments)
           }   
        }, [equipmentChoice])
    return (
     <fieldset>
                <div className="form-group">
                    <label htmlFor="equipment">Equipment</label>
                    <select onChange={
                        (evt) => {
                            const copy = { ...equipmentChoice }
                            copy.equipmentId = evt.target.value
                            equipmentChoice(copy)
                    }   
                                
                    } >
                        {displayedEquipment.map(
                            (displayedEquip, index) => (
                        <option value={displayedEquip.equipmentId} key={index}

                            >{displayedEquip?.equipmentType} {displayedEquip?.equipmentTypeNumber}</option>
                            ))}

                    </select>
                </div>
            </fieldset>) 
}