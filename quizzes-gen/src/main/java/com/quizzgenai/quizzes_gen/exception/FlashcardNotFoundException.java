package com.quizzgenai.quizzes_gen.exception;

public class FlashcardNotFoundException extends RuntimeException{
    public FlashcardNotFoundException(String message) {
        super(message);
    }
}
