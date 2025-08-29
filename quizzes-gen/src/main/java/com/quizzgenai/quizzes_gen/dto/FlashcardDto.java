package com.quizzgenai.quizzes_gen.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlashcardDto {
    private String id;
    private String title;
    private String description;
    private String img;
    private String clerkId;
    private List<CardDto> cards;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CardDto {
        private Integer id;
        private String question;
        private String answer;
    }
}
