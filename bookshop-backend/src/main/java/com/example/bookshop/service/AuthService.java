package com.example.bookshop.service;

import com.example.bookshop.model.LibraryUser;
import com.example.bookshop.repository.LibraryUserRepository;
import com.example.bookshop.security.JwtUtility;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final LibraryUserRepository libraryUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtility jwtUtility;

    public AuthService(LibraryUserRepository libraryUserRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtility jwtUtility) {
        this.libraryUserRepository = libraryUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtility = jwtUtility;
    }

    public LibraryUser registerUser(String username, String password) {
        if (libraryUserRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already taken: " + username);
        }

        LibraryUser newUser = new LibraryUser();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));

        return libraryUserRepository.save(newUser);
    }

    public String authenticateUser(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtUtility.generateToken(username);
    }
}
