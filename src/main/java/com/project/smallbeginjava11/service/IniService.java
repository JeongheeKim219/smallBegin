package com.project.smallbeginjava11.service;

import java.text.ParseException;
import java.util.Date;
import java.util.Map;

public interface IniService {
    void insertIni(Map<String, Object> params) throws ParseException;
    Map<String, Object> getDateListCodeOrMonthListCode(Map<String, Object> map) throws ParseException;
    void insertDateListCodeOrMonthListCode(Map<String, Object> map) throws ParseException;
    int getDayOfWeek(Date startDate, Date endDate, int iniDuration, Map<String, Object> map) throws ParseException;

}
