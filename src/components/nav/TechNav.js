import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const TechNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/newcall">Submit New Call</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/logbook">Company Logbook</Link>
            </li>
            
            {
                localStorage.getItem("whatHappened_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("whatHappened_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

