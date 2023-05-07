package com.kalibekov.diarybackend.Controllers;


import com.kalibekov.diarybackend.Models.DTO.AuthenticationRequest;
import com.kalibekov.diarybackend.Models.DTO.AuthenticationResponse;
import com.kalibekov.diarybackend.Models.DTO.RegisterRequest;
import com.kalibekov.diarybackend.Services.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserAuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request, HttpServletResponse response
    ) {
        AuthenticationResponse r = service.register(request);
        Cookie cookie = new Cookie("accessToken", r.getAccessToken());
        cookie.setMaxAge(24*60*60);
        cookie.setPath("/");
        Cookie cookie2 = new Cookie("refreshToken", r.getRefreshToken());
        cookie2.setMaxAge(24*60*60);
        cookie2.setPath("/");
        response.addCookie(cookie);
        response.addCookie(cookie2);
        return ResponseEntity.ok(r);
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request, HttpServletResponse response
    ){
        AuthenticationResponse r = service.authenticate(request);
        Cookie cookie = new Cookie("accessToken", r.getAccessToken());
        cookie.setMaxAge(24*60*60);
        cookie.setPath("/");
        Cookie cookie2 = new Cookie("refreshToken", r.getRefreshToken());
        cookie2.setMaxAge(30*24*60*60);
        cookie2.setPath("/");
        response.addCookie(cookie);
        response.addCookie(cookie2);
        return ResponseEntity.ok(r);
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);
    }


}
