import './style.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Star from '../../../assets/imgTimeIsMoney/Star.svg';
import queue from '../../../assets/imgTimeIsMoney/queue.svg';
import Phone from '../../../assets/imgTimeIsMoney/Phone.svg';
import stroke from '../../../assets/imgTimeIsMoney/stroke.svg';
import laptop from '../../../assets/imgTimeIsMoney/laptop.svg';

interface MainPagePropsTypes {
    handleCurrentBtnChange: Function;
    handleRedirectPageMounted: Function;
}

const MainPage = (props: MainPagePropsTypes) => {
    const { handleCurrentBtnChange, handleRedirectPageMounted } = props;
    const navigate = useNavigate();
    const toApplication = () => navigate('/application');
    const toPluginPage = () => navigate('/PluginPage');
    const toLogin = () => navigate('/login');

    useEffect(() => {
        handleCurrentBtnChange('Главная');
        handleRedirectPageMounted(true);
    }, []);

    return (
        <div className='containerMain'>
            <div className="container-block1">
                <div className="container-Text">
                    <h5>TиМ</h5>
                    <p>
                        НОВАЯ ВЕХА
                        <br />
                        В ТАЙМ-МЕНЕДЖМЕНТЕ
                    </p>
                </div>
                <div className="documents">
                    <img src={queue} className="queue" />
                    <div className='container-Text2'>
                        <p>
                            Рост документооборота в компаниях вынуждает их содержать<br/>
                            низкоквалифицированный персонал, который занимается<br/>
                            рутинной работой по заполнению однотипных бланков,<br/>
                            внося туда персональные данные своих клиентов.<br/>
                            Клиенты тратят свое время и свои нервы на заполнение<br/>
                            всевозможных бланков и документов, простаивая в очередях.<br/>
                            ТиМ универсальное средство для решения этих проблем.<br/>
                            Экономим время, экономим деньги!
                        </p>
                    </div>
                </div>
            </div>
            <div className="container-block2">
                <div className="block-info">
                    <p>Наш продукт состоит из:</p>
                    <div className="block2-text1">
                        <div>
                            <h1>1</h1>
                            <img src={stroke} className="img1" />
                        </div>
                        <div>
                            <p>
                                <span onClick={toApplication}>Мобильного приложения,</span> где пользователи хранят
                                свои персональные данные и другую значимую
                                информацию;
                            </p>
                        </div>
                    </div>
                    <div className="block2-text1">
                        <div>
                            <h1>2</h1>
                            <img src={stroke} className="img1" />
                        </div>
                        <div>
                            <p>
                                <span onClick={toPluginPage}>Плагина</span> для текстового редактора, с помощью
                                которого операторы готовят шаблоны документов.
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={Phone} className="img3" />
                </div>
            </div>
            <div className="container-block3">
                <div className="container-block3-info">
                    <div className="container-block3-info1">
                        <div className="info1-text1">
                            <img src={Star} />
                            <p>
                                Через QR-код, выпускаемый под каждый
                                плагин, происходит коннект между ними
                                и данные клиента за считанные секунды,
                                попадают в шаблон документа.
                            </p>
                        </div>
                    </div>
                    <div className="container-block3-info1">
                        <div className="info1-text1">
                            <img src={Star} />
                            <p>
                                После регистрации на нашем сайте, в
                                <span onClick={toLogin}> личном кабинете</span>, вам будет доступно
                                большое количество готовых шаблонов,
                                которые вы сможете сами заполнить в
                                один клик.
                            </p>
                        </div>
                    </div>
                </div>
                <img src={laptop} className="img5" />
            </div>
        </div>
    )
}

export default MainPage;
