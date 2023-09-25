package com.example.demo.request.address;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewAddressRequest {
    private Integer addressType;
    private String streetAddress;
    private String city;
    private String province;
    private String country;
    private String postalCode;
}
