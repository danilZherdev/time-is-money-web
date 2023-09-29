import './style.css';
import { useState, useEffect } from 'react';
import WorkStationtAPI from '../../api/WorkStationAPI';
import ISearchedWorkStationResponse from '../../models/response/ISearchedWorkStationResponse';

interface IPluginTablePropsTypes {
    plugins: ISearchedWorkStationResponse[];
    handleNeedRequest: Function;
}

const PluginTable = (props: IPluginTablePropsTypes) => {
    const [renderPlugins, setRenderPlugins] = useState<ISearchedWorkStationResponse[]>([]);
    const { plugins, handleNeedRequest } = props;

    const createImg = (id: number, data: string) => {
        const blob = new Blob([data], {
            type: "image/png"
        });
        const fileName = `${id}QR-code.png`;
        const reportUrl = window.URL.createObjectURL(blob);
        const downloadElement = document.createElement("a");
        downloadElement.href = reportUrl;
        downloadElement.download = fileName;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(reportUrl);
    }

    const sendReqQR = (id: number) => {
        WorkStationtAPI.getQRCode(id)
            .then(response => {
                createImg(id, response.data);
            })
            .catch(error => console.log(error))
    }

    const handleDownloadQR = (id: number) => {
        sendReqQR(id);
    }

    const updateWorkStation = (id: number) => {
        WorkStationtAPI.prolongation(id)
            .then(response => handleNeedRequest())
            .catch(error => console.log(error))
    }

    const handleProlongation = (id: number) => {
        updateWorkStation(id);
    }

    useEffect(() => {
        console.log(plugins);
        setRenderPlugins(plugins);
    }, [plugins]);

    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>имя плагина</th>
                        <th>изготовлено документов</th>
                        <th>заполнено приложений</th>
                        <th>плагин ID</th>
                        <th>QR-code</th>
                        <th>действителен до:</th>
                        <th>продлить</th>
                    </tr>
                </thead>
                <tbody>
                    {renderPlugins.length > 0
                        ? (renderPlugins.map((plugin, index) =>
                            <tr key={plugin.name + index + plugin.urlQRCode}>
                                <td key={plugin.name + plugin.urlQRCode + index}>{plugin.name}</td>
                                <td key={plugin.urlQRCode + plugin.name + index}>{plugin.producedDocuments}</td>
                                <td key={plugin.name}>{plugin.filledApplications}</td>
                                <td key={plugin.name + plugin.id}>{plugin.id}</td>
                                <td key={plugin.name + 'a1'}>
                                    <a
                                        key={plugin.name + 'b1'}
                                        onClick={() => handleDownloadQR(plugin.id)}
                                    >
                                        СКАЧАТЬ
                                    </a>
                                </td>
                                <td key={plugin.name + 'c1'}>
                                    {(new Date(plugin.expiredAt)).toLocaleDateString()}
                                </td>
                                <td key={plugin.name + 'd1'}>
                                    <a 
                                        key={plugin.name + plugin.urlQRCode}
                                        onClick={() => handleProlongation(plugin.id)}
                                    >
                                        ПРОДЛИТЬ
                                    </a>
                                </td>
                            </tr>
                        ))
                        : (<tr>
                            <td 
                                colSpan={7} 
                                style={{ width: '100%', border: 'none', columnSpan: 'all', textAlign: 'center' }}
                            >
                                Ничего не найдено...
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PluginTable;
