import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080'

})
console.log("enter Frontend")
function App() {
    const [form, setform] = useState({
        empid: '',
        name: '',
        mobile: '',
        email: '',
        dropdown: '',
    })

    const inputHandler = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    async function submitButton(e) {
        e.preventDefault()
        console.log(form)

        if (form.empid === '' || form.name === '' || form.mobile === '' || form.email === '' || form.dropdown === '') {
            alert('Please fill all the fields')
        }
        else {
            const request = {
                ...form
            }

            const db_request = await api.get('/createdb')
            console.log(db_request)
            const table_request = await api.get('/createtable')
            console.log(table_request)
            await api.post('/insertReapt', request)
                .then(response => {
                    const checkdata = response.data
                    if (checkdata === true) {
                        alert("Data insertion completed")
                        resetButton()
                        //window.location.href = '/getEmpDetails';
                    }
                    else
                        alert(checkdata)
                })

            // const response = await api.post('/insertReapt', request)
            // console.log(response)
            // resetButton()
            // alert("Added Employee Details", response)
            // //window.location.href('/getEmpDetails')
        }
    }

    const resetButton = (e) => {
        setform({
            empid: '',
            name: '',
            mobile: '',
            email: '',
            dropdown: ''
        })
    }

    return (
        <div className="fullbody loginpadding">
            <form className='addContent' >
                <h3 className='head'>Add Employee Details</h3>
                <div className="container mt-3 mb-3 ">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Employee ID</label>
                        <input type="empid" name="empid" className="form-control" value={form.empid} placeholder="Enter Employee ID" required
                            onChange={inputHandler} id="exampleFormControlInput1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                        <input type="name" name="name" className="form-control" value={form.name} placeholder="Enter Employee Name" required
                            onChange={inputHandler} id="exampleFormControlInput1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Mobile</label>
                        <input type="mobile" value={form.mobile} onChange={inputHandler} placeholder="Enter Mobile Number" required
                            maxLength={10} name="mobile" className="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input type="email" value={form.email} onChange={inputHandler} required
                            name="email" className="form-control" id="exampleFormControlInput1"
                            placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dept">Department</label>
                        <select name="dropdown" value={form.dropdown} className="form-control" id="dept" onChange={inputHandler}>
                            <option value="Select">Select</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                            <option value="Account">Account</option>
                        </select>
                    </div>

                    <div className="mb-3 head">
                        <button type='submit' onClick={submitButton} className="btn btn-success addempstylebtn">Submit</button>
                        <button type='reset' onClick={resetButton} className="btn btn-danger addempstylebtn">Clear</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default App;
