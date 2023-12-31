import './style.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../modals/ErrorPopup";
import SuccessPopup from '../../modals/SuccessPopup';
import IUserAuth from "../../../models/request/IUserAuth";
import eye from '../../../assets/imgTimeIsMoney/eye-icon.png';
//import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import PhysicalAccountAPI from "../../../api/PhysicalAccountAPI";
import isEmailValid from '../../../utils/validation/isEmailValid';
import PasswordRecoveryModal from '../../modals/PasswordRecoveryModal';
//import actionsConstants from '../../../store/actions/actionConstants';
import isPasswordValid from '../../../utils/validation/isPasswordValid';
import closedEye from '../../../assets/imgTimeIsMoney/closed-eye-icon.png';
import ChooseRegistrationModal from '../../modals/ChooseRegistrationModal';
import ISuccessAuthResponse from '../../../models/response/ISuccessAuthResponse';
//import { badAuthorization, goodMove } from '../../../store/actions/notificationsActions';

const LoginForm = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isPasswordRecovery, setIsPasswordRecovery] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [isErrorPopupVisible, setIsErrorPopupVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState<boolean>(false);

    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
    const handleEyeClick = () => setIsVisiblePassword(!isVisiblePassword);

    const navigate = useNavigate();
    //const dispatch = useDispatch();

    // const isEmailValid = (email: string) => {
    //     const emailRegex = /@../;
    //     return emailRegex.test(email);
    // };

    // const isPasswordValid = (password: string) => {
    //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,}/;
    //     return passwordRegex.test(password);
    // };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value);

    const sendRequest = (user: IUserAuth) => {
        PhysicalAccountAPI.clientAutorization(user)
            .then(response => {
                localStorage.clear();
                setIsSuccessPopupVisible(true);
                const data = (response.data as ISuccessAuthResponse);
                localStorage.setItem('token', data.tokenResponse.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.tokenResponse.token}`
                if (data.entity.inn) {
                    fillOrganizationLocalStorage(data.entity);
                } else {
                    localStorage.setItem('id', String(data.entity.id));
                }
                // dispatch(goodMove({
                //     type: actionsConstants.GOOD_MOVE,
                //     payload: 'Успешно авторизованы'
                // }))
                setTimeout(() => {
                    navigate('/user');
                }, 1000);
            })
            .catch(error => {
                setErrorMessage("Ошибка авторизации");
                setIsErrorPopupVisible(true);
                // dispatch(badAuthorization({
                //     type: actionsConstants.BAD_AUTHORIZATION,
                //     payload: 'Ошибка авторизации'
                // }))
            });
    }

    const handleComeClick = () => {
        if (!isEmailValid(userEmail) || !isPasswordValid(userPassword)) {
            setErrorMessage("Некорректный email или пароль");
            setIsErrorPopupVisible(true);
        } else {
            const user = {
                email: userEmail,
                password: userPassword,
                workStationOwner: true
            }
            sendRequest(user);
        }
    };

    const fillOrganizationLocalStorage = (entity: any) => {
        localStorage.setItem('organizationName', entity.organizationName);
        localStorage.setItem('organizationAddress', entity.organizationAddress);
        localStorage.setItem('id', String(entity.userId));
        localStorage.setItem('inn', entity.inn);
        localStorage.setItem('kpp', entity.kpp);
    }

    const getPasswordRecoveryOpenStatus = () => setIsPasswordRecovery(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/user');
        }
    }, []);

    return (
        <div className='auth-container'>
            <div className="block-Login1">
                <h3 className="styleH3">ВХОД</h3>
                <div className="animateContainer">
                    <input
                        type="text"
                        id="id_email"
                        required
                        onInput={handleEmailChange}
                    />
                    <label htmlFor="id_email">e-mail</label>

                    <input
                        type={isVisiblePassword
                            ? 'text'
                            : 'password'
                        }
                        id='pass'
                        required
                        onInput={handlePasswordChange}
                    />
                    <img
                        src={isVisiblePassword
                            ? closedEye
                            : eye
                        }
                        onClick={handleEyeClick}
                    />
                    <label htmlFor="pass">пароль</label>
                </div>

                <button onClick={handleComeClick}>ВОЙТИ</button>

                <span
                    className="passwordRecovery"
                    onClick={() => setIsPasswordRecovery(true)}
                >
                    Забыли пароль?
                </span>
            </div>
            <div>
                <span
                    onClick={() => {
                        setIsVisible(!isVisible);
                    }}
                    className='reg-link'
                >
                    Нет аккаунта? Зарегистрируйтесь!
                </span>
                {isErrorPopupVisible && (
                    <ErrorPopup
                        error={errorMessage}
                        onClose={() => setIsErrorPopupVisible(false)}
                    />
                )}
                {isSuccessPopupVisible
                    ? <SuccessPopup
                        message={'Успешно авторизованы'}
                        onClose={() => setIsSuccessPopupVisible(false)}
                    />
                    : null
                }

                {isVisible
                    ? <ChooseRegistrationModal/>
                    : null
                }

                {isPasswordRecovery
                    ? <PasswordRecoveryModal setPasswordRecoveryOpenStatus={getPasswordRecoveryOpenStatus}/>
                    : null
                }

            </div>
        </div>
    );
};

export default LoginForm;
