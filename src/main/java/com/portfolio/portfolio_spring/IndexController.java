package com.portfolio.portfolio_spring;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class IndexController {

    // application.properties or Render Environment Variable theke API Key read korbe
    @Value("${RESEND_API_KEY}")
    private String resendApiKey;

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
            Resend resend = new Resend(resendApiKey);

            String htmlBody = String.format("""
                <h3>New Message from Portfolio</h3>
                <p><strong>Name:</strong> %s</p>
                <p><strong>Email:</strong> %s</p>
                <p><strong>Message:</strong></p>
                <p>%s</p>
            """, name, email, message.replace("\n", "<br/>"));

            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from("onboarding@resend.dev")
                    .to("sarawermd@gmail.com")
                    .replyTo(email) // Inbox-e Direct 'Reply' button-e click korle visitor-er email-e response jabe
                    .subject("New Portfolio Message from " + name)
                    .html(htmlBody)
                    .build();

            resend.emails().send(params);

            redirectAttributes.addFlashAttribute("success", "Message sent successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Failed to send message. Please try again.");
        }

        return "redirect:/";
    }
}