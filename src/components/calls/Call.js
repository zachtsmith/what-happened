import { Link } from "react-router-dom";

export const Call = ({id, equipmentZoneId, equipmentType, equipmentTypeNumber, issue }) => {
    return <section className="call"> <Link to={`/call/${id}`}><header>Zone {equipmentZoneId} {equipmentType} {equipmentTypeNumber}</header> <li className="call_description"> {issue} </li></Link>
                    </section>
                }
