import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('api/user/profile', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    setUserData(data);

    console.log(userData.Login);
    console.log(userData.Email);
    console.log(userData.Birthday);

};

    const logout = async () => {
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }
    return(
        <div className="d-flex justify-content-center">
            <div>
                <h2 class="profile-title">Ваш логин</h2>
                <p class="profile-value">{userData.Login} .</p>

                <h2 class="profile-title">Ваш Email</h2>
                <p class="profile-value">{userData.Email} .</p>
                
                <h2 class="profile-title">Ваша дата рождения</h2>
                <p class="profile-value">{userData.Birthday} .</p>
            <Button onClick={logout} size='lg' style={{radius: 2000, backgroundColor: '#E84A5F', color: 'white'}} className='mt-3' variant={"outline-succes"}>
                        Выйти
            </Button>
            </div>
        </div>
    )
    
}

export default Profile;