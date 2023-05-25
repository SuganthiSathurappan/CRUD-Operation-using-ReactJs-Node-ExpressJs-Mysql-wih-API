import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:8080'

// })

function EditUserForm() {
    const [errorMsg, setError] = useState({});

    const { id } = useParams()

    console.log("enter edit")

    useEffect(() => {
        console.log("Employee ID :", id)
        axios.get("http://localhost:8080/select/" + id)
            .then((res) => {
                setUser({
                    ...user,
                    empid: res.data[0].EmpId,
                    name: res.data[0].Name,
                    email: res.data[0].Email,
                    mobile: res.data[0].Mobile,
                    department: res.data[0].Department
                });
                console.log("Array Data :", res.data)
            })
            .catch((err) => console.log(err));
    }, []);


    const [user, setUser] = useState({
        empid: '',
        name: '',
        mobile: '',
        email: '',
        department: '',
    })


    const Depts = [
        { label: "Account", value: "Account" },
        { label: "Sales", value: "Sales" },
        { label: "Management", value: "Management" },
        { label: "IT", value: "IT" }
    ]



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user.empid || !user.name || !user.email || !user.mobile || !user.department)
            return
        if (!errorMsg.name && !errorMsg.mobile) {

            axios.put('http://localhost:8080/update/' + user.empid, user)
                .then(response => {
                    const data = response.data
                    if (data === 'ok') {
                        window.location.href = '/getEmpDetails';
                    }
                    else
                        return
                })
        }
    }
    const Cancelbtn = (e) => {
        window.location.href = '/getEmpDetails';
    }

    return (

        <div className="fullbody loginpadding">
            <form onSubmit={handleSubmit} className='addContent'>
                <div>
                    <h3 className='head'>Edit Employee Details</h3>
                </div>
                <div className="col mt-4">
                    <input type="text" onChange={e => setUser({ ...user, empid: e.target.value })} value={user.empid}
                        name="empid" className="form-control" placeholder="Employee ID" />
                    {<p class="text-danger">{errorMsg.empid}</p>}
                </div >
                <div className="col mt-4">
                    <input type="text" onChange={e => setUser({ ...user, name: e.target.value })} value={user.name}
                        name="fullName" className="form-control" placeholder="Employee Name" />
                    {<p class="text-danger">{errorMsg.fullName}</p>}
                </div >
                <div className="col mt-4">
                    <input type="email" onChange={e => setUser({ ...user, email: e.target.value })} value={user.email}
                        name="emailAddress" className="form-control" placeholder="Email Address" />
                </div>
                <div className="col mt-4">
                    <input type="text" onChange={e => setUser({ ...user, mobile: e.target.value })} value={user.mobile}
                        maxLength={10} name="mobile" className="form-control" placeholder="Mobile" />
                    {<p class="text-danger">{errorMsg.mobile}</p>}
                </div>
                <div className="col mt-4">
                    <Dropdown

                        label="Select Department"
                        options={Depts}

                        value={user.department}
                        name="department"

                        onChange={e => setUser({ ...user, department: e.target.value })}

                    />
                </div>

                <div className='mt-4 head'>
                    <button className='btn bg-primary ms-1'>Update user</button>
                    <button onClick={Cancelbtn}

                        className="button muted-button btn bg-primary ms-1">
                        Cancel
                    </button>
                </div>
            </form>

        </div>
    )
}

const Dropdown = ({ label, value, name, options, onChange }) => {

    return (
        <>
            <select name={name} value={value} onChange={onChange} className="form-select">
                <option >--Select Department--</option>
                {options.map((user) => (

                    <option value={user.value} > {user.label}</option>

                ))}

            </select>
        </>
    );
};

export default EditUserForm