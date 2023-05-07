package com.kalibekov.diarybackend.Services;

import com.kalibekov.diarybackend.Models.Study.Team;
import com.kalibekov.diarybackend.Models.User.User;
import com.kalibekov.diarybackend.MyBatis.Mappers.TaskMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.TeacherTeamsMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.TeamMapper;
import com.kalibekov.diarybackend.MyBatis.Mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final String UPLOAD_FOLDER = "upload";
    private final TaskMapper taskMapper;
    private final UserMapper userMapper;
    private final TeacherTeamsMapper teamMapper;

    public String[] uploadFile(Authentication authentication,  MultipartFile[] files) {
        List<String> filenames = new ArrayList<>();

        for(MultipartFile file: files) {
                String filename = String.valueOf(UUID.randomUUID());
                filename += "-";
                filename += file.getOriginalFilename();

                try {
                    String fileName = StringUtils.cleanPath(Objects.requireNonNull(filename));
                    Path uploadPath = Path.of(UPLOAD_FOLDER).toAbsolutePath().normalize();
                    Files.createDirectories(uploadPath);
                    Path filePath = uploadPath.resolve(fileName);
                    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                    filenames.add(filename);
                } catch (IOException ex) {
                    System.out.println("Произошла ошибка при загрузке файла.");
                    break;
                }
        }
        return filenames.toArray(new String[0]);
    }

    public ResponseEntity<?> downloadFile(String fileName) {
        try {
            Path filePath = Path.of(UPLOAD_FOLDER).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"");

                return ResponseEntity.ok().headers(headers).body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException ex) {
            return ResponseEntity.status(500).body("Произошла ошибка при загрузке файла.");
        }
    }
}
