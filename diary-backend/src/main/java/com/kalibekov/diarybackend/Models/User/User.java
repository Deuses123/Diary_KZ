package com.kalibekov.diarybackend.Models.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kalibekov.diarybackend.Models.Token.Token;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.Collection;
import java.util.List;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    @JsonIgnore
    private String password;
    private Date birth_date;
    private char gender;
    private String address;
    private String phone_number;
    private Role role;
    private List<Token> tokens;
    public User(String email, String password, Role role){
        this.email = email;
        this.password = password;
        this.role = (role != null) ? role : Role.STUDENT;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}