import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { LOGIN_ROUTE } from '../utils/consts';

const Main = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    function findAuth () {
        if(user.setIsAuth(false)){
            navigate(LOGIN_ROUTE)
        }
    }
    useEffect(() => {
        findAuth();
      }, []);
    return (
        <div>
            Main
        </div>
    )
}

export default Main;