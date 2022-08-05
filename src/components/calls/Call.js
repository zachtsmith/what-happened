import { Link } from "react-router-dom";
import "./Calls.css"


export const Call = ({id, equipmentZoneId, equipmentType, equipmentTypeNumber, date, issueStart, issueEnd, downtime, issue, repair }) => {
    return <section className="call"> <Link to={`/call/${id}`}><header>Call #{id}</header></Link><footer>Zone {equipmentZoneId} {equipmentType} {equipmentTypeNumber}</footer>
                    </section>
                }


                