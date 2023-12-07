import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '..';

const Profile = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate();

    const logout = async () => {
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Button onClick={logout} size='lg' style={{radius: 2000, backgroundColor: '#E84A5F', color: 'white'}} className='mt-3' variant={"outline-succes"}>
                        Выйти
            </Button>
        </div>
    )
}

export default Profile;