package com.project.smallbeginjava11.service;

import com.project.smallbeginjava11.DTO.Calendar;
import com.project.smallbeginjava11.DTO.Todo;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface CalendarService {
    List<Todo> getTodoList(Map<String, Object> params);

    //    List<Todo> getTodoList(String selectedDate);
    void inputTodoList(Map<String, String> map) throws ParseException;
    List<Calendar> getIniAndObList(Map<String, Object> map) throws ParseException;
    List<Todo> getTodoListInMonth(Map<String, Object> params) throws ParseException;
    String updateToDoState(Map<String, Object> params) throws ParseException;
}