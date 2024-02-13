import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom/dist'
import { login_api } from '../../apis/api'
import { show_alert } from '../../componets/Alert'
import { insert_user_data } from './Auth_reducer'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user_data, setuser_data] = useState({
        email: '',
        password: ''
    });

    const upd_user_data = (key, value) => {
        setuser_data({
            ...user_data,
            [key]: value
        })
    };

    const { email, password } = user_data;
    const login = (e) => {
        e.preventDefault();
        login_api(user_data).then((res) => {
            if (res.status == 1) {
                show_alert('Success', 'Successfully logged in!', 'success');
                dispatch(insert_user_data(res.result))
                console.log({ res });
                navigate('/profile');
            }
            else {
                show_alert('Oops!', 'Email already exists!', 'error');

            }
        }).catch((err) => {
            console.log({ err });
            show_alert('Oops!', 'Some error occurred!', 'error');
        })
    }


    return (
        <div
            className='form_container'
        >
            <form onSubmit={login} className='login_form'>
                <h2>Login</h2>
                <label for="email">User name:</label>
                <input
                    value={email}
                    onChange={(e) => {
                        upd_user_data('email', e.target.value);
                    }}
                    type="email" id="email" name="email" required />
                <label for="password">Password:</label>
                <input
                    value={password}
                    onChange={(e) => {
                        upd_user_data('password', e.target.value);
                    }}
                    type="password" id="password" name="password" required />
                <input type="submit" value="Login" />
                <div style={{ width: "100%", textAlign: "center", marginTop: "8px" }}>
                    <Link to="/register">
                        Sign up
                    </Link>
                </div>
            </form>

        </div>
    )
}

export default Login