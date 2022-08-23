package com.project.smallbeginjava11.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class JoinController {

    @GetMapping("/joinUs")
    public ModelAndView signin(){
        ModelAndView modelAndView = new ModelAndView("joinUs");
        return modelAndView;
    }


}
