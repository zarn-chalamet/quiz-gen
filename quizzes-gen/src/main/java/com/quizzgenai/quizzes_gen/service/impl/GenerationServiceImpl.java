package com.quizzgenai.quizzes_gen.service.impl;

import com.quizzgenai.quizzes_gen.dto.QuizDto;
import com.quizzgenai.quizzes_gen.service.GenerationService;
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
public class GenerationServiceImpl implements GenerationService {

    @Override
    public QuizDto generateQuizFromFile(MultipartFile file,
                                        int quantity) {

        try {
            //extract text from file
            String text = extractTextFromFile(file);

            //call ai api to generate quiz

            //map ai json response to dto

            //create quiz(save quiz to mongodb)

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate quiz ", e);
        }
        return null;
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
