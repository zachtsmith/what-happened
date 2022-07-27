import { TechNav } from "./TechNav"
import { ManagerNav } from "./ManagerNav"
import "./NavBar.css"

export const NavBar = () => {
    const localUser = localStorage.getItem("whatHappened_user")
    const whatHappenedUserObject = JSON.parse(localUser)


   if (whatHappenedUserObject.manager) {
    return <ManagerNav />
   }
   else {
     return <TechNav />
   }
}

