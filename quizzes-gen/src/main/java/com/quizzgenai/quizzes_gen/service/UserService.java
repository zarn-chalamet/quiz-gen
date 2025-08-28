package com.quizzgenai.quizzes_gen.service;

import com.quizzgenai.quizzes_gen.dto.UserDto;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto updateUser(UserDto updatedUser);

    void deleteUser(String clerkId);
}
