package com.quizzgenai.quizzes_gen.service.impl;

import com.quizzgenai.quizzes_gen.document.UserDocument;
import com.quizzgenai.quizzes_gen.dto.UserDto;
import com.quizzgenai.quizzes_gen.repository.UserRepository;
import com.quizzgenai.quizzes_gen.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {

        if(userRepository.existsByClerkId(userDto.getClerkId())){
            return updateUser(userDto);
        }

        UserDocument user = UserDocument.builder()
                .clerkId(userDto.getClerkId())
                .email(userDto.getEmail())
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .photoUrl(userDto.getPhotoUrl())
                .build();

        UserDocument savedUser = userRepository.save(user);

        return UserDto.builder()
                .id(savedUser.getId())
                .clerkId(savedUser.getClerkId())
                .email(savedUser.getEmail())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .photoUrl(savedUser.getPhotoUrl())
                .createdAt(savedUser.getCreatedAt())
                .build();
    }

    public UserDto updateUser(UserDto userDto) {

        UserDocument existingUser = userRepository.findByClerkId(userDto.getClerkId());

        if(existingUser != null) {

            if(userDto.getEmail() != null && !userDto.getEmail().isEmpty()) {
                existingUser.setEmail(userDto.getEmail());
            }

            if(userDto.getFirstName() != null && !userDto.getFirstName().isEmpty()) {
                existingUser.setFirstName(userDto.getFirstName());
            }

            if(userDto.getLastName() != null && !userDto.getLastName().isEmpty()) {
                existingUser.setLastName(userDto.getLastName());
            }

            if(userDto.getPhotoUrl() != null && !userDto.getPhotoUrl().isEmpty()) {
                existingUser.setPhotoUrl(userDto.getPhotoUrl());
            }

            userRepository.save(existingUser);

            return UserDto.builder()
                    .id(existingUser.getId())
                    .clerkId(existingUser.getClerkId())
                    .email(existingUser.getEmail())
                    .firstName(existingUser.getFirstName())
                    .lastName(existingUser.getLastName())
                    .photoUrl(existingUser.getPhotoUrl())
                    .createdAt(existingUser.getCreatedAt())
                    .build();

        }
        return null;
    }

    public boolean existsByClerkId(String clerkId) {
        return userRepository.existsByClerkId(clerkId);
    }

    public void deleteUser(String clerkId){
        UserDocument existingUser = userRepository.findByClerkId(clerkId);
        if(existingUser != null) {
            userRepository.delete(existingUser);
        }
    }

    @Override
    public UserDocument getCurrentUser() {

        if(SecurityContextHolder.getContext().getAuthentication() == null) {
            throw new UsernameNotFoundException("User not authenticated");
        }

        String clerkId = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByClerkId(clerkId);

    }

}
