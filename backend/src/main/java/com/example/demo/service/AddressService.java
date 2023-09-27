package com.example.demo.service;

import com.example.demo.model.Address;
import com.example.demo.model.AddressType;
import com.example.demo.model.Membership;
import com.example.demo.model.MembershipAddress;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.AddressTypeRepository;
import com.example.demo.repository.MembershipAddressRepository;
import com.example.demo.request.address.NewAddressRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;
    private final AddressTypeRepository addressTypeRepository;
    private final MembershipAddressRepository membershipAddressRepository;

    public void addNewAddress (NewAddressRequest request, Membership membershipJustAdded, AddressType addressType) {
        var address = Address.builder()
                .streetAddress(request.getStreetAddress())
                .addressType(addressType)
                .streetAddress(request.getStreetAddress())
                .city(request.getCity())
                .province(request.getProvince())
                .country(request.getCountry())
                .postalCode(request.getPostalCode())
                .build();
        var addressJustAdded = addressRepository.save(address);
        var membershipAddress = MembershipAddress.builder()
                .membership(membershipJustAdded)
                .address(addressJustAdded)
                .isDefault(true)
                .build();
        membershipAddressRepository.save(membershipAddress);
    }
}
