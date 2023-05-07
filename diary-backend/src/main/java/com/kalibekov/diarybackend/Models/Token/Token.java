package com.kalibekov.diarybackend.Models.Token;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    private Integer id;
    private String token;
    private TokenType tokenType = TokenType.BEARER;
    private boolean revoked;
    private boolean expired;
    private Integer user_id;
}