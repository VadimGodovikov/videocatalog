import React, { useState } from 'react';
import {Container, Form, Button} from 'react-bootstrap'
import Card from "react-bootstrap/Card"
import { NavLink } from 'react-router-dom';
import { REGISTRATION_ROUTE } from '../utils/consts';
import { login } from '../http/userAPI'

const Login = () => {
    const [Login, setLogin] = useState('')
    const [Password, setPassword] = useState('')

    const click = async () => {
        const response = await login();
        console.log(response)
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 400, border: 0}} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                        <Form.Control
                            size='lg'
                            className="mt-3"
                            placeholder="Введите ваш логин..."
                            value={Login}
                            onChange={e => setLogin(e.target.value)}
                        />
                        <Form.Control
                            size='lg'
                            className="mt-3"
                            type="password"
                            placeholder="Введите ваш пароль..."
                            value={Password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    <Button onClick={click} size='lg' style={{radius: 2000, backgroundColor: '#E84A5F', color: 'white'}} className='mt-3' variant={"outline-succes"}>
                        Войти
                    </Button>
                    <div style={{textAlign: 'center'}}>
                        Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Заргистрируйтесь!</NavLink>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}

export default Login;