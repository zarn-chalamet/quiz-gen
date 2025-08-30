package com.quizzgenai.quizzes_gen.service.impl;

import com.quizzgenai.quizzes_gen.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;


@Service
public class GeminiServiceImpl implements GeminiService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public GeminiServiceImpl(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    @Override
    public String generateQuiz(String text, int quantity) {
        // Create prompt that forces Gemini to respond with the correct QuizDto structure
        String prompt = """
        You are a quiz generator. Based on the following study material, generate a quiz.

        Study material:
        %s

        Generate exactly %d multiple choice questions in JSON format that follows this Java DTO structure:

        {
          "title": "string (short quiz title)",
          "img": "string (image url or leave empty)",
          "questions": [
            {
              "id": int,
              "text": "question text",
              "options": [
                {
                  "id": int,
                  "label": "A/B/C/D",
                  "text": "answer option text",
                  "isCorrect": true/false
                }
              ]
            }
          ]
        }

        Rules:
        - Only return JSON, no explanations.
        - Make sure exactly one option per question has "isCorrect": true.
        - Each question must have 4 options (A, B, C, D).
        - IDs must be unique within the quiz.
        """.formatted(text, quantity);

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", prompt)
                        })
                }
        );

        String response = webClient.post()
                .uri(geminiApiUrl)
                .header("Content-Type", "application/json")
                .header("X-goog-api-key", geminiApiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return response;
    }

    @Override
    public String generateFlashcard(String text, int quantity) {
        // Create prompt that forces Gemini to respond with the correct FlashcardDto structure
        String prompt = """
        You are a flashcard generator. Based on the following study material, generate flashcards.

        Study material:
        %s

        Generate exactly %d cards in JSON format that follows this Java DTO structure:

        {
          "title": "string (short flashcard set title)",
          "description": "string (short description of the flashcard set)",
          "img": "string (image url or leave empty)",
          "cards": [
            {
              "id": int,
              "question": "string (the question side of the card)",
              "answer": "string (the answer side of the card)"
            }
          ]
        }

        Rules:
        - Only return JSON, no explanations.
        - IDs must be unique within the flashcard set.
        - The "cards" list must contain exactly %d items.
        """.formatted(text, quantity, quantity);

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", prompt)
                        })
                }
        );

        String response = webClient.post()
                .uri(geminiApiUrl)
                .header("Content-Type", "application/json")
                .header("X-goog-api-key", geminiApiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return response;
    }

}
