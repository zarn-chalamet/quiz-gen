package com.quizzgenai.quizzes_gen.repository;

import com.quizzgenai.quizzes_gen.document.QuizDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuizRepository extends MongoRepository<QuizDocument,String> {
    List<QuizDocument> findAllByClerkId(String clerkId);
}
