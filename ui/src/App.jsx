import './App.css'
import {Route, Routes} from 'react-router-dom';
import LoginPage from "./Components/RegisterPage/LoginPage.jsx";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import {useEffect, useState} from "react";
import {axiosInstance} from "./Components/Server/ServerConfig.js";
import Profile from "./Components/Profile/Profile.jsx";
import MainPage from "./Components/Main";
import NavBar from "./Components/NavBar/NavBar.jsx";
import TeamsPage from "./Components/Teams/TeamsListPage.jsx";
import TaskAssignment from "./Components/Teams/TeamTasks/TaskAssignment.jsx";
import CreateTeamPage from "./Components/Teams/CreateTeam/CreateTeamPage.jsx";
import CreateTask from "./Components/Teams/TeamTasks/CreateTask.jsx";
import FileDownloadButton from "./Components/test";
import TeamList from "./Components/StudentPage/StudentTeamsPage";
import StudentTeamListPage from "./Components/StudentPage/StudentTeamsPage";
import StudentTaskInfo from "./Components/StudentPage/StudentTaskInfo.jsx";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [role, setRole] = useState("");
    const [user, setUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        role: '',
    });

    useEffect(() => {
        axiosInstance.get("/api/v1/users/giveMe").then((r) => {
            if (r.status === 200) {
                setAuthenticated(true);
                setUser(r.data);

                setRole(r.data.role);
            } else if (r.status === 401) console.log(r.status);
        });
    }, []);

    const AuthenticateRoutes = [
        <Route key={1} element={<LoginPage/>} path={'*'}/>,
        <Route key={2} element={<RegisterPage/>} path={'/register'}/>
    ]

    const teacherRoutes = [
        <Route key={1} element={<Profile user={user} />} path={"/profile"} />,
        <Route key={2} element={<MainPage user={user}/>} path={"/"} />,
        <Route key={3} element={<TeamsPage user={user} />} path={"/teams/:teamId"} />,
        <Route key={4} element={<TaskAssignment />} path={"/task/:task_id/:teamId"} />,
        <Route key={5} element={<CreateTeamPage />} path={"/create-team"} />,
        <Route key={6} element={<CreateTask />} path={"/create-task/:teamId"} />,
        <Route key={7} element={<FileDownloadButton />} path={"/test"} />,
    ];

    const studentRoutes = [
        <Route key={1} element={<Profile user={user} />} path={"/profile"} />,
        <Route key={4} element={<StudentTaskInfo user={user} />} path={"/task/:task_id/:teamId"} />,
        <Route key={2} element={<MainPage user={user} />} path={"/"} />,
        <Route key={2} element={<StudentTeamListPage user={user} />} path={"/teams/:teamId"} />,
    ];

    const routes =
        role === "TEACHER" ? (
            <Routes>{teacherRoutes}</Routes>
        ) : (
            <Routes>{studentRoutes}</Routes>
        );

    return (
        <div>
            {authenticated && <NavBar />}
            <br/><br/><br/><br/>
            {authenticated ?  routes  : <Routes>{AuthenticateRoutes}</Routes> }
        </div>
    );
}
export default App;