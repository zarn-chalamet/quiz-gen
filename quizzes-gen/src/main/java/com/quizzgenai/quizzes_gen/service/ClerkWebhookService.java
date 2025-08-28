package com.quizzgenai.quizzes_gen.service;

import com.fasterxml.jackson.databind.JsonNode;

public interface ClerkWebhookService {
    boolean verifyWebhookSignature(String svixId, String svixTimestamp, String svixSignature, String payload);

    void handleUserCreated(JsonNode data);

    void handleUserUpdated(JsonNode data);

    void handleUserDeleted(JsonNode data);
}
