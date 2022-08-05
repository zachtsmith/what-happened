import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("whatHappened_user", JSON.stringify({
                        id: user.id,
                        name: user.name,
                        manager: user.isManager
                    }))

                    navigate("/home")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>What Happened?</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail" className="email-label"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email"
                            required autoFocus />
                            
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="button-signIn">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            
            <section className="link--register">
                <Link to="/register" className="button-needToRegister">Need to Register?</Link>
            </section>
            
        </main>
    )
}