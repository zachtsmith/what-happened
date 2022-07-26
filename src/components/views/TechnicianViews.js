import { Outlet, Route, Routes } from "react-router-dom"



import { NewCallForm } from "../calls/NewCallForm"
import { CallLog } from "../calls/CallLog"
import { Call } from "../calls/Call"
import { MyCalls } from "../calls/MyCalls"
import { CallDetails } from "../calls/CallDetails"
import "./Views.css"

export const TechnicianViews = () => {
    return ( 

        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="what-happened">What Happened?</h1>
                
                    <Outlet />
                </>
            }>


                <Route path="home" element={< MyCalls />} />
                <Route path="logbook" element={< CallLog />} />
                <Route path="newcall" element={< NewCallForm />} />
                <Route path="call/:callId" element={< CallDetails />} />

            </Route>
        </Routes>
                
    )
}