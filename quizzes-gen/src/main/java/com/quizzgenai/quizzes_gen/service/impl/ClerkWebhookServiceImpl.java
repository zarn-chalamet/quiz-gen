package com.quizzgenai.quizzes_gen.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.quizzgenai.quizzes_gen.dto.UserDto;
import com.quizzgenai.quizzes_gen.service.ClerkWebhookService;
import com.quizzgenai.quizzes_gen.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClerkWebhookServiceImpl implements ClerkWebhookService {

    private final UserService userService;

    @Override
    public boolean verifyWebhookSignature(String svixId, String svixTimestamp, String svixSignature, String payload) {
        //validate the signature in the real world project

        return true;
    }

    @Override
    public void handleUserCreated(JsonNode data) {

        //get clerkId
        String clerkId = data.path("id").asText();

        //get email from email list
        String email = "";
        JsonNode emailAddresses =  data.path("email_addresses");
        if(emailAddresses.isArray() && emailAddresses.size() > 0) {
            email = emailAddresses.get(0).path("email_address").asText();
        }

        //get first name and last name
        String firstName = data.path("first_name").asText("");
        String lastName = data.path("last_name").asText("");

        //get photoUrl
        String photoUrl = data.path("image_url").asText("");

        //save user into the database
        UserDto newUser = UserDto.builder()
                .clerkId(clerkId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .photoUrl(photoUrl)
                .build();

        userService.createUser(newUser);

    }

    @Override
    public void handleUserUpdated(JsonNode data) {

        //get clerkId
        String clerkId = data.path("id").asText();

        //get email from email list
        String email = "";
        JsonNode emailAddresses =  data.path("email_addresses");
        if(emailAddresses.isArray() && emailAddresses.size() > 0) {
            email = emailAddresses.get(0).path("email_address").asText();
        }

        //get first name and last name
        String firstName = data.path("first_name").asText("");
        String lastName = data.path("last_name").asText("");

        //get photoUrl
        String photoUrl = data.path("image_url").asText("");

        //save user into the database
        UserDto updatedUser = UserDto.builder()
                .clerkId(clerkId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .photoUrl(photoUrl)
                .build();
        updatedUser = userService.updateUser(updatedUser);

        if(updatedUser == null){
            handleUserCreated(data);
        }
    }

    @Override
    public void handleUserDeleted(JsonNode data) {

        //get clerkId
        String clerkId = data.path("id").asText();

        //delete user
        userService.deleteUser(clerkId);
    }
}
