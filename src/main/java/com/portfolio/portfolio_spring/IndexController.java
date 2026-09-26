package com.portfolio.portfolio_spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class IndexController {

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/")
    public String indexPage() {
        return "index";
    }

    @PostMapping("/contact")
    public String contact(@RequestParam String name,
                          @RequestParam String email,
                          @RequestParam String message,
                          RedirectAttributes redirectAttributes) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            // Jekhane mail-ti pouchabe (apnar personal email address)
            mailMessage.setTo("sarawermd@gmail.com");

            mailMessage.setSubject("New Portfolio Message from " + name);
            mailMessage.setReplyTo(email); // Inbox-e 'Reply' dile direct visitor-er mail-e reply jabe
            mailMessage.setText("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);

            mailSender.send(mailMessage);

            redirectAttributes.addFlashAttribute("success", "Message sent successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Failed to send message. Please try again.");
        }

        return "redirect:/";
    }
}