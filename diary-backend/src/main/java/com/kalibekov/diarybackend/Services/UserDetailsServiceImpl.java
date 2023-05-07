package com.kalibekov.diarybackend.Services;

import com.kalibekov.diarybackend.Models.DTO.UserDTO;
import com.kalibekov.diarybackend.Models.User.User;
import com.kalibekov.diarybackend.MyBatis.Mappers.UserMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserMapper userRepository;

    public UserDetailsServiceImpl(UserMapper userRepository) {
        this.userRepository = userRepository;
    }

    public void userUpdate(UserDTO user, Authentication authentication) {
        User currentUser = userRepository.findByEmail(authentication.getName()).get();
        if(user.getName() != null && !Objects.equals(user.getName(), "")) currentUser.setFirstname(user.getName());
        if(user.getPhone() != null && !Objects.equals(user.getPhone(), "")) currentUser.setPhone_number(user.getPhone());
        if(user.getGender() != ' ') currentUser.setGender(user.getGender());
        if(user.getLastname() != null && !Objects.equals(user.getLastname(), "")) currentUser.setLastname(user.getLastname());
        if(user.getAddress() != null && !Objects.equals(user.getAddress(), "")) currentUser.setAddress(user.getAddress());
        if(user.getBirth_date() != null) currentUser.setBirth_date(user.getBirth_date());

        userRepository.updateUser(currentUser);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getAuthorities()
        );
    }
}
