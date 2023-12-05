import React, { useContext, useState } from 'react';
import {Container, Form, Button} from 'react-bootstrap'
import Card from "react-bootstrap/Card"
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { registration } from '../http/userAPI';
import { Context } from '..';

const Registration = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [Login, setLogin] = useState('')
    const [Password, setPassword] = useState('')
    const [Email, setEmail] = useState('')
    const [Birthday, setBirthday] = useState('')
    
    const click = async () => {
        console.log("Login:", Login);
        console.log("Password:", Password);
        console.log("Email:", Email);
        console.log("Birthday:", Birthday);

        try{
            let data;

            data = await registration(Login, Password, Email, Birthday);
            user.setUser(user)
            navigate(LOGIN_ROUTE)
        }catch(e) {
            alert(e.response.data.message)
        }
    }

    const formatBirthday = (value) => {
        // Функция для форматирования даты в формат "гггг-мм-дд"
        const regex = /^(\d{0,4})(\d{0,2})(\d{0,2})$/;
        const matches = value.match(regex);

        if (matches) {
            const formattedDate = matches
                .slice(1, 4) // Отбрасываем полное совпадение
                .map((match, index) => (index === 2 ? match.padStart(2, '0') : match)) // Дополняем день до двух цифр
                .join('-'); // Формируем дату

            return formattedDate;
        }

        return value;
    };

    const handleBirthdayChange = (e) => {
        // Обработчик изменения значения в поле даты
        const formattedDate = formatBirthday(e.target.value);
        setBirthday(formattedDate);
    };
    
    return (

        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 400, border: 0}} className="p-5">
                <h2 className="m-auto">Регистрация</h2>
                <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            size='lg'
                            placeholder="Введите ваш логин..."
                            value={Login}
                            onChange={e => setLogin(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            size='lg'
                            type="password"
                            placeholder="Введите ваш пароль..."
                            value={Password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Form.Control
                            size='lg'
                            type='email'
                            className="mt-3"
                            placeholder="Введите ваш Email..."
                            value={Email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            size='lg'
                            type='date'
                            className="mt-3"
                            placeholder="Введите вашу дату рождения (19-09-1999)..."
                            value={Birthday}
                            onChange={handleBirthdayChange}
                        />
                    <Button onClick={click} size='lg' style={{radius: 2000, backgroundColor: '#E84A5F', color: 'white'}} className='mt-3' variant={"outline-success"}>
                        Регистрация
                    </Button>
                    <div style={{textAlign: 'center'}}>
                        Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}

export default Registration;