package com.example.demo.service;

import com.example.demo.model.PersonalWebsiteHttpRequest;
import com.example.demo.repository.PersonalWebsiteHttpRequestRepository;
import com.example.demo.request.personalWebsite.VisitRecordRequest;
import com.example.demo.response.error.GeneralResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class PersonalWebsiteService {
    private final PersonalWebsiteHttpRequestRepository personalWebsiteHttpRequestRepository;

    public Object addHttpRequestRecord(VisitRecordRequest request) {
        PersonalWebsiteHttpRequest personalWebsiteHttpRequest = PersonalWebsiteHttpRequest.builder()
                .enterTime(request.getEnterTime().minus(5, ChronoUnit.HOURS)) // Toronto = UTC - 5 hrs
                .leaveTime(request.getLeaveTime().minus(5, ChronoUnit.HOURS)) // Toronto = UTC - 5 hrs
                .ipAddr(request.getIpAddr())
                .build();
//        System.out.println(request.getEnterTime().minus(5, ChronoUnit.HOURS));
        personalWebsiteHttpRequestRepository.save(personalWebsiteHttpRequest);
        var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
        response.setData(personalWebsiteHttpRequest);
//        System.out.println(response);
        return response;
    }
}
