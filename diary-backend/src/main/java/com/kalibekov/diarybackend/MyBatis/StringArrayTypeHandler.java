package com.kalibekov.diarybackend.MyBatis;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import java.sql.Array;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Objects;

public class StringArrayTypeHandler extends BaseTypeHandler<String[]> {

    private static final String ARRAY_TYPE_NAME = "text";

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, String[] parameter, JdbcType jdbcType) throws SQLException {
        Array array = ps.getConnection().createArrayOf(ARRAY_TYPE_NAME, parameter);
        ps.setArray(i, array);
    }

    @Override
    public String[] getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return toStringArray(rs.getArray(columnName));
    }

    @Override
    public String[] getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return toStringArray(rs.getArray(columnIndex));
    }

    @Override
    public String[] getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return toStringArray(cs.getArray(columnIndex));
    }

    private String[] toStringArray(Array array) throws SQLException {
        if (Objects.isNull(array)) {
            return null;
        }
        Object[] objects = (Object[]) array.getArray();
        return Arrays.stream(objects)
                .map(String::valueOf)
                .toArray(String[]::new);
    }
}
