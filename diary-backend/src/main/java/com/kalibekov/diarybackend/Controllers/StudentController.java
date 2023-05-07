package com.kalibekov.diarybackend.Controllers;

import com.kalibekov.diarybackend.Models.Study.Task;
import com.kalibekov.diarybackend.Models.Study.TaskAssignment;
import com.kalibekov.diarybackend.Models.User.User;
import com.kalibekov.diarybackend.MyBatis.Mappers.TeamMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.UserMapper;
import com.kalibekov.diarybackend.Services.FileService;
import com.kalibekov.diarybackend.Services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/student-control")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;
    private final FileService fileService;
    private final UserMapper userMapper;
    @GetMapping("/find-all-team-students")
    public List<User> getAllStudents(@RequestParam int teamId){
        return studentService.getUsersByTeamId(teamId);
    }
    @GetMapping("/find-task-by-id")
    public Task getTask(@RequestParam int taskId){
        return studentService.getTaskById(taskId);
    }
    @GetMapping("/get-task-result")
    public TaskAssignment getTaskResult(Authentication authentication, @RequestParam int taskId, @RequestParam int teamId){
        return studentService.findAssignments(authentication, taskId, teamId);
    }


    @PostMapping("/get-answer")
    public void createTask(@RequestParam(value = "files", required = false) MultipartFile[] files,
                           @RequestParam String answer, @RequestParam int teamId,
                           @RequestParam int task_id, Authentication authentication){
        User user = userMapper.findByEmail(authentication.getName()).get();
        TaskAssignment assignment = new TaskAssignment();
        assignment.setTaskId(task_id);
        assignment.setUserId(user.getId());
        assignment.setAnswer(answer);
        assignment.setStatus(true);
        assignment.setTeamId(teamId);
        if(files!=null) {
            studentService.setAnswer(fileService.uploadFile(authentication, files), assignment, task_id, authentication);
        }
        else{
            studentService.setAnswer(new String[0], assignment, task_id, authentication);
        }
    }

    @GetMapping("/findAllStudentTeams")
    public ResponseEntity<?> findAllTeams(Authentication authentication){
        return studentService.findAllTeams(authentication);
    }
    @GetMapping("/find-all-team-tasks")
    public List<Task> findAllStudentTeamTasks(Authentication authentication, @RequestParam int team_id){
        return studentService.findAllTasks(authentication, team_id);
    }
}
