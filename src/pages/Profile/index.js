import React, { useEffect } from 'react';
import './UserProfile.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { insert_user_data, remove_user_data } from '../Auth/Auth_reducer';
import { useNavigate } from 'react-router-dom/dist';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = {
        image: 'user.jpg',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
    };

    const user_data = useSelector((state) => state?.auth_reducer?.user_data);
    const navigate = useNavigate();
    useEffect(() => {
        if (!(user_data?._id)) {
            navigate('/login')
        }
    }, [])

    const logout = () => {
        dispatch(remove_user_data());
        navigate('/login');
    }


    return (
        <div className="profile-container">
            <div className="profile-details">
                <h2 className="profile-name">{user_data.name}</h2>
                <p className="profile-info"><strong>Email:</strong> {user_data.email}</p>
                <p className="profile-info"><strong>Phone:</strong> {user_data.mobile}</p>
                <p className="profile-info"><strong>Address:</strong> {user_data.address}</p>
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <button onClick={logout} type='submit'>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
