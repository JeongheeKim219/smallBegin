package com.project.smallbeginjava11.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Mapper
@Repository
public interface MonthListMapper {
    void insertMonthList(Map<String, Object> list);
}
