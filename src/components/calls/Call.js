import { Link } from "react-router-dom";
import "./Calls.css"


export const Call = ({id, equipmentZoneId, equipmentType, equipmentTypeNumber, issueStart, issueEnd, downtime, issue, repair }) => {
    return <section className="call"> <Link to={`/call/${id}`}><header>Zone {equipmentZoneId} {equipmentType} {equipmentTypeNumber}</header> </Link><li className="call_description"> {issue} </li>
                    </section>
                }


                