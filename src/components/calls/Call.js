import { Link } from "react-router-dom";
import "./Calls.css"


export const Call = ({id, userId, equipmentZoneId, equipmentType, equipmentTypeNumber, date, issueStart, issueEnd, downtime }) => {



    const localUser = localStorage.getItem("whatHappened_user")
    const whatHappenedUserObject = JSON.parse(localUser)

   
    return <section className="call"> 
    <Link className="call_link" to={`/call/${id}`}><header>Call #{id}</header></Link>
    <div>Zone {equipmentZoneId} | {equipmentType} {equipmentTypeNumber} | Down for <span className="downtime">{downtime}</span> minutes. </div>
                    </section>
                 }


                //  | Submitted by: {whatHappenedUserObject.name}             