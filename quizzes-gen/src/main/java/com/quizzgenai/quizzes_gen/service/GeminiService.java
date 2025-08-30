package com.quizzgenai.quizzes_gen.service;

public interface GeminiService {

    String generateQuiz(String text, int quantity);

    String generateFlashcard(String text, int quantity);
}
