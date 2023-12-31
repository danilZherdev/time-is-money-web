import './style.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/imgTimeIsMoney/logo.svg';
import burger from '../../../assets/imgTimeIsMoney/hamburger.svg';
import crossBurgerMenu from '../../../assets/imgTimeIsMoney/crossBurgerMenu.svg';

interface HeaderPropsTypes {
    handleIsOpenFooter: Function;
    currentBtnProp?: string;
}

const Header = (props: HeaderPropsTypes) => {
    const { handleIsOpenFooter, currentBtnProp } = props;
    const [menuActive, setMenuActive] = useState<boolean>(false);
    const [currentBtn, setCurrentBtn] = useState<string>('Главная'); 

    const navigate = useNavigate();

    const toMain = () => {
        handleIsOpenFooter()
        if (menuActive) setMenuActive(false)
        navigate('/');
    }
    const toApplication = () => {
        handleIsOpenFooter()
        if (menuActive) setMenuActive(false)
        navigate('/Application');
    }
    const toPlagin = () => {
        handleIsOpenFooter()
        if (menuActive) setMenuActive(false)
        navigate('/PluginPage');
    }
    const toInvestors = () => {
        handleIsOpenFooter()
        if (menuActive) setMenuActive(false)
        navigate('/investors');
    }
    const toLogin = () => {
        handleIsOpenFooter()
        if (menuActive) setMenuActive(false)
        navigate('/login');
        localStorage.clear();
    }

    useEffect(() => {
        if (currentBtnProp) {
            setCurrentBtn(currentBtnProp);
        }
    }, [currentBtnProp]);

    return (
        <div className="container-header">
            {menuActive
                ? (<div className="modalBurger">
                    <img 
                        className="header-burger" 
                        src={logo} 
                        style={{left: '0px'}}
                    />
                    <img 
                        className="header-burger" 
                        src={crossBurgerMenu} 
                        onClick={() => setMenuActive(false)}
                        style={{left: '180px', top: '-50px'}} 
                    />
                    <div className="menuBurger">
                        <button 
                            onClick={toMain}
                            style={currentBtn === 'Главная'
                                ? {color: '#00B2F4'}
                                : {color: 'rgba(0, 0, 0, 1)'}
                            }
                        >
                            ГЛАВНАЯ
                        </button>
                        <button 
                            onClick={toApplication}
                            style={currentBtn === 'Приложение'
                                ? {color: '#00B2F4'}
                                : {color: 'rgba(0, 0, 0, 1)'}  
                            }
                        >
                            ПРИЛОЖЕНИЕ
                        </button>
                        <button 
                            onClick={toPlagin}
                            style={currentBtn === 'Плагин'
                                ? {color: '#00B2F4'}
                                : {color: 'rgba(0, 0, 0, 1)'}  
                            }
                        >
                            ПЛАГИН
                        </button>
                        <button 
                            onClick={toInvestors}
                            style={currentBtn === 'Инвесторам'
                                ? {color: '#00B2F4'}
                                : {color: 'rgba(0, 0, 0, 1)'}
                            }
                        >
                            ИНВЕСТОРАМ
                        </button>
                        <button 
                            onClick={toLogin}
                            style={currentBtn === 'Вход'
                                ? {color: '#00B2F4'}
                                : {color: 'rgba(0, 0, 0, 1)'} 
                            }
                        >
                            ВХОД 
                        </button>
                    </div>
                </div>)
                : <img 
                    className="header-burger" 
                    src={burger} onClick={() => setMenuActive(true)} 
                />
            }
            <div className="container-img">
                <img src={logo}/>
            </div>

            <div className="button-container">
                <button 
                    onClick={toMain}
                    style={currentBtn === 'Главная'
                        ? {color: '#00B2F4'}
                        : {color: 'rgba(0, 0, 0, 1)'} 
                    }
                >
                    ГЛАВНАЯ
                </button>
                <button 
                    onClick={toApplication}
                    style={currentBtn === 'Приложение'
                        ? {color: '#00B2F4'}
                        : {color: 'rgba(0, 0, 0, 1)'} 
                    }
                >
                    ПРИЛОЖЕНИЕ
                </button>
                <button 
                    onClick={toPlagin}
                    style={currentBtn === 'Плагин'
                        ? {color: '#00B2F4'}
                        : {color: 'rgba(0, 0, 0, 1)'} 
                    }
                >
                    ПЛАГИН
                </button>
                <button 
                    onClick={toInvestors}
                    style={currentBtn === 'Инвесторам'
                        ? {color: '#00B2F4'}
                        : {color: 'rgba(0, 0, 0, 1)'} 
                    }
                >
                    ИНВЕСТОРАМ
                </button>
                <button 
                    onClick={toLogin}
                    style={currentBtn === 'Вход'
                        ? {color: '#00B2F4'}
                        : {color: 'rgba(0, 0, 0, 1)'} 
                    }
                >
                    ВХОД
                </button>
            </div>
        </div>
    )
}

export default Header;
