package com.example.demo.request.personalWebsite;

import com.example.demo.util.LocalDateTimeDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VisitRecordUpdateRequest {
    private Integer personalWebsiteHttpRequestId;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime leaveTime;
}
