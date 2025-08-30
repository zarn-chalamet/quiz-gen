package com.quizzgenai.quizzes_gen.controller;

import com.quizzgenai.quizzes_gen.dto.QuizDto;
import com.quizzgenai.quizzes_gen.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    //create quiz
    @PostMapping("/create")
    public ResponseEntity<?> createQuiz(@RequestBody QuizDto quizDto) {
        QuizDto createdQuiz = quizService.createQuiz(quizDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuiz);
    }

    //update quiz
    @PatchMapping("/update/{quizId}")
    public ResponseEntity<?> updateQuiz(@PathVariable("quizId") String quizId,
                                        @RequestBody QuizDto quizDto) {
        QuizDto updatedQuiz = quizService.updateQuiz(quizId,quizDto);

        return ResponseEntity.ok(updatedQuiz);
    }

    //delete quiz
    @DeleteMapping("/delete/{quizId}")
    public ResponseEntity<?> deleteQuiz(@PathVariable("quizId") String quizId) {
        quizService.deleteQuiz(quizId);

        return ResponseEntity.ok("Quiz deleted successfully.");
    }

    //get all quizzes
    @GetMapping()
    public ResponseEntity<?> getAllQuizzes(){
        List<QuizDto> allQuizzes = quizService.getAllQuizzes();
        return ResponseEntity.ok(allQuizzes);
    }

    //get all user's quizzes(current user)
    @GetMapping("/user-quizzes")
    public ResponseEntity<?> getAllUsersQuizzes(){
        List<QuizDto> userQuizzes = quizService.getAllUsersQuizzes();
        return ResponseEntity.ok(userQuizzes);
    }

    //get quiz by id
    @GetMapping("/{quizId}")
    public ResponseEntity<?> getQuizById(@PathVariable("quizId") String quizId) {
        QuizDto quiz = quizService.getByQuizId(quizId);

        return ResponseEntity.ok(quiz);
    }
}
