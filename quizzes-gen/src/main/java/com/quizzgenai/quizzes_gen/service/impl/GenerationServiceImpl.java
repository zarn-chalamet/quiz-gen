package com.quizzgenai.quizzes_gen.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quizzgenai.quizzes_gen.dto.QuizDto;
import com.quizzgenai.quizzes_gen.service.GeminiService;
import com.quizzgenai.quizzes_gen.service.GenerationService;
import com.quizzgenai.quizzes_gen.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.pdf.config.PdfDocumentReaderConfig;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GenerationServiceImpl implements GenerationService {

    private final GeminiService geminiService;
    private final QuizService quizService;

    @Override
    public QuizDto generateQuizFromFile(MultipartFile file,
                                        int quantity) {

        try {
            //extract text from file
            String text = extractTextFromFile(file);
            System.out.println("extracted text");
            System.out.println(text);

            //call ai api to generate quiz
            String apiResponse = geminiService.generateQuiz(text,quantity);

            System.out.println("api response ====================");
            System.out.println(apiResponse);

            //map ai json response to dto
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(apiResponse);

            // extract the actual quiz JSON string
            String quizJson = root.at("/candidates/0/content/parts/0/text").asText();

            // strip ```json fences if present
            if (quizJson.startsWith("```")) {
                quizJson = quizJson.replaceAll("```json", "")
                        .replaceAll("```", "")
                        .trim();
            }

            // deserialize into QuizDto
            QuizDto quizDto = mapper.readValue(quizJson, QuizDto.class);

            System.out.println("Quiz Dto");
            System.out.println(quizDto);

            //create quiz(save quiz to mongodb)
            return quizService.createQuiz(quizDto);

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate quiz ", e);
        }
    }

    private String extractTextFromFile(MultipartFile file) throws IOException {

        try (InputStream inputStream = file.getInputStream()) {
            PdfDocumentReaderConfig config = PdfDocumentReaderConfig.builder()
                    .withPageTopMargin(0)
                    .withPagesPerDocument(1)
                    .build();

            PagePdfDocumentReader reader = new PagePdfDocumentReader(new InputStreamResource(inputStream), config);
            List<Document> documents = reader.read();

            // Merge all page contents into one string
            return documents.stream()
                    .map(Document::getText)
                    .reduce("", (a, b) -> a + "\n" + b);
        }
    }


}
