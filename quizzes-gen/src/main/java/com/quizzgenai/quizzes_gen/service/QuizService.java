package com.quizzgenai.quizzes_gen.service;

import com.quizzgenai.quizzes_gen.dto.QuizDto;

import java.util.List;

public interface QuizService {
    QuizDto createQuiz(QuizDto quizDto);

    QuizDto updateQuiz(String quizId,QuizDto quizDto);

    void deleteQuiz(String quizId);

    List<QuizDto> getAllQuizzes();

    List<QuizDto> getAllUsersQuizzes();

    QuizDto getByQuizId(String quizId);
}
