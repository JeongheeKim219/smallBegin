package com.project.smallbeginjava11.serviceImpl;

import com.project.smallbeginjava11.mapper.MonthListMapper;
import com.project.smallbeginjava11.service.MonthListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MonthListServiceImpl implements MonthListService {

    private final MonthListMapper monthListMapper;

    // 달일 경우 개별 날짜를 직접 지정해서 선택할 경우, 해당 날짜를 데이터베이스에 insert
    @Override
    public void insertMonthList(Map<String, Object> map){
        monthListMapper.insertMonthList(map);
    }

}
