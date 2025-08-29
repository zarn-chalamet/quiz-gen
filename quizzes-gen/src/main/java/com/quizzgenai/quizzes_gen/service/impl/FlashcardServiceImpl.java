package com.quizzgenai.quizzes_gen.service.impl;

import com.quizzgenai.quizzes_gen.document.FlashcardDocument;
import com.quizzgenai.quizzes_gen.document.UserDocument;
import com.quizzgenai.quizzes_gen.dto.FlashcardDto;
import com.quizzgenai.quizzes_gen.exception.FlashcardNotFoundException;
import com.quizzgenai.quizzes_gen.repository.FlashcardRepository;
import com.quizzgenai.quizzes_gen.service.FlashcardService;
import com.quizzgenai.quizzes_gen.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlashcardServiceImpl implements FlashcardService {

    private final FlashcardRepository flashcardRepository;
    private final UserService userService;

    @Override
    public FlashcardDto createFlashcards(FlashcardDto flashcardDto) {

        //get current user
        UserDocument user = userService.getCurrentUser();

        FlashcardDocument flashcard = dtoToDoc(flashcardDto,user);
        FlashcardDocument createdFlashcard = flashcardRepository.save(flashcard);

        return docToDto(createdFlashcard);
    }

    @Override
    public List<FlashcardDto> getAllFlashcards() {

        List<FlashcardDocument> flashcards = flashcardRepository.findAll();

        return flashcards.stream()
                .map(this::docToDto)
                .toList();
    }

    @Override
    public List<FlashcardDto> getAllUserFlashcards() {

        //get current user
        UserDocument user = userService.getCurrentUser();

        List<FlashcardDocument> userFlashcards = flashcardRepository.findAllByClerkId(user.getClerkId());

        return userFlashcards.stream()
                .map(this::docToDto)
                .toList();
    }

    @Override
    public FlashcardDto getFlashcardById(String cardId) {

        FlashcardDocument flashcard = flashcardRepository.findById(cardId)
                .orElseThrow(() -> new FlashcardNotFoundException("Flashcard not found by id: "+cardId));

        return docToDto(flashcard);
    }

    @Override
    public FlashcardDto updateFlashcard(String cardId, FlashcardDto flashcardDto) {
        // Get current user
        UserDocument user = userService.getCurrentUser();

        // Find flashcard by ID
        FlashcardDocument flashcard = flashcardRepository.findById(cardId)
                .orElseThrow(() -> new FlashcardNotFoundException("Flashcard not found by id: " + cardId));

        // Check ownership
        if (!user.getClerkId().equals(flashcard.getClerkId())) {
            throw new AuthorizationDeniedException("You don't have permission to update this flashcard.");
        }

        // Update fields
        flashcard.setTitle(flashcardDto.getTitle());
        flashcard.setDescription(flashcardDto.getDescription());
        flashcard.setImg(flashcardDto.getImg());

        if (flashcardDto.getCards() != null) {
            flashcard.setCards(
                    flashcardDto.getCards().stream()
                            .map(c -> FlashcardDocument.Card.builder()
                                    .id(c.getId())
                                    .question(c.getQuestion())
                                    .answer(c.getAnswer())
                                    .build())
                            .toList()
            );
        }

        // Save updated flashcard
        FlashcardDocument updated = flashcardRepository.save(flashcard);

        // Return DTO
        return docToDto(updated);
    }


    @Override
    public void deleteFlashcard(String cardId) {
        // Get current user
        UserDocument user = userService.getCurrentUser();

        // Find flashcard by ID
        FlashcardDocument flashcard = flashcardRepository.findById(cardId)
                .orElseThrow(() -> new FlashcardNotFoundException("Flashcard not found by id: " + cardId));

        // Check ownership
        if (!user.getClerkId().equals(flashcard.getClerkId())) {
            throw new AuthorizationDeniedException("You don't have permission to update this flashcard.");
        }

        flashcardRepository.delete(flashcard);
    }

    private FlashcardDocument dtoToDoc(FlashcardDto dto, UserDocument user) {
        return FlashcardDocument.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .img(dto.getImg())
                .clerkId(user.getClerkId())
                .cards(
                        dto.getCards() != null
                                ? dto.getCards().stream()
                                .map(c -> FlashcardDocument.Card.builder()
                                        .id(c.getId())
                                        .question(c.getQuestion())
                                        .answer(c.getAnswer())
                                        .build())
                                .toList()
                                : null
                )
                .build();
    }

    private FlashcardDto docToDto(FlashcardDocument doc) {
        return FlashcardDto.builder()
                .id(doc.getId())
                .title(doc.getTitle())
                .description(doc.getDescription())
                .img(doc.getImg())
                .clerkId(doc.getClerkId())
                .cards(
                        doc.getCards() != null
                                ? doc.getCards().stream()
                                .map(c -> FlashcardDto.CardDto.builder()
                                        .id(c.getId())
                                        .question(c.getQuestion())
                                        .answer(c.getAnswer())
                                        .build())
                                .toList()
                                : null
                )
                .build();
    }
}
