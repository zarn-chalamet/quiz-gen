package com.quizzgenai.quizzes_gen.controller;

import com.quizzgenai.quizzes_gen.dto.QuizDto;
import com.quizzgenai.quizzes_gen.service.GenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/test/generate")
@RequiredArgsConstructor
public class GenerationController {

    private final GenerationService quizGenerationService;

    @PostMapping()
    public ResponseEntity<?> generateQuiz(@RequestParam("file") MultipartFile file,
                                          @RequestParam("quantity") int quantity) {
        QuizDto quiz = quizGenerationService.generateQuizFromFile(file,quantity);

        return ResponseEntity.status(HttpStatus.CREATED).body(quiz);
    }
}
