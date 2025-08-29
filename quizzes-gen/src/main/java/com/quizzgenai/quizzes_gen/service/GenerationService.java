package com.quizzgenai.quizzes_gen.service;

import com.quizzgenai.quizzes_gen.dto.QuizDto;
import org.springframework.web.multipart.MultipartFile;

public interface GenerationService {
    QuizDto generateQuizFromFile(MultipartFile file, int quantity);
}
