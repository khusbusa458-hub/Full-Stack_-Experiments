package com.placementpro.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "problems")
public class Problem {
    @Id
    private String id;
    private int problemNumber;
    private String title;
    private String description;
    private String difficulty; // "Easy", "Medium", "Hard"
    private List<String> tags;
    private int creditsReward;
    private List<TestCase> testCases;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TestCase {
        private String input;
        private String expectedOutput;
        private boolean isHidden;
    }
}
