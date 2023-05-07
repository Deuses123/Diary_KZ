package com.kalibekov.diarybackend;

import com.kalibekov.diarybackend.Models.Study.Team;
import com.kalibekov.diarybackend.Models.User.User;
import com.kalibekov.diarybackend.MyBatis.Mappers.StudentTeamsMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.UserMapper;
import com.kalibekov.diarybackend.Services.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.*;
import static org.skyscreamer.jsonassert.JSONAssert.assertEquals;

@SpringBootTest
class DiaryBackendApplicationTests {

	@Mock
	private UserMapper userMapper;
	@InjectMocks
	private StudentService studentService;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}
	private TestRestTemplate restTemplate;
	@Mock
	private StudentTeamsMapper teamMapper;

	
	@Test
	public void testFindAllTeams() {
		User user = new User();
		user.setId(1);

		when(userMapper.findByEmail(eq("test@example.com"))).thenReturn(Optional.of(user));

		List<Team> expectedTeams = new ArrayList<>();
		// Populate the expectedTeams list with sample teams

		when(teamMapper.findAllTeams(eq(1))).thenReturn(expectedTeams);

		Authentication authentication = new UsernamePasswordAuthenticationToken("test@example.com", null);
		ResponseEntity<?> response = studentService.findAllTeams(authentication);

		assertSame(HttpStatus.OK, response.getStatusCode());
		assertEquals(expectedTeams, (List<Team>) response.getBody()); // Type cast to List<Team>

		verify(userMapper, times(1)).findByEmail(eq("test@example.com"));
		verify(teamMapper, times(1)).findAllTeams(eq(1));
	}

	private void assertEquals(List<Team> expectedTeams, List<Team> body) {
	}


}