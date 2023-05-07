import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { axiosInstance } from '../../Server/ServerConfig.js';
import './Task.css';

const CreateTask = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const nav = useNavigate();
    const { teamId } = useParams();

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleFileRemove = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    const create = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('teamId', teamId);
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }
        nav('/Teams/'+teamId);
        axiosInstance.post('/api/v1/teacher-control/create-task', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <div className="main-block">
            <Box className="create-team-form" sx={{ width: '500px' }} boxShadow={3}>
                <h2>Создать задание</h2>
                <form>
                    <TextField
                        label="Название задачи"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <TextField
                        label="Описание задачи"
                        multiline
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        fullWidth
                    />
                    <div>
                        <input type="file" onChange={handleFileChange} multiple />
                        {selectedFiles.length > 0 && (
                            <div className="selected-files">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="file-item">
                                        <div className="file-name">{file.name}</div>
                                        <div className="file-size">{file.size / 1000} KB</div>
                                        <div className="file-remove" onClick={() => handleFileRemove(index)}>
                                            Удалить
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <br/>
                    <Button type="submit" variant="contained" color="primary" onClick={(e) => create(e)}>
                        Создать
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default CreateTask;
