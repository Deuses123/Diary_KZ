package com.kalibekov.diarybackend.Models.Study;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;


public class Task {
    private int task_id;
    private String name;
    private String description;
    private Long team_id;


    private String[] files;
    public int getTask_id() {
        return task_id;
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


    public void setTask_id(int task_id) {
        this.task_id = task_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getTeam_id() {
        return team_id;
    }

    public void setTeam_id(Long team_id) {
        this.team_id = team_id;
    }
}
