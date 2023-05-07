// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import './lp.scss';
import {Link} from "react-router-dom";
import {axiosInstance} from "../Server/ServerConfig.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        const res = await axiosInstance.post('/api/v1/auth/authenticate', {email: email, password: password});
        console.log(res.data);
        if(res.status === 200) {
            window.location.reload();
        }
    }

    return (
        <div className="lg-page-container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-key">
                        <i className="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <div className="col-lg-12 login-title">
                        Авторизация
                    </div>

                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form>
                                <div className="form-group">
                                    <label className="form-control-label">Email</label>
                                    <br/>
                                    <TextField size = 'small' type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Пароль</label>
                                    <br/>
                                    <TextField size = 'small'  value={password} onChange={e => setPassword(e.target.value)} type="password" />
                                </div>

                                <div className="col-lg-12 loginbttm">
                                    <div className="col-lg-6 login-btm login-text">
                                    </div>
                                    <div className="col-lg-12 login-btm login-button">
                                        <Button color='primary' onClick={e => login(e)} >Авторизация</Button>
                                    </div>
                                    <div className="col-lg-12 login-btm login-button">
                                        <Button color='secondary'><Link to={'/register'}>Регистрация</Link></Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>

        </div>
    );
};

export default LoginPage;
