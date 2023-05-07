import React from 'react';
import axios from 'axios';
import {axiosInstance} from "./Server/ServerConfig.js";

const FileDownloadButton = () => {
    const handleDownload = async () => {
        try {
            const response = await axiosInstance.get('/download/a.docx', {
                responseType: 'blob', // Указываем тип ответа как blob
            });

            // Создание ссылки для скачивания файла
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
            downloadLink.setAttribute('download', 'myfile.docx'); // Замените имя файла на желаемое имя

            // Эмуляция нажатия на ссылку для скачивания
            downloadLink.click();
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
        }
    };

    return (
        <button onClick={handleDownload}>
            Скачать файл
        </button>
    );
};

export default FileDownloadButton;
