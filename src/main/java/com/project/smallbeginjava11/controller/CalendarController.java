package com.project.smallbeginjava11.controller;

import com.project.smallbeginjava11.DTO.Todo;
import com.project.smallbeginjava11.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @RequestMapping("/calendar")
    public ModelAndView calendar(@RequestParam @Nullable Map<String, String> param){

        System.out.println("param - Calendar");
        System.out.println(param);

        if(param == null){
            System.out.println("first calendar");
            ModelAndView modelAndView = new ModelAndView("calendar");
            return modelAndView;
        }else{
            System.out.println("Got the param");
            System.out.println(param);
            String selectedDate = param.get("param");

            System.out.println(selectedDate);
            List<Todo> todo = calendarService.getTodoList(selectedDate);
            System.out.println(todo);

            ModelAndView modelAndView = new ModelAndView("calendar");
            modelAndView.addObject("todo", todo);

            System.out.println("Send the result");

            return modelAndView;
        }
    }

    @Transactional
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
    }

}
