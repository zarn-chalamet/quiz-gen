package com.quizzgenai.quizzes_gen.controller;

import com.quizzgenai.quizzes_gen.dto.FlashcardDto;
import com.quizzgenai.quizzes_gen.service.FlashcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test/flash-cards")
@RequiredArgsConstructor
public class FlashcardController {

    private final FlashcardService flashcardService;

    @PostMapping("/create")
    public ResponseEntity<?> createFlashcard(@RequestBody FlashcardDto flashcardDto) {
        FlashcardDto createdFlashcard = flashcardService.createFlashcards(flashcardDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdFlashcard);
    }

    @GetMapping()
    public ResponseEntity<?> getAllFlashcard() {
        List<FlashcardDto> allFlashcards = flashcardService.getAllFlashcards();

        return ResponseEntity.ok(allFlashcards);
    }

    @GetMapping("/user-cards")
    public ResponseEntity<?> getAllUserFlashcard() {
        List<FlashcardDto> allUserFlashcards = flashcardService.getAllUserFlashcards();

        return ResponseEntity.ok(allUserFlashcards);
    }


    @GetMapping("/{cardId}")
    public ResponseEntity<?> getFlashcardByCardId(@PathVariable String cardId) {
        FlashcardDto flashcard = flashcardService.getFlashcardById(cardId);

        return ResponseEntity.ok(flashcard);
    }

    @PatchMapping("/update/{cardId}")
    public ResponseEntity<?> updateFlashcardById(@PathVariable String cardId,
                                                 @RequestBody FlashcardDto flashcardDto) {
        FlashcardDto updatedFlashcard = flashcardService.updateFlashcard(cardId,flashcardDto);

        return ResponseEntity.ok(updatedFlashcard);
    }

    @DeleteMapping("/delete/{cardId}")
    public ResponseEntity<?> deleteFlashcardById(@PathVariable String cardId) {
        flashcardService.deleteFlashcard(cardId);

        return ResponseEntity.ok("Deleted flashcard successfully.");
    }
}
