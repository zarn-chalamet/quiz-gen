package com.quizzgenai.quizzes_gen.repository;

import com.quizzgenai.quizzes_gen.document.FlashcardDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FlashcardRepository extends MongoRepository<FlashcardDocument,String> {

    List<FlashcardDocument> findAllByClerkId(String clerkId);
}
