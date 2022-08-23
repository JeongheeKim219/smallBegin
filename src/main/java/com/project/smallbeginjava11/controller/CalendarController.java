package com.project.smallbeginjava11.controller;

import com.project.smallbeginjava11.DTO.Calendar;
import com.project.smallbeginjava11.DTO.Todo;
import com.project.smallbeginjava11.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @RequestMapping("/calendar")
    public ModelAndView calendar1(@RequestParam @Nullable Map<String, Object> param){

        System.out.println("param - Calendar");
        System.out.println(param);

        if(param == null){
            System.out.println("first calendar");
            // 무한스크롤 확인용 임시
            ModelAndView modelAndView = new ModelAndView("calendar");
            return modelAndView;
        }else{
            System.out.println("Got the param");
            System.out.println(param);
            // String selectedDate = param.get("param");

            // System.out.println(selectedDate);
            List<Todo> todo = calendarService.getTodoList(param);
            //System.out.println(todo);

            // 무한스크롤 확인용 임시
            ModelAndView modelAndView = new ModelAndView("calendar1");
            modelAndView.addObject("todo", todo);

            System.out.println("Send the result");

            return modelAndView;
        }
    }

    @RequestMapping("/calendar1")
    public ModelAndView calendar(@RequestParam @Nullable Map<String, Object> param){

        if(param == null){
            System.out.println("first calendar");
            // 무한스크롤 확인용 임시
            ModelAndView modelAndView = new ModelAndView("calendar1");
            return modelAndView;
        }else{
            System.out.println("Got the param");
            param.entrySet().forEach(x -> System.out.println(x));
            // String selectedDate = param.get("param");

            // System.out.println(selectedDate);
            List<Todo> todo = calendarService.getTodoList(param);
            System.out.println(todo);

            // 무한스크롤 확인용 임시
            ModelAndView modelAndView = new ModelAndView("calendar1");
            modelAndView.addObject("todo", todo);

            System.out.println("Send the result");

            return modelAndView;
        }




    }
/*  @Transactional
    @RequestMapping(value="/readCalendar", produces="text/html;charset=UTF-8", method = RequestMethod.POST)
    @ResponseBody
    public RedirectView readCalendar(@RequestParam Map<String, String> param, RedirectAttributes re) throws ParseException {

        //String selectedDate = param.get("selectedDate");
        System.out.println("param - readCalendar");
        System.out.println(param);
        
        // 이제 됨
        re.addAttribute("param", param.get("selectedDate"));
        System.out.println("addAttribute");
        System.out.println(re);
        return new RedirectView("/calendar");
    }*/

    @Transactional
    @RequestMapping(value="/readCalendar")
    @ResponseBody
    public List<Todo> readCalendar(@RequestParam Map<String, Object> param) {
        String selectedDate = String.valueOf(param.get("clickedDate"));
        System.out.println("readTodo");
        System.out.println(selectedDate);
        List<Todo> todo = calendarService.getTodoList(param);
        System.out.println(todo);
        return todo;
    }

    @Transactional
    @RequestMapping(value="/readToDoInMonth")
    @ResponseBody
    public List<Todo> readToDoInMonth(@RequestParam Map<String, Object> param) throws ParseException {
        String selectedMonth = String.valueOf(param.get("selectedMonth"));
        System.out.println("readToDoInMonth");
        System.out.println(selectedMonth);
        List<Todo> todoList = calendarService.getTodoListInMonth(param);
        System.out.println(todoList);
        return todoList;
    }

    @Transactional
    @RequestMapping(value="/toDoList", produces="text/html;charset=UTF-8")
    @ResponseBody
    @PostMapping
    public String toDoListInsert(@RequestParam Map<String, String> params) throws ParseException {

        System.out.println("toDoListInsert");

        for (String key : params.keySet()) {
            System.out.println(key + " : " + params.get(key));
        }

        calendarService.inputTodoList(params);

        return "success";
    }

    @RequestMapping(value="/readInitiative")
    @ResponseBody
    @PostMapping
    public List<Calendar> readInitiative(@RequestParam Map<String, Object> params) throws ParseException{
        List<Calendar> initiativeList = calendarService.getIniAndObList(params);
        return initiativeList;
    }

}
