package com.email.writer.app;

import lombok.Data;

import java.util.Map;

@Data
public class EmailRequest {
    public String getEmailContent() {
        return emailContent;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

    private String emailContent;
    private String tone;


}
