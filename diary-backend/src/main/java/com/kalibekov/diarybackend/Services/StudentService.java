package com.kalibekov.diarybackend.Services;

import com.kalibekov.diarybackend.Models.Study.Task;
import com.kalibekov.diarybackend.Models.Study.TaskAssignment;
import com.kalibekov.diarybackend.Models.Study.Team;
import com.kalibekov.diarybackend.Models.User.User;
import com.kalibekov.diarybackend.MyBatis.Mappers.StudentTeamsMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.TaskMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.TeamMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final UserMapper userMapper;
    private final StudentTeamsMapper studentTeamsMapper;
    private final TeamMapper teamMapper;
    private final TaskMapper taskMapper;
    public List<User> getUsersByTeamId(Integer teamId){
        return teamMapper.getUsersByTeamId(teamId);
    }

    public void setAnswer(String[] files, TaskAssignment taskAssignment,int task_id, Authentication authentication){
        User user = userMapper.findByEmail(authentication.getName()).get();
        studentTeamsMapper.updateAssignment(taskAssignment, files, user.getId(), task_id);
    }

    public Task getTaskById(int taskId){
        return taskMapper.getTaskById(taskId);
    }
    public ResponseEntity<?> findAllTeams(Authentication authentication){
        User user = userMapper.findByEmail(authentication.getName()).get();

        return ResponseEntity.ok(studentTeamsMapper.findAllTeams(user.getId()));
    }
    public List<Task> findAllTasks(Authentication authentication, int teamId){
        User user = userMapper.findByEmail(authentication.getName()).get();
        return studentTeamsMapper.findAllTeamTasks(teamId, user.getId());
    }
    public TaskAssignment findAssignments(Authentication authentication, int taskId, int teamId){
        User user = userMapper.findByEmail(authentication.getName()).get();
        return studentTeamsMapper.findTaskAssignment(user.getId(), teamId, taskId);
    }
}
