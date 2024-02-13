import React, { useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom/dist';
import { signUp_api } from '../../apis/api';
import { show_alert } from '../../componets/Alert';

const Register = () => {
    const navigate = useNavigate();
    const [user_data, setuser_data] = useState({
        name: "",
        email: '',
        mobile: '',
        address: '',
        gender: '',
    });

    const upd_user_data = (key, value) => {
        setuser_data({
            ...user_data,
            [key]: value
        })
    };

    const { name, email, mobile, address, gender } = user_data;
    const signup = (e) => {
        e.preventDefault();
        signUp_api(user_data).then((res) => {
            console.log({ res });
            if (res.status == 1) {
                show_alert('Success', 'Successfully registered, Password for your account has been sent to your email', 'success');
                navigate('/login');
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
            <form onSubmit={signup} className='register_form'>
                <h2>Register</h2>
                <label for="username">Username:</label>
                <input type="text"
                    value={name}
                    onChange={(e) => {
                        upd_user_data('name', e.target.value);
                    }}
                    id="username" name="username" required />
                <label for="email">Email:</label>
                <input type="email"
                    value={email}
                    onChange={(e) => {
                        upd_user_data('email', e.target.value);
                    }}
                    id="email" name="email" required />
                <label for="phone">Phone:</label>
                <input type="tel"
                    value={mobile}
                    onChange={(e) => {
                        upd_user_data('mobile', e.target.value);
                    }}
                    id="phone" name="phone" required />
                <label for="address">Address:</label>
                <input type="text"
                    value={address}
                    onChange={(e) => {
                        upd_user_data('address', e.target.value);
                    }}
                    id="address" name="address" />
                <label for="gender">Gender:</label>
                <select id="gender"
                    value={gender}
                    onChange={(e) => {
                        upd_user_data('gender', e.value);
                    }}

                    name="gender" required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <input type="submit" value="Submit" />
                <div style={{ width: "100%", textAlign: "center", marginTop: "8px" }}>
                    <Link to="/login">
                        Log in
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register