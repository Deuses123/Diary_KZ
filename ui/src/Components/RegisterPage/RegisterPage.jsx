    // eslint-disable-next-line no-unused-vars
    import React, {useState} from 'react';
    import './lp.scss';
    import {Link} from "react-router-dom";
    import {axiosInstance} from "../Server/ServerConfig.js";
    import TextField from "@mui/material/TextField";
    import Button from "@mui/material/Button";
    const RegisterPage = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [repeatPassword, setRepeatPassword] = useState('');
        const register = async (e) => {
            e.preventDefault();
            if (password === repeatPassword) {
                const res = await axiosInstance.post('/api/v1/auth/register', {email: email, password: password});
                console.log(res.data);
                if(res.status === 200) {
                    window.location.reload();
                }
            }
            else {
                alert("Разные пароли !!!!");
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
                            Регистрация
                        </div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form>
                                    <div className="form-group">
                                        <label className="form-control-label">Email</label>
                                        <br/>
                                        <TextField size = 'small' type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                                        <br/>
                                        <label className="form-control-label">Пароль</label>
                                        <br/>
                                        <TextField size = 'small'  value={password} onChange={e => setPassword(e.target.value)} type="password" />
                                        <br/>
                                        <label className="form-control-label">Повторите пароль</label>
                                        <br/>
                                        <TextField size = 'small'  value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} type="password" />
                                    </div>

                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-12 login-btm login-button">
                                            <Button color='primary' onClick={e => register(e)} >Регистрация</Button>
                                        </div>
                                        <div className="col-lg-12 login-btm login-button">
                                            <Button color='secondary'><Link to={'/'}>Авторизация</Link></Button>
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

    export default RegisterPage;
