package com.kalibekov.diarybackend.Models.Study;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class Team {
    private Integer id;
    @NonNull
    private Integer owner_id;
    @NonNull
    private String name;
    private String description;
    private List<Integer> student_ids;


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOwner_id() {
        return owner_id;
    }

    public void setOwner_id(Integer owner_id) {
        this.owner_id = owner_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getStudent_ids() {
        return student_ids;
    }

    public void setStudent_ids(Object student_ids) {
        Gson gson = new Gson();
        String list = gson.toJson(student_ids);
        if(!list.equals("[null]")) {
            this.student_ids = new Gson().fromJson(list, new TypeToken<List<Integer>>() {
            }.getType());
        }
        else {
            this.student_ids = new ArrayList<>();
        }
    }
}
