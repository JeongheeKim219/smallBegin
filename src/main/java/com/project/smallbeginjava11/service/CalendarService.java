package com.project.smallbeginjava11.service;

import com.project.smallbeginjava11.DTO.Todo;
import java.util.List;

public interface CalendarService {
    List<Todo> getTodoList(String selectedDate);
}
