package com.kalibekov.diarybackend.MyBatis.Mappers;

import com.kalibekov.diarybackend.Models.Study.Task;
import com.kalibekov.diarybackend.Models.Study.TaskAssignment;
import com.kalibekov.diarybackend.Models.Study.Team;
import org.apache.ibatis.annotations.*;
import org.springframework.security.core.parameters.P;

import java.util.List;

@Mapper
public interface StudentTeamsMapper {

    @Select("SELECT * FROM tasks WHERE task_id IN (SELECT task_id FROM task_assignments WHERE user_id=#{user_id} AND team_id=#{team_id})")
    List<Task> findAllTeamTasks(int team_id, int user_id);

    @Select("SELECT * from task_assignments WHERE task_id = #{task_id} AND team_id = #{teamId} AND user_id = #{user_id}")
    TaskAssignment findTaskAssignment(int user_id, int teamId, int task_id);

    @Select("SELECT t.* FROM team t INNER JOIN student_team st ON t.id = st.team_id WHERE st.student_id = #{userId}")
    List<Team> findAllTeams(@Param("userId") Integer userId);

    @Update("UPDATE task_assignments set files=#{files, jdbcType=ARRAY, typeHandler=org.apache.ibatis.type.ArrayTypeHandler}, answer=#{assignment.answer} where task_id=#{task_id} and user_id=#{user_id}")
    void updateAssignment(@Param("assignment") TaskAssignment assignment, @Param("files") String[] files, @Param("user_id") int user_id, @Param("task_id") int task_id);

}
