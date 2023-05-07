package com.kalibekov.diarybackend.Controllers;

import com.kalibekov.diarybackend.Models.Study.Team;
import com.kalibekov.diarybackend.Models.User.User;
import com.kalibekov.diarybackend.MyBatis.Mappers.StudentTeamsMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.TeamMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class TestController {
    private final TeamMapper teamMapper;
    private final UserMapper userMapper;
    private final StudentTeamsMapper studentTeamsMapper;

    @GetMapping("/check")
    public ResponseEntity<?> check(){
        return ResponseEntity.ok("");
    }




}
