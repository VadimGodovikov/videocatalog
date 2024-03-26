import React, {  useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const response = fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = response.json();

      if (response.ok) {
        setUser(data.user);
      } else {
        console.error(data.error);
      }

    }, [])

    

    const logout = async () => {
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }
    return(
        <div className="d-flex justify-content-center">
            <div>
                <h2 class="profile-title">Ваш логин</h2>
                <h2 class="profile-value">{user.Login}</h2>

                <h2 class="profile-title">Ваш Email</h2>
                <h2 class="profile-value">{user.Email}</h2>
                
                <h2 class="profile-title">Ваша дата рождения</h2>
                <h2 class="profile-value">{user.Birthday}</h2>
            <Button onClick={logout} size='lg' style={{radius: 2000, backgroundColor: '#E84A5F', color: 'white'}} className='mt-3' variant={"outline-succes"}>
                        Выйти
            </Button>
            </div>
        </div>
    )
    
}

export default Profile;