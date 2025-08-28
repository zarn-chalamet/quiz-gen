package com.quizzgenai.quizzes_gen.repository;

import com.quizzgenai.quizzes_gen.document.UserDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserDocument, String> {

    boolean existsByClerkId(String clerkId);

    UserDocument findByClerkId(String clerkId);
}
