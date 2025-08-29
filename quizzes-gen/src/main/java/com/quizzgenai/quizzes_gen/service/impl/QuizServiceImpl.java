package com.quizzgenai.quizzes_gen.service.impl;

import com.quizzgenai.quizzes_gen.document.QuizDocument;
import com.quizzgenai.quizzes_gen.document.UserDocument;
import com.quizzgenai.quizzes_gen.dto.QuizDto;
import com.quizzgenai.quizzes_gen.exception.QuizNoFoundException;
import com.quizzgenai.quizzes_gen.repository.QuizRepository;
import com.quizzgenai.quizzes_gen.service.QuizService;
import com.quizzgenai.quizzes_gen.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final UserService userService;

    @Override
    public QuizDto createQuiz(QuizDto quizDto) {

        //get current user
        UserDocument user = userService.getCurrentUser();

        QuizDocument quiz = dtoToDoc(quizDto,user);
        QuizDocument createdQuiz = quizRepository.save(quiz);

        return docToDto(createdQuiz);
    }

    @Override
    public QuizDto updateQuiz(String quizId, QuizDto quizDto) {

        //get current user
        UserDocument user = userService.getCurrentUser();

        QuizDocument quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNoFoundException("Quiz not found with id: "+ quizId));

        if(!user.getClerkId().equals(quiz.getClerkId())) {
            throw new AuthorizationDeniedException("You don't have permission to this.");
        }

        // 2. Update fields
        quiz.setTitle(quizDto.getTitle());
        quiz.setImg(quizDto.getImg());
        quiz.setClerkId(quizDto.getClerkId());

        if (quizDto.getQuestions() != null) {
            quiz.setQuestions(
                    quizDto.getQuestions().stream()
                            .map(q -> QuizDocument.Question.builder()
                                    .id(q.getId())
                                    .text(q.getText())
                                    .options(
                                            q.getOptions() != null
                                                    ? q.getOptions().stream()
                                                    .map(o -> QuizDocument.Option.builder()
                                                            .id(o.getId())
                                                            .label(o.getLabel())
                                                            .text(o.getText())
                                                            .isCorrect(o.isCorrect())
                                                            .build())
                                                    .toList()
                                                    : null
                                    )
                                    .build())
                            .toList()
            );
        }

        // 3. Save updated quiz
        QuizDocument updated = quizRepository.save(quiz);

        // 4. Return as DTO
        return docToDto(updated);
    }

    @Override
    public void deleteQuiz(String quizId) {

        //get current user
        UserDocument user = userService.getCurrentUser();

        QuizDocument quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNoFoundException("Quiz not found with id: "+ quizId));

        if(!user.getClerkId().equals(quiz.getClerkId())) {
            throw new AuthorizationDeniedException("You don't have permission to this.");
        }

        quizRepository.delete(quiz);
    }

    @Override
    public List<QuizDto> getAllQuizzes() {

        List<QuizDocument> quizzes = quizRepository.findAll();

        return quizzes.stream()
                .map(this::docToDto).toList();
    }

    @Override
    public List<QuizDto> getAllUsersQuizzes() {

        //get current user
        UserDocument user = userService.getCurrentUser();

        //get quizzes list by clerkId
        List<QuizDocument> userQuizzes = quizRepository.findAllByClerkId(user.getClerkId());

        return userQuizzes.stream()
                .map(this::docToDto).toList();
    }

    @Override
    public QuizDto getByQuizId(String quizId) {

        QuizDocument quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNoFoundException("Quiz not found with id: "+ quizId));

        return docToDto(quiz);
    }

    private QuizDocument dtoToDoc(QuizDto quizDto, UserDocument user) {
        return QuizDocument.builder()
                .title(quizDto.getTitle())
                .img(quizDto.getImg())
                .clerkId(user.getClerkId())
                .questions(
                        quizDto.getQuestions() != null
                                ? quizDto.getQuestions().stream()
                                .map(q -> QuizDocument.Question.builder()
                                        .id(q.getId())
                                        .text(q.getText())
                                        .options(
                                                q.getOptions() != null
                                                        ? q.getOptions().stream()
                                                        .map(o -> QuizDocument.Option.builder()
                                                                .id(o.getId())
                                                                .label(o.getLabel())
                                                                .text(o.getText())
                                                                .isCorrect(o.isCorrect())
                                                                .build())
                                                        .toList()
                                                        : null
                                        )
                                        .build())
                                .toList()
                                : null
                )
                .build();
    }

    private QuizDto docToDto(QuizDocument quizDocument) {
        return QuizDto.builder()
                .id(quizDocument.getId())
                .title(quizDocument.getTitle())
                .img(quizDocument.getImg())
                .clerkId(quizDocument.getClerkId())
                .questions(
                        quizDocument.getQuestions() != null
                                ? quizDocument.getQuestions().stream()
                                .map(q -> QuizDto.QuestionDto.builder()
                                        .id(q.getId())
                                        .text(q.getText())
                                        .options(
                                                q.getOptions() != null
                                                        ? q.getOptions().stream()
                                                        .map(o -> QuizDto.OptionDto.builder()
                                                                .id(o.getId())
                                                                .label(o.getLabel())
                                                                .text(o.getText())
                                                                .isCorrect(o.isCorrect())
                                                                .build())
                                                        .toList()
                                                        : null
                                        )
                                        .build())
                                .toList()
                                : null
                )
                .build();
    }


}
