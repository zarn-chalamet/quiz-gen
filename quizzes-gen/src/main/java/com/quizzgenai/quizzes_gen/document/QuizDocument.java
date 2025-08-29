package com.quizzgenai.quizzes_gen.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "quizzes")
public class QuizDocument {
    @Id
    private String id; // MongoDB uses String/ObjectId as default ID

    private String title;
    private String img;
    private String clerkId; //owner clerk id
    private List<Question> questions;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Question {
        private Integer id;
        private String text;
        private List<Option> options;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Option {
        private Integer id;
        private String label;
        private String text;
        private boolean isCorrect;
    }
}



