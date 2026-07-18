package com.portfolio.portfolio_spring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class IndexController {
    @GetMapping("/")
    public String indexPage(){
        return "index";
    }

    @PostMapping("/contact")
    public String contact(@RequestParam String name,@RequestParam String email,@RequestParam String message) {
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Message: " + message);
        return "redirect:/";
    }
}
