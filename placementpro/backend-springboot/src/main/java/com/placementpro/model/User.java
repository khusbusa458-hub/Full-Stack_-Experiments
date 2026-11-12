package com.placementpro.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String fullName;
    private String email;
    private String password;
    private String uid;
    private String section;
    private String role; // "ROLE_STUDENT" or "ROLE_ADMIN"
    private int credits = 350;
    private int streak = 7;
    private int problemsSolved = 9;
    private List<String> solvedProblemIds;
    private LocalDateTime createdAt = LocalDateTime.now();
}
