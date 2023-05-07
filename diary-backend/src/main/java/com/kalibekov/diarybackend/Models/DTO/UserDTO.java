package com.kalibekov.diarybackend.Models.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String name;
    private String lastname;
    private String phone;
    private String address;
    private char gender;
    private Date birth_date;
}
