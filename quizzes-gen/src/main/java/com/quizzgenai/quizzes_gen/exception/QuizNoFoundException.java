package com.quizzgenai.quizzes_gen.exception;

public class QuizNoFoundException extends RuntimeException {
    public QuizNoFoundException(String message) {
        super(message);
    }
}
