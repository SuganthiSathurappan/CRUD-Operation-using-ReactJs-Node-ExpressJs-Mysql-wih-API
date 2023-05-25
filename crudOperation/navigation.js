import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Home = () => {
    const navigate = useNavigate();
    const [logout, setLogout] = useState(false);
    const navigateEmpView = () => { navigate('/getEmpDetails'); };
    const navigateAdduser = () => { navigate('/customerApp'); };

    React.useEffect(() => {
        if (!localStorage.getItem('auth'))
            navigate('/loginForm')
    },[logout])


    const navigateLogout = () => {
        localStorage.removeItem("auth")
        setLogout(true)
       // navigate('/loginForm')

    };
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
                <div class="container-fluid justify-content-center">
                    <button className="btn btn-outline-success text-white" onClick={navigateEmpView}>
                       View Employee Details</button>
                    <button className="btn btn-outline-success text-white" onClick={navigateAdduser}>
                        Add Employee Details</button>
                    <button className="btn btn-outline-success text-white" onClick={navigateLogout}>
                        Logout</button>
                </div>
            </nav>
        </div>
    );
}

export default Home;


