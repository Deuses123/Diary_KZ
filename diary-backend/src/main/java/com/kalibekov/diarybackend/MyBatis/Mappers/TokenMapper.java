package com.kalibekov.diarybackend.MyBatis.Mappers;

import com.kalibekov.diarybackend.Models.Token.Token;
import com.kalibekov.diarybackend.Models.Token.TokenType;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Optional;

@Mapper
public interface TokenMapper {
    @Insert({
            "<script>",
            "INSERT INTO token (token, token_type, revoked, expired, user_id) VALUES ",
            "<foreach collection='tokens' item='token' separator=','>",
            "(#{token.token}, #{token.tokenType}, #{token.revoked}, #{token.expired}, #{token.user_id})",
            "</foreach>",
            "</script>"
    })
    void saveAllTokens(@Param("tokens") List<Token> tokens);

    @Insert("INSERT INTO token (token, token_type, revoked, expired, user_id) " +
            "VALUES (#{token.token}, #{token.tokenType}, #{token.revoked}, #{token.expired}, #{token.user_id})")
    void insertToken(@Param("token") Token token);

    @Select("SELECT t.* " +
            "FROM token t " +
            "INNER JOIN _user u ON t.user_id = u.id " +
            "WHERE u.id = #{id} " +
            "AND (t.expired = false OR t.revoked = false)")
    List<Token> findAllValidTokenByUser(@Param("id") Integer id);

    @Insert("INSERT INTO token (token, token_type, revoked, expired, user_id) " +
            "VALUES (#{token.token}, #{token.tokenType}, #{token.revoked}, #{token.expired}, #{token.user_id})")
    void save(@Param("token") Token token);

    @Select("SELECT * FROM token WHERE token = #{token}")
    Optional<Token> findByToken(@Param("token") String token);
}
