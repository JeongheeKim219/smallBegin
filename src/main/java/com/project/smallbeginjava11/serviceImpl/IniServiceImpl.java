package com.project.smallbeginjava11.serviceImpl;

import com.project.smallbeginjava11.mapper.IniMapper;
import com.project.smallbeginjava11.service.DateListService;
import com.project.smallbeginjava11.service.IniService;
import com.project.smallbeginjava11.service.MonthListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class IniServiceImpl implements IniService{

    private final IniMapper iniMapper;
    private final DateListService dateListService;
    private final MonthListService monthListService;

    @Override
    public void insertIni(Map<String, Object> params) throws ParseException {
        iniMapper.insertIni(params);
        Map<String, Object> map = getDateListCodeOrMonthListCode(params);

        String monthListCode = String.valueOf(map.get("monthListCode"));
        String dateListCode = String.valueOf(map.get("dateListCode"));

        if (dateListCode != "null"){
            params.put("dateListCode", dateListCode);
            dateListService.insertDateList(params);
        } else if(monthListCode != "null"){
            params.put("monthListCode", monthListCode);
            monthListService.insertMonthList(params);

        }
    }

    // Initiative가 입력된 다음 MonthListCode나 DateListCode를 가져온다.
    @Override
    public Map<String, Object> getDateListCodeOrMonthListCode(Map<String, Object> map) throws ParseException {
        return iniMapper.selectDateListCodeOrMonthListCode(map);
    }

    @Override
    public void insertDateListCodeOrMonthListCode(Map<String, Object> map) throws ParseException{


    }


    //매주일 경우 실행가능횟수를 구하는 메소드
    @Override
    public int getDayOfWeek(Date startDate, Date endDate, int iniDuration, Map<String, Object> map){
        Calendar cal = Calendar.getInstance();
        ArrayList<Integer> days = new ArrayList<Integer>();
        int total = 0;

        if(map.containsKey("mon")) days.add(2);
        if(map.containsKey("tue")) days.add(3);
        if(map.containsKey("wed")) days.add(4);
        if(map.containsKey("thu")) days.add(5);
        if(map.containsKey("fri")) days.add(6);
        if(map.containsKey("sat")) days.add(7);
        if(map.containsKey("sun")) days.add(1);

        int weeks = iniDuration / 7;
        int leftDays = iniDuration % 7;

        total = weeks * days.size();

        //System.out.println(leftDays);

        cal.setTime(endDate);
        //System.out.println("현재 : " + cal.get(Calendar.MONTH) + ", " + cal.get(Calendar.DAY_OF_MONTH));
        if (leftDays != 0) {
            for (int i = 0; leftDays - i > 0; i++) {
                cal.setTime(endDate);
                cal.add(Calendar.DATE, -i);
                //System.out.println("for : " + i + ", "+ (cal.get(Calendar.MONTH) + 1) + "월 " + cal.get(Calendar.DAY_OF_MONTH) + "일");
                //System.out.println("weekday : " + cal.get(Calendar.DAY_OF_WEEK));
                for (int day : days) {
                    if(cal.get(Calendar.DAY_OF_WEEK) == day){
                        total++;
                        //System.out.println("for total : " + total);
                        //System.out.println(cal.get(Calendar.DAY_OF_WEEK) + " : " + day);
                    }

                }
            }
        }

        //System.out.println("total : " + total);
        //System.out.println(days);

        return total;
    }

    // 날짜를 직접 지정해서 선택할 경우, 해당 날짜를 데이터베이스에 insert

}
