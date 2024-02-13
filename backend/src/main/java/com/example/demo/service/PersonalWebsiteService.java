package com.example.demo.service;

import com.example.demo.model.PersonalWebsiteHttpRequest;
import com.example.demo.repository.PersonalWebsiteHttpRequestRepository;
import com.example.demo.request.personalWebsite.VisitRecordRequest;
import com.example.demo.request.personalWebsite.VisitRecordUpdateRequest;
import com.example.demo.response.error.GeneralResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonalWebsiteService {
    private final PersonalWebsiteHttpRequestRepository personalWebsiteHttpRequestRepository;

    public Object addHttpRequestRecord(VisitRecordRequest request) {
        System.out.println(request);
        PersonalWebsiteHttpRequest personalWebsiteHttpRequest = PersonalWebsiteHttpRequest.builder()
                .enterTime(request.getEnterTime().minus(5, ChronoUnit.HOURS)) // Toronto = UTC - 5 hrs
//                .leaveTime(request.getLeaveTime().minus(5, ChronoUnit.HOURS)) // Toronto = UTC - 5 hrs
                .ipAddr(request.getIpAddr())
                .geolocation(request.getGeolocation())
                .connectionType(request.getConnectionType())
                .organizationName(request.getOrganizationName())
                .build();
//        System.out.println(request.getEnterTime().minus(5, ChronoUnit.HOURS));
        personalWebsiteHttpRequestRepository.save(personalWebsiteHttpRequest);
        var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
        response.setData(personalWebsiteHttpRequest);
        System.out.println(response);
        return response;
    }

    public Object updateHttpRequestRecord(VisitRecordUpdateRequest request) {
        Optional<PersonalWebsiteHttpRequest> personalWebsiteHttpRequestOptional = personalWebsiteHttpRequestRepository.findById(request.getPersonalWebsiteHttpRequestId());
        if (personalWebsiteHttpRequestOptional.isPresent()) {
            PersonalWebsiteHttpRequest personalWebsiteHttpRequest = personalWebsiteHttpRequestOptional.get();
            personalWebsiteHttpRequest.setLeaveTime(request.getLeaveTime().minus(5, ChronoUnit.HOURS)); // Toronto = UTC - 5 hrs
            personalWebsiteHttpRequestRepository.save(personalWebsiteHttpRequest);
            var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
            response.setData(personalWebsiteHttpRequest);
            return response;
        } else {
            return new GeneralResponse(GeneralResponse.CODE_0005_PERSONAL_WEBSITE_VISIT_ID_NOT_FOUND);
        }
//        return new GeneralResponse(GeneralResponse.CODE_9999_UNKNOWN_ERROR);
    }
}
