import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user, setUser] = useState({
        name:'', email:'', password: '', gender: '', dob: '', bio: '', role: ''
    })

    const onChangeInput = e =>{
        let {name, value} = e.target;
    
        setUser({...user, [name]:value})
        console.log(user);
        console.log(user.role);
        console.log(typeof(user.role));
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/movies";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <br/>
                <input className='input' type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />

                <input className='input' type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input className='input' type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className='gender'>
                <label>Gender: </label> <br/><input type="radio" name="gender" value="male" onChange={onChangeInput}/>Male       
                <input type="radio" name="gender" value="female" onChange={onChangeInput}/>Female
                </div>
                <br/>
                <label>DOB: </label><input type='date' name="dob" value={user.dob} onChange={onChangeInput} /><br/>
                <br/>
                <div className='role'>
                <label>Role: </label>
                <input type="radio" name="role" value="0" onChange={onChangeInput}/>Actor       
                <input type="radio" name="role" value="1" onChange={onChangeInput}/>Producer
                </div>

                <input className='input' type="text" name="bio" required autoComplete="on"
                placeholder="Bio" value={user.bio} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register