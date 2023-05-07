package com.kalibekov.diarybackend.Controllers;

import com.kalibekov.diarybackend.Models.Study.Task;
import com.kalibekov.diarybackend.Models.Study.TaskAssignment;
import com.kalibekov.diarybackend.Models.Study.Team;
import com.kalibekov.diarybackend.Models.User.User;
import com.kalibekov.diarybackend.MyBatis.Mappers.TeacherTeamsMapper;
import com.kalibekov.diarybackend.Services.FileService;
import com.kalibekov.diarybackend.Services.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/teacher-control")
public class TeacherController {
    private final TeacherService teacherService;
    private final TeacherTeamsMapper mapper;
    private final FileService fileService;

    @PostMapping("/create-team")
    public ResponseEntity<?> createTeam(@RequestBody Team team, Authentication authentication){
        return teacherService.createTeam(authentication, team);
    }

    @PostMapping("/create-task")
    public void createTask(@RequestParam(value = "files", required = false) MultipartFile[] files, @RequestParam String name, @RequestParam String description, @RequestParam long teamId, Authentication authentication){
        Task task = new Task();
        task.setDescription(description);
        task.setName(name);
        task.setTeam_id(teamId);
        if(files!=null) {
            teacherService.createTask(task, fileService.uploadFile(authentication, files), authentication);
        }

        else {
            teacherService.createTask(task, new String[0],authentication);
        }

    }

    @GetMapping("/get-all-tasks")
    public List<Task> getTasks(Authentication authentication, @RequestParam long teamId){
        return teacherService.getAllTasks(authentication, teamId);
    }
    @GetMapping("/get-task-by-id")
    public Task getTask(Authentication authentication, @RequestParam int taskId){
        Task task = teacherService.getTask(authentication, taskId);
        return task;
    }
    @GetMapping("/set-student-score")
    public void setStudentScore(Authentication authentication, @RequestParam int user_id, @RequestParam int task_id, @RequestParam int score){
        teacherService.setScore(authentication, score, user_id, task_id);
    }
    @GetMapping("/get-task-assignments")
    public List<TaskAssignment> getAssignments(@RequestParam int taskId,@RequestParam int teamId , Authentication authentication){
        return teacherService.getAllTaskAssignments(taskId, teamId, authentication);
    }
    @GetMapping("/get-students-by-teamId")
    public List<User> getStudents(@RequestParam Integer teamId){
        return teacherService.getUsersByTeamId(teamId);
    }
    @GetMapping("/get-all-students")
    public List<User> getAllStudents(){
        return mapper.findAllStudents("STUDENT");
    }

    @GetMapping("/add-student-for-team")
    public ResponseEntity<?> addStudentForTeam(@RequestParam Integer teamId, @RequestParam Integer studentId, Authentication authentication){
        return teacherService.addStudentForTeam(teamId, studentId, authentication);
    }

    @GetMapping("/getTeamsByOwnerId")
    public ResponseEntity<?> getTeamsByOwnerId(Authentication authentication){
        return teacherService.getTeamsByOwnerId(authentication);
    }


}
