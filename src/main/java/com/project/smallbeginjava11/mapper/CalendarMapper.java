package com.project.smallbeginjava11.mapper;

import com.project.smallbeginjava11.DTO.Todo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CalendarMapper {
    List<Todo> getTodoList(String selectedDate);
}
