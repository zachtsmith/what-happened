
import { TechnicianViews } from "./TechnicianViews"
import { ManagerViews } from "./ManagerViews"


export const ApplicationViews = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


   if (honeyUserObject.staff) {
    return <ManagerViews />
   }
   else {
     return <TechnicianViews />
   }
}