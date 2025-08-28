package com.quizzgenai.quizzes_gen.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private String id;
    private String clerkId;
    private String email;
    private String firstName;
    private String lastName;
    private String photoUrl;
    private LocalDateTime createdAt;
}
