import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api';
import '../../../../scss/admin/auth/login.scss';
import { ToastContainer, toast } from 'react-toastify';

function Login()
{
    function checkAuthenticate() {
        const token = localStorage.getItem('token');
        if(token) {
            navigate('/admin');
        }
    }

    checkAuthenticate();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        const data = {
            email,
            password
        };

        api.login(data)
            .then((res) => {
                if(res) {
                    localStorage.setItem('token', res.data.accessToken);
                    localStorage.setItem('user', JSON.stringify(res.data.others));
                    navigate('/admin');
                }
            })
            .catch(() => {
                toast.error('Email hoặc mật khẩu không đúng.', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: 0,
                    theme: "dark",
                });
            });
    }

    return (
        <div className="login-page">
            <div className="login-wrapper">
                <div className="login-backgroud">
                </div>
                <div className="login-form">
                    <h2 className="form-title">Đăng nhập</h2>
                    <form className="form-wrapper" onSubmit={handleSubmitForm}>
                        <div className="input-box">
                            <input type="text" id="email" 
                                    value={email} 
                                    required
                                    onChange={e => setEmail(e.target.value)}
                            />
                            <label htmlFor="email" className="label-name">Email</label>
                        </div>
                        <div className="input-box">
                            <input type="password" id="password" 
                                    value={password} 
                                    required
                                    onChange={e => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className="label-name">Mật khẩu</label>
                        </div>
                        <button type="submit" className="button-submit btn btn-primary">Đăng nhập</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;