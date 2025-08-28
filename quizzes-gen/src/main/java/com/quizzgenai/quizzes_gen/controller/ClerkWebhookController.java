package com.quizzgenai.quizzes_gen.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quizzgenai.quizzes_gen.service.ClerkWebhookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/webhooks")
@RequiredArgsConstructor
public class ClerkWebhookController {

    @Value("${clerk.webhook.secret}")
    private String webhookSecret;

    private final ClerkWebhookService webhookService;

    @PostMapping("/clerk")
    public ResponseEntity<?> handleClerkWebhook(@RequestHeader("svix-id") String svixId,
                                                @RequestHeader("svix-timestamp") String svixTimestamp,
                                                @RequestHeader("svix-signature") String svixSignature,
                                                @RequestBody String payload) {

        System.out.println("clerk controller");
        System.out.println("=============================================================");
        System.out.println(payload);

        try{

            boolean isValid = webhookService.verifyWebhookSignature(svixId, svixTimestamp, svixSignature,payload);
            if(!isValid) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid webhook signature.");
            }

            //get data from payload
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(payload);

            //get event type(like created, updated, deleted)
            String eventType = rootNode.path("type").asText();

            switch (eventType) {
                case "user.created":
                    webhookService.handleUserCreated(rootNode.path("data"));
                    break;
                case "user.updated":
                    webhookService.handleUserUpdated(rootNode.path("data"));
                    break;
                case "user.deleted":
                    webhookService.handleUserDeleted(rootNode.path("data"));
                    break;
            }

            return ResponseEntity.ok().build();
        }catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,e.getMessage());
        }
    }
}
