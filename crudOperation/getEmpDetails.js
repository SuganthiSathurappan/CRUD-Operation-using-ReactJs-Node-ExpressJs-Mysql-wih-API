import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./style.css"
import { Link } from "react-router-dom";

function GetEmpDetails() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const url = "http://localhost:8080/select";
        axios.get(url).then(response => {
            const { data } = response
            setEmployees(data)
            console.log("Full Data : ", employees)
        })

    }, [])

    const deleteEmp = (eid) => {
        axios.delete(`http://localhost:8080/delete/${eid}`)
            .then((res) => {
                if (res.status === 200) {
                    alert("Student successfully deleted");
                    window.location.reload();
                }

            })
            .catch((err) => alert("Something went wrong"));
    };


    return (
        <div className='fullbody'>
            <div className='container my-4 p-5 getdetailsdiv'>
                <h3>View Employee Details</h3>

                <div className='padding-top:50px'>
                    <table className="table text-white ">
                        <thead className="table-dark">
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                employees?.map((emp) => {
                                    return (
                                        <tr key={emp.id}>
                                            <td>{emp.EmpId}</td>
                                            <td>{emp.Name}</td>
                                            <td>{emp.Mobile}</td>
                                            <td>{emp.Email}</td>
                                            <td>{emp.Department}</td>
                                            <td>
                                                <Link className="button muted-button btn bg-success text-white ms-1"
                                                    to={`/editTable/${emp.EmpId}`}>
                                                    Edit
                                                </Link>
                                                {/* <button className="button muted-button btn bg-success text-white ms-1"
                                                    onClick={UpdateUser(emp.EmpId)} >
                                                    Update
                                                </button> */}
                                                &nbsp;
                                                <Link onClick={() => deleteEmp(emp.EmpId)}
                                                    className="button muted-button btn bg-danger text-white ms-1">
                                                    Delete
                                                </Link>

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                    {/* <EditUserForm /> */}
                </div>
            </div>
        </div>
    )
}
export default GetEmpDetails