package com.kalibekov.diarybackend.Controllers;

import com.kalibekov.diarybackend.Models.DTO.UserDTO;
import com.kalibekov.diarybackend.Models.User.User;
import com.kalibekov.diarybackend.MyBatis.Mappers.UserMapper;
import com.kalibekov.diarybackend.Services.FileService;
import com.kalibekov.diarybackend.Services.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserMapper mapper;
    private final UserDetailsServiceImpl userDetailsService;
    private final FileService fileService;
    @PostMapping("/addInformation")
    public void updateInformation(Authentication authentication, @RequestBody UserDTO dto){
        userDetailsService.userUpdate(dto, authentication);
    }
    @GetMapping("/findUserById")
    public User findUserById(@RequestParam int id){
        return mapper.findById(id).get();
    }
    @GetMapping("/giveMe")
    public Optional<User> resUser(Authentication user){
        return mapper.findByEmail(user.getName());
    }

    @GetMapping("/download/{url}")
    public ResponseEntity<?> download(@PathVariable String url){
        return fileService.downloadFile(url);
    }
}
