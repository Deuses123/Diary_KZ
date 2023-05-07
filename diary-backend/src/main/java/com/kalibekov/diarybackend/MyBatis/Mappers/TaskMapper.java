package com.kalibekov.diarybackend.MyBatis.Mappers;

import com.kalibekov.diarybackend.Models.Study.Task;
import com.kalibekov.diarybackend.Models.Study.TaskAssignment;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TaskMapper {

    @Insert("INSERT INTO tasks (name, description, team_id, files) VALUES (#{task.name}, #{task.description}, #{task.team_id}, #{files, jdbcType=ARRAY, typeHandler=org.apache.ibatis.type.ArrayTypeHandler})")
    void insert( Task task, String[] files);

    @Select("SELECT * FROM tasks where name = #{name}")
    Task getTaskByName(String name);

    @Select("SELECT * FROM tasks WHERE team_id=#{id}")
    List<Task> findALlTeamTasks(int id);

    @Select("SELECT * FROM tasks where task_id = #{id}")
    Task getTaskById(int id);


    @Insert("INSERT INTO task_assignments (user_id, team_id, task_id, score) VALUES (#{userId}, #{teamId}, #{taskId}, #{score})")
    void insertAssignment(int userId, int teamId, int taskId, int score);

    @Update("UPDATE task_assignments set score = #{score}, status=false where (task_id = #{task_id} and user_id=#{user_id})")
    void setScore(int task_id, int user_id, int score);

    @Select("SELECT ta.*, u.firstname, u.lastname " +
            "FROM task_assignments ta " +
            "         JOIN _user u ON ta.user_id = u.id " +
            "WHERE ta.task_id = #{taskId}")
    @Results({
            @Result(property = "userId", column = "user_id"),
            @Result(property = "teamId", column = "team_id"),
            @Result(property = "score", column = "score"),
            @Result(property = "firstname", column = "firstname"),
            @Result(property = "lastname", column = "lastname"),
    })
    List<TaskAssignment> getTaskAssignments(Long taskId);

}
