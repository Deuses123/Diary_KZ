package com.kalibekov.diarybackend.MyBatis.Mappers;

import com.kalibekov.diarybackend.Models.Study.Task;
import com.kalibekov.diarybackend.Models.Study.Team;
import com.kalibekov.diarybackend.Models.User.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TeacherTeamsMapper {
    @Insert("INSERT INTO Team (name, owner_id) VALUES (#{name}, #{owner_id})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void createTeam(Team team);

    @Select("SELECT * FROM tasks where team_id = #{id}")
    List<Task> getAllTasks(long id);
    @Select("SELECT t.id, t.owner_id, t.name, ARRAY_AGG(st.student_id) as student_ids " +
            "FROM team t " +
            "LEFT JOIN student_team st ON t.id = st.team_id " +
            "WHERE t.id = #{teamId} " +
            "GROUP BY t.id, t.owner_id, t.name")
    Team findTeamById(Integer teamId);

    @Insert("INSERT INTO student_team (student_id, team_id) VALUES (#{studentId}, #{teamId})")
    void addStudentForTeam(@Param("studentId") Integer studentId, @Param("teamId") Integer teamId);

    @Select("SELECT * FROM _user where _user.role=#{role}")
    List<User> findAllStudents(String role);

    @Select("SELECT t.id, t.name, t.owner_id, array_agg(st.student_id) AS student_ids " +
            "FROM team t " +
            "LEFT JOIN student_team st ON t.id = st.team_id " +
            "WHERE t.owner_id = #{ownerId} " +
            "GROUP BY t.id, t.name, t.owner_id")
    List<Team> findAllTeamById(Integer ownerId);
}
