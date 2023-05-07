package com.kalibekov.diarybackend.Models.Study;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
public class TaskAssignment {
    private int userId;
    private String firstname;
    private String lastname;
    private int teamId;
    private int taskId;
    private int score;
    private String answer;
    private boolean status;
    private String[] files;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String[] getFiles() {
        return files;
    }

    public void setFiles(Object files) {
        Gson gson = new Gson();
        String list = gson.toJson(files);
        if(!list.equals("[null]")) {
            this.files = new Gson().fromJson(list, new TypeToken<String[]>() {
            }.getType());
        }
        else {
            this.files = new String[0];
        }
    }
}
