import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const api = axios.create({
    baseURL: 'http://localhost:8080'
})

function Loginpage() {

    const [Username, setUserName] = useState("");
    const [Password, setPassword] = useState("");

    const navigate = useNavigate();
    React.useEffect(() => {
        if (localStorage.getItem('auth')) {
            localStorage.removeItem("auth")
            navigate('/loginForm')
        }
    }, [])


    async function handleSubmit(e) {
        e.preventDefault()
        const table_request = await api.get('/createAdminTable')
        console.log(table_request)
        await api.post("/getLoginAuth", {
            Username: Username,
            Password: Password
        }).then((response) => {

            console.log("get Server Response", response.data);
            var check = response.data
            if (check === true) {
                navigate('/getEmpDetails')

                localStorage.setItem("auth", true)
            }
            else
                alert(check)
        });
    }

    return (

        <div className="fullbody loginpadding">
            <div class="login">
                <h3>Admin Login</h3>
                <form method="POST" onSubmit={handleSubmit}>
                    <label >User Name
                        <i class="fas fa-user"></i>
                    </label>
                    <input required id="uname"
                        type="text" name="username" placeholder="Enter UserName" onChange={(e) => setUserName(e.target.value)}></input>

                    <label>Password
                        <i class="fas fa-lock"></i>
                    </label>
                    <input required id="pword"
                        type="password" name="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}></input>
                    <input type="submit" value="Login"></input>
                </form>
            </div>

        </div>

    )
}

export default Loginpage