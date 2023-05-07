import {useEffect, useState} from 'react';
import {axiosInstance} from "../../Server/ServerConfig.js";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

const AddStudentModelPage = ({team, setStudentAddBool}) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/v1/teacher-control/get-all-students').then(
            r => {
                setStudents(r.data);
            }
        );
    }, []);

    const addStudent = (student) => {
        axiosInstance.get(`/api/v1/teacher-control/add-student-for-team?teamId=${team.id}&studentId=${student.id}`).then(
            r => {r.status===200 ? setStudentAddBool(false) : alert('Ошибка')}
        );
    }

    return (
        <div style={{width: '550px', height: '600px', backgroundColor: 'white'}}>
            <br/>
            <b style={{marginLeft: '30px'}}>Запрос на добавление участников в команду</b>
            <br/>
            <br/>
            {

                students.map( student =>
                    <div key={student.id} style={{borderRadius: '30px',backgroundColor: '#f8f4f4', marginBottom: '10px',padding: "20px", marginLeft: '1px'}}>{student.firstname} {student.lastname}
                        <Button sx={{float: 'right'}} onClick={() => addStudent(student)}>Добавить</Button>
                    </div>
                )
            }
        </div>
    );
};
AddStudentModelPage.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        role: PropTypes.string
    }),
    team: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        owner_id: PropTypes.number,
    }),
    setStudentAddBool: PropTypes.func
};

export default AddStudentModelPage;
