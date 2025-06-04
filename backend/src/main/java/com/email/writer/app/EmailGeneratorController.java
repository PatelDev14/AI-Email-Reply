package com.email.writer.app;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // This marks the class as a REST API controller
@RequestMapping("/api/email") // This sets the base URL for all endpoints in this controller
@CrossOrigin(origins = "*") // This allows cross-origin requests from any origin

public class EmailGeneratorController {
    private final EmailGeneratorService emailGeneratorService;
    // Here we inject the EmailGeneratorService to generate the email replies.

    public EmailGeneratorController(EmailGeneratorService emailGeneratorService) {
        /*
         * Constructor that takes EmailGeneratorService as a parameter
         * This allows us to use the service methods in our controller
         */
        this.emailGeneratorService = emailGeneratorService;
    }

    @PostMapping("/generate") // This method handles POST requests to the /generate endpoint
    /**
     * Generates an email reply based on the provided email request.
     *
     * @param emailRequest The request containing the email details.
     * @return A ResponseEntity containing the generated email reply.
     */
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}
