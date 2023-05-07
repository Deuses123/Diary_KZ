import {useState} from 'react';
import Typography from "@mui/material/Typography";
import style from './TeamMembers.module.scss';
import {Dialog, DialogContent} from "@mui/material";
import TempProfile from "./TempProfile.jsx";
import Button from "@mui/material/Button";
import AddStudentModelPage from "./AddStudentModelPage.jsx";
import PropTypes from "prop-types";


const TeamMembers = ({ user, studentsList, team}) => {
    const [profileState, setProfileState] = useState(false);
    const [current, setCurrent] = useState({});
    const [studentAddBool, setStudentAddBool] = useState(false);


    return (
        <div>
            <br/>
            <Dialog open={studentAddBool}
                    fullWidth  onClose={() => setStudentAddBool(false)}>
                <DialogContent sx={{backgroundColor: '#e1dede'}}>
                    <AddStudentModelPage setStudentAddBool={setStudentAddBool} team={team} user={user}/>
                </DialogContent>
            </Dialog>
            <Button sx={{
                float: 'right'
            }} variant='contained' onClick={() => setStudentAddBool(true)} >Добавить ученика</Button>
            <br/>
            <br/>
            <br/>
            <b style={{marginLeft: '30px'}}>Владелец группы</b>
            <div className={style.ownerBlock}>
                <Typography sx={{marginLeft: '10px', paddingTop: '10px'}}>{user.firstname} {user.lastname}</Typography>
            </div>

            <div >
                <br/>
                <b style={{marginLeft: '30px'}}>Участники группы</b>

                {
                    studentsList.map(student =>
                        <div className={style.ownerBlock} key={student.id}>
                            <Typography onClick = { () => { setProfileState(true); setCurrent(student) }} sx={{marginLeft: '10px', paddingTop: '10px'}}>{student.firstname} {student.lastname}</Typography>
                        </div>
                    )
                }
                <Dialog open={profileState}
                        fullWidth  onClose={() => setProfileState(false)}>
                    <DialogContent sx={{backgroundColor: '#e1dede'}}>
                        <TempProfile user={current}/>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
};
TeamMembers.propTypes = {
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
    studentsList: PropTypes.array,
};


export default TeamMembers;
