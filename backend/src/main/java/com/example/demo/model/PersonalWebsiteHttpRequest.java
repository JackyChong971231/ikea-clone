package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_personalWebsiteHttpRequest")
public class PersonalWebsiteHttpRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer personalWebsiteHttpRequestId;
    private String ipAddr;
    private LocalDateTime enterTime;
    private LocalDateTime leaveTime;
}
