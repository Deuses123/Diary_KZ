package com.kalibekov.diarybackend.MyBatis.Mappers;

import com.kalibekov.diarybackend.Models.User.User;
import org.apache.ibatis.annotations.*;

import java.util.Optional;

@Mapper
public interface UserMapper {
    @Insert("INSERT INTO _user (email, password, role) " +
            "VALUES (#{user.email},  #{user.password}, #{user.role})")
    void insertUser(@Param("user") User user);

    @Update("UPDATE _user " +
            "SET firstname = #{updateDto.firstname}, " +
            "lastname = #{updateDto.lastname}, " +
            "birth_date = #{updateDto.birth_date}, " +
            "gender = #{updateDto.gender}, " +
            "address = #{updateDto.address}, " +
            "phone_number = #{updateDto.phone_number} " +
            "WHERE id = #{updateDto.id}")
    void updateUser(@Param("updateDto") User updateDto);
    @Select("SELECT * FROM _user WHERE email = #{email}")
    Optional<User> findByEmail(@Param("email") String email);

    @Select("SELECT * FROM _user WHERE id = #{id}")
    Optional<User> findById(@Param("id") int id);


}
