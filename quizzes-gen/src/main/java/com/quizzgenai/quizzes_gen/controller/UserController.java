package com.quizzgenai.quizzes_gen.controller;

import com.quizzgenai.quizzes_gen.dto.UserDto;
import com.quizzgenai.quizzes_gen.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto){
        UserDto savedUserDto = userService.createUser(userDto);

        return ResponseEntity.status(HttpStatus.OK).body(savedUserDto);
    }
}
