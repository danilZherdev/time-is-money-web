import './style.css';
import PluginTable from '../PluginTable';
import { useState, useEffect } from 'react';
import WorkStationtAPI from '../../../api/WorkStationAPI';
import ISearchedWorkStationResponse from '../../../models/response/ISearchedWorkStationResponse';

const CreatePluginModal = () => {
    const [name, setName] = useState<string>('');
    const [isTableVisible, setIsTableVisible] = useState<boolean>(false);
    const [plugins, setPlugins] = useState<ISearchedWorkStationResponse[]>([]);
    const [isNeedRequest, setIsNeedRequest] = useState<boolean>(true);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const handleNeedRequest = () => setIsNeedRequest(true);

    const sendReq = () => {
        setIsNeedRequest(false);
        WorkStationtAPI.create(name)
            .then(response => {
                setPlugins(response.data);
                setIsTableVisible(true);
            })
            .catch(error => {
                console.log(error);
                setIsTableVisible(false);
            })
    }

    const handleBtnClick = () => {
        if (name) {
            sendReq();
        }
        setIsTableVisible(false);
    }

    useEffect(() => {
        if (name) {
            sendReq();
        }
    }, [isNeedRequest]) 

    return (
        <div>
            <div className="plugin-modal">
                <h3>СОЗДАНИЕ ПЛАГИНА </h3>
                <p>Пожалуйста введите имя плагина или его порядковый номер:</p>
                <input
                    type="text"
                    onInput={handleNameChange}
                />
                <button onClick={handleBtnClick}>СКАЧАТЬ</button>
            </div>
            {isTableVisible
                ? <PluginTable plugins={plugins} handleNeedRequest={handleNeedRequest}/>
                : null
            }
        </div>
    )
}

export default CreatePluginModal;