package com.kalibekov.diarybackend;

import com.kalibekov.diarybackend.Controllers.UserAuthenticationController;
import com.kalibekov.diarybackend.Models.DTO.AuthenticationResponse;
import com.kalibekov.diarybackend.Models.DTO.RegisterRequest;
import com.kalibekov.diarybackend.Services.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static org.mockito.Mockito.*;

public class UserAuthenticationControllerTest {

    private UserAuthenticationController userAuthenticationController;
    private AuthenticationService authenticationService;
    private HttpServletResponse httpServletResponse;

    @BeforeMethod
    public void setUp() {
        authenticationService = mock(AuthenticationService.class);
        httpServletResponse = mock(HttpServletResponse.class);
        userAuthenticationController = new UserAuthenticationController(authenticationService);
    }

    @Test
    public void testRegister() {
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail("example@example.com");
        registerRequest.setPassword("password");

        AuthenticationResponse expectedResponse = new AuthenticationResponse();
        expectedResponse.setAccessToken("access_token");
        expectedResponse.setRefreshToken("refresh_token");

        when(authenticationService.register(registerRequest)).thenReturn(expectedResponse);

        ResponseEntity<AuthenticationResponse> responseEntity = userAuthenticationController.register(registerRequest, httpServletResponse);

        verify(authenticationService).register(registerRequest);

        Assert.assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);

        AuthenticationResponse actualResponse = responseEntity.getBody();

        Assert.assertNotNull(actualResponse);
        Assert.assertEquals(actualResponse.getAccessToken(), expectedResponse.getAccessToken());
        Assert.assertEquals(actualResponse.getRefreshToken(), expectedResponse.getRefreshToken());

        verify(httpServletResponse, times(2)).addCookie(any(Cookie.class));
    }
}
