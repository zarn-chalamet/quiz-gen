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
@Document(collection = "flashcards")
public class FlashcardDocument {

    @Id
    private String id;

    private String title;
    private String description;
    private String img;       // optional cover image
    private String clerkId;   // owner id

    private List<Card> cards; // list of Q&A pairs

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Card {
        private Integer id;       // card number
        private String question;  // front side
        private String answer;    // back side
    }
}
