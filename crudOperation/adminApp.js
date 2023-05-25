import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Viewpage from "./getEmpDetails"
import Loginform from "./loginForm"
import AddCusDet from "./customerApp"
import EditUserForm from './editTable';
import WithNavbar from './withNavbar';
import WithoutNavbar from './withoutNavbar';


function App() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route element={<WithoutNavbar />}>
                        <Route path="/" element={<Loginform />} />
                        <Route path="/loginForm" element={<Loginform />} />
                    </Route>
                    <Route element={<WithNavbar />}>
                        <Route path="/getEmpDetails" element={<Viewpage />} />
                        <Route path='/customerApp' element={<AddCusDet />} />
                        <Route path='/editTable/:id' element={<EditUserForm />}/>
                    </Route>
                </Routes>
            </Router>
        </div >
    );
};

export default App;