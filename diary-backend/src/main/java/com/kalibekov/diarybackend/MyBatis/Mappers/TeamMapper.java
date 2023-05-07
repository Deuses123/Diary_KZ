package com.kalibekov.diarybackend.MyBatis.Mappers;

import com.kalibekov.diarybackend.Models.Study.Task;
import com.kalibekov.diarybackend.Models.Study.Team;
import com.kalibekov.diarybackend.Models.User.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TeamMapper {
    @Select("SELECT * from team WHERE id=#{teamId}")
    Team findTeam(int teamId);

    @Select("SELECT u.id, firstname, lastname, email, password, birth_date, gender, address, phone_number, role " +
            "FROM _user u " +
            "LEFT JOIN student_team st ON u.id = st.student_id " +
            "WHERE st.team_id = #{teamId}")
    List<User> getUsersByTeamId(@Param("teamId") int teamId);
}
