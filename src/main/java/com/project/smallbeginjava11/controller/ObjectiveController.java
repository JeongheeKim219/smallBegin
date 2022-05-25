package com.project.smallbeginjava11.controller;

import com.project.smallbeginjava11.DTO.Category;
import com.project.smallbeginjava11.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ObjectiveController {

    private final CategoryService categoryService;

    @RequestMapping("/objective")
    public ModelAndView objectivePage(HttpServletRequest request){
        String code = request.getParameter("code");
        System.out.println("Controller : code parameter "+code);

        Category code4Ob = categoryService.selectCategory(code);
        System.out.println("Controller"+code4Ob);
        ModelAndView modelAndView = new ModelAndView("objective");
        modelAndView.addObject("category", code4Ob);
        return modelAndView;
    }

    @Transactional
    @RequestMapping(value="/readOBForm", produces="text/html;charset=UTF-8")
    @ResponseBody
    @PostMapping
    public ModelAndView obAdd(@RequestParam Map<String, String> params) throws ParseException {

        System.out.println("obAdd Controller");
        for(String key : params.keySet()){
            System.out.println(key + " : "+params.get(key));
        }

        ModelAndView modelAndView = new ModelAndView("ini");
        //modelAndView.addObject("objective", code4Ob);
        return modelAndView;
    }

}
