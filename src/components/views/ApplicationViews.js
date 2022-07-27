
import { TechnicianViews } from "./TechnicianViews"
import { ManagerViews } from "./ManagerViews"


export const ApplicationViews = () => {
    const localUser = localStorage.getItem("whatHappened_user")
    const whatHappenedUserObject = JSON.parse(localUser)


   if (whatHappenedUserObject.manager) {
    return <ManagerViews />
   }
   else {
     return <TechnicianViews />
   }
}