import { Link } from "react-router-dom";
import "./Calls.css"


export const Call = ({id, equipmentZoneId, equipmentType, equipmentTypeNumber, date, issueStart, issueEnd, downtime, issue, repair }) => {
    return <Link to={`/call/${id}`}><section className="call"> <header>Zone {equipmentZoneId} {equipmentType} {equipmentTypeNumber}</header> <footer></footer>
                    </section></Link>
                }


                