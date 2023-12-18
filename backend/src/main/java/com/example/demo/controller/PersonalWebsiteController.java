package com.example.demo.controller;

import com.example.demo.config.ServerConfig;
import com.example.demo.request.personalWebsite.VisitRecordRequest;
import com.example.demo.service.PersonalWebsiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/personal-website/http-request")
@CrossOrigin(origins = ServerConfig.personalWebsiteCrossOrigin, allowCredentials = "true")
@RequiredArgsConstructor
public class PersonalWebsiteController {
    private final PersonalWebsiteService personalWebsiteService;

    @PostMapping("/add")
    public ResponseEntity<Object> addPersonalWebsiteVisitRecord (
            @RequestBody VisitRecordRequest request
    ) {
        return ResponseEntity.ok(personalWebsiteService.addHttpRequestRecord(request));
    }
}
