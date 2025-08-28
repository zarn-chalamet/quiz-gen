package com.quizzgenai.quizzes_gen.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.PublicKey;
import java.util.Base64;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class ClerkJwtAuthFilter extends OncePerRequestFilter {

    @Value("${clerk.issuer}")
    private String clerkIssuer;

    private final ClerkJwksProvider jwksProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        //authorize some request
        String path = request.getServletPath();
        System.out.println("path in clerkJwtFilter");
        System.out.println(path);
        if (path.startsWith("/webhooks")) {
            filterChain.doFilter(request, response);
            return;
        }

        //get header from request
        String authHeader = request.getHeader("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Authorization header is null/invalid.");
            return;
        }

        try{

            //get token from header
            String token = authHeader.substring(7);

            //split header into 3 parts
            String[] chunks = token.split("\\.");
            if(chunks.length < 3){
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid Jwt token");
                return;
            }

            //get data from jwt 1st part
            String headerJson = new String(Base64.getUrlDecoder().decode(chunks[0]));
            ObjectMapper mapper = new ObjectMapper();
            JsonNode headerNode = mapper.readTree(headerJson);

            //get kid(key id) from header
            if(!headerNode.has("kid")) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Token header is missing.");
                return;
            }
            String kid = headerNode.get("kid").asText();

            //get public key
            PublicKey publicKey = jwksProvider.getPublicKey(kid);

            //Verify the token
            Claims claims = Jwts.parser()
                    .verifyWith(publicKey)
                    .requireIssuer(clerkIssuer)
                    .clockSkewSeconds(60)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            String clerkId = claims.getSubject();

            //authenticate
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            clerkId,
                            null,
                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request,response);
        }catch (Exception e) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid Jwt token: "+ e.getMessage());
        }
    }
}
