import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import '../style/Profile.css'


const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/user/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    setUserData(response.data);
};

    const logout = async () => {
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }

    if (!userData) {
      return <p>Загрузка...</p>;
    }

    return(
        <div className="d-flex justify-content-center">
            <div class='profile-main'>
                <h1>Профиль</h1>
                <div class='profile-content'>
                  <h2 class="profile-title">Ваш логин</h2>
                  <p class="profile-value">{userData.Login}</p>

                  <h2 class="profile-title">Ваш Email</h2>
                  <p class="profile-value">{userData.Email}</p>
                
                  <h2 class="profile-title">Ваша дата рождения</h2>
                  <p class="profile-value">{new Date(userData.Birthday).toLocaleDateString()}</p>
                </div>
                
            <Button onClick={logout} size='lg' style={{borderRadius: 2000, paddingTop: 14, paddingBottom: 14, paddingLeft: 24, paddingRight: 24, backgroundColor: '#E84A5F', color: 'white', width: 404}} className='mt-3' variant={"outline-succes"}>
                        Выйти
            </Button>
            </div>
        </div>
    )
    
}

export default Profile;