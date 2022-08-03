import { Outlet, Route, Routes } from "react-router-dom"



import { NewCallForm } from "../calls/NewCallForm"
import { CallLog } from "../calls/CallLog"
import { Call } from "../calls/Call"
import { TodaysCalls } from "../calls/TodaysCalls"
import { CallDetails } from "../calls/CallDetails"


export const TechnicianViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>What Happened?</h1>
                    <div></div>

                    <Outlet />
                </>
            }>

                {/* <Route path="home" element={< TodaysCalls /> } /> */}
                <Route path="logbook" element={< CallLog /> } />
                <Route path="newcall" element={< NewCallForm />} />
                <Route path="call/:callId" element={< CallDetails />}/>
                
            </Route>
        </Routes>
    )
}