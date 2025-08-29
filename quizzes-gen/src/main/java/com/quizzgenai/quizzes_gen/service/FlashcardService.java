package com.quizzgenai.quizzes_gen.service;

import com.quizzgenai.quizzes_gen.dto.FlashcardDto;

import java.util.List;

public interface FlashcardService {
    FlashcardDto createFlashcards(FlashcardDto flashcardDto);

    List<FlashcardDto> getAllFlashcards();

    List<FlashcardDto> getAllUserFlashcards();

    FlashcardDto getFlashcardById(String cardId);

    FlashcardDto updateFlashcard(String cardId, FlashcardDto flashcardDto);

    void deleteFlashcard(String cardId);
}
