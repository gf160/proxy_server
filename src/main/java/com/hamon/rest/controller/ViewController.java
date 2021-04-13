package com.hamon.rest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Leeyouje on 2020-12-21.
 */
@Controller
public class ViewController {

    /*
    *  메인페이지
    * */
    @RequestMapping(value ="/")
    public String main_page(){
        return "main.html";
    }

    @RequestMapping(value ="/main")
    public String main_page2(){
        return "main.html";
    }
}
