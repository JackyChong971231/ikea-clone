package com.example.demo.config;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseLoadData {
    private final ConsentRepository consentRepository;
    private final ConsentTypeRepository consentTypeRepository;
    private final StoreRepository storeRepository;
    private final StoreTypeRepository storeTypeRepository;
    private final AddressTypeRepository addressTypeRepository;
    private final AddressRepository addressRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void generateDummyData() {
        ConsentType consentType0 = ConsentType.builder().typeName("Policy").build();
        ConsentType consentType1 = ConsentType.builder().typeName("Promotion").build();
        consentTypeRepository.save(consentType0);
        consentTypeRepository.save(consentType1);

        Consent consent0 = Consent.builder()
                .consentType(consentType0)
                .description("General T&C")
                .build();
        Consent consent1 = Consent.builder()
                .consentType(consentType1)
                .description("<Promotion Email Content>")
                .build();
        consentRepository.save(consent0);
        consentRepository.save(consent1);

        StoreType storeType0 = StoreType.builder().typeName("Store").build();
        StoreType storeType1 = StoreType.builder().typeName("Pick Up Store").build();
        storeTypeRepository.save(storeType0);
        storeTypeRepository.save(storeType1);

        AddressType addressType0 = AddressType.builder().typeName("shipping").build();
        AddressType addressType1 = AddressType.builder().typeName("billing").build();
        AddressType addressType2 = AddressType.builder().typeName("store").build();
        addressTypeRepository.save(addressType0);
        addressTypeRepository.save(addressType1);
        addressTypeRepository.save(addressType2);

        Address address0 = Address.builder()
                .addressType(addressType2)
                .streetAddress("15 Provost Drive")
                .city("North York")
                .province("Ontario")
                .country("Canada")
                .postalCode("M2K2X9")
                .build();
        Address address1 = Address.builder()
                .addressType(addressType2)
                .streetAddress("300 Borough Drive")
                .city("Scarborough")
                .province("Ontario")
                .country("Canada")
                .postalCode("M1P4P5")
                .build();
        addressRepository.save(address0);
        addressRepository.save(address1);

        Store store0 = Store.builder()
                .displayName("IKEA North York")
                .address(address0)
                .storeType(storeType0)
                .holidayHours("Closed")
                .weekdaysHours("10:00 a.m. - 9:00 p.m.")
                .satHours("9:00 a.m. - 9:00 p.m.")
                .sunHours("9:00 a.m. - 7:00 p.m.")
                .build();
        Store store1 = Store.builder()
                .displayName("IKEA Scarborough Town Centre")
                .address(address1)
                .storeType(storeType0)
                .holidayHours("Closed")
                .weekdaysHours("9:00 a.m. - 9:00 p.m.")
                .satHours("9:00 a.m. - 9:00 p.m.")
                .sunHours("10:00 a.m. - 7:00 p.m.")
                .build();
        storeRepository.save(store0);
        storeRepository.save(store1);
    }

}
