import { Outlet, Route, Routes } from "react-router-dom"



import { NewCallForm } from "../calls/NewCallForm"
import { CallLog } from "../calls/CallLog"


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

                <Route path="tickets" element={< NewCallForm /> } />
                <Route path="ticket/create" element={< CallLog />} />
                
            </Route>
        </Routes>
    )
}