package com.kalibekov.diarybackend.Services;

import com.kalibekov.diarybackend.Models.Study.Task;
import com.kalibekov.diarybackend.Models.Study.TaskAssignment;
import com.kalibekov.diarybackend.Models.Study.Team;
import com.kalibekov.diarybackend.Models.User.Role;
import com.kalibekov.diarybackend.Models.User.User;
import com.kalibekov.diarybackend.MyBatis.Mappers.TaskMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.TeacherTeamsMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.TeamMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final TeacherTeamsMapper teamMapper;
    private final TaskMapper taskMapper;
    private final UserMapper userMapper;
    private final TeamMapper mapper;
    private final FileService fileService;

    public List<Task> getAllTasks(Authentication authentication, long teamId) {
        User user = userMapper.findByEmail(authentication.getName()).get();
        Team team = teamMapper.findTeamById((int) teamId);

        if(user.getId().equals(team.getOwner_id())){
            return teamMapper.getAllTasks(teamId);
        }
        return new ArrayList<>();
    }

    public Task getTask(Authentication authentication, int taskId){
        return taskMapper.getTaskById(taskId);
    }
    public void createTask(Task task, String[] files, Authentication authentication){
        User user = userMapper.findByEmail(authentication.getName()).get();
        Team team = teamMapper.findTeamById(task.getTeam_id().intValue());

        if(team.getOwner_id().equals(user.getId())){
            taskMapper.insert(task, files);
            task = taskMapper.getTaskByName(task.getName());
            if(task.getTask_id()!=0) {
                for (int i : team.getStudent_ids()) {
                    taskMapper.insertAssignment(i, team.getId(), task.getTask_id(), 0);
                }
            }
        }
    }

    public List<TaskAssignment> getAllTaskAssignments(int task_id, int teamId,Authentication authentication){
        User user = userMapper.findByEmail(authentication.getName()).get();
        Team team = teamMapper.findTeamById(teamId);

        if(user.getId().equals(team.getOwner_id())){
            return taskMapper.getTaskAssignments((long) task_id);
        }
        return new ArrayList<>();
    }
    public void setScore(Authentication authentication, int score, int user_id, int task_id){
        User user = userMapper.findByEmail(authentication.getName()).get();
        Task task = taskMapper.getTaskById(task_id);
        Team team = teamMapper.findTeamById(task.getTeam_id().intValue());

        if(user.getId().equals(team.getOwner_id())) {
            taskMapper.setScore(task_id, user_id, score);
        }
    }
    public ResponseEntity<?> createTeam(Authentication authentication, Team team){
        User user = userMapper.findByEmail(authentication.getName()).get();
        team.setOwner_id(user.getId());
        teamMapper.createTeam(team);
        return ResponseEntity.ok("Success");
    }

    public ResponseEntity<?> getTeamsByOwnerId(Authentication authentication){
        User user = userMapper.findByEmail(authentication.getName()).get();
        return ResponseEntity.ok(teamMapper.findAllTeamById(user.getId()));
    }

    public List<User> getUsersByTeamId(Integer teamId){
        return mapper.getUsersByTeamId(teamId);
    }

    public ResponseEntity<?> addStudentForTeam(Integer teamId, Integer student_id, Authentication authentication){
        Team team = teamMapper.findTeamById(teamId);
        User user = userMapper.findByEmail(authentication.getName()).get();
        if(team.getOwner_id().equals(user.getId()) && !team.getStudent_ids().contains(student_id)){
            teamMapper.addStudentForTeam(student_id, teamId);
        }
        return ResponseEntity.ok("Success");
    }
}
