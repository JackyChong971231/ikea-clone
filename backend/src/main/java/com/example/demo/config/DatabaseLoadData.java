package com.example.demo.config;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.util.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DatabaseLoadData {
    private final ConsentRepository consentRepository;
    private final ConsentTypeRepository consentTypeRepository;
    private final StoreRepository storeRepository;
    private final StoreTypeRepository storeTypeRepository;
    private final AddressTypeRepository addressTypeRepository;
    private final AddressRepository addressRepository;
    private final BrandRepository brandRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final VariationOptionRepository variationOptionRepository;
    private final VariationValueRepository variationValueRepository;
    private final ProductRepository productRepository;
    private final BarcodeRepository barcodeRepository;
    private final MembershipRepository membershipRepository;
    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private ResourceLoader resourceLoader;

    private byte[] getImageAsByteArray(String pathFromResourceFolder) throws IOException {
        Resource resource = new ClassPathResource(pathFromResourceFolder);
        return resource.getInputStream().readAllBytes();
    }

    @EventListener(ApplicationReadyEvent.class)
    public void generateDummyData() throws IOException {
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

        Membership membership0 = Membership.builder()
                .firstName("Jacky")
                .lastName("Testing")
                .dateOfBirth(LocalDate.of(2020, 1, 1))
                .email("jackytesting1@gmail.com")
                .passwordHash("8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92")
                .phone("0123456789")
                .promotionConsent("ES")
                .postalCode("M2J0H7")
                .isReadConsentId0(true)
                .preferredStore(store0)
                .role(Role.CUSTOMER)
                .build();
        membershipRepository.save(membership0);

        Wishlist wishlist0 = Wishlist.builder()
                .membership(membership0)
                .wishlistName("My list")
                .lastUpdate(LocalDateTime.now())
                .build();
        wishlistRepository.save(wishlist0);
        Wishlist wishlist1 = Wishlist.builder()
                .membership(membership0)
                .wishlistName("188 Fairview Mall Dr")
                .lastUpdate(LocalDateTime.now())
                .build();
        wishlistRepository.save(wishlist1);

        Brand brand0 = Brand.builder().brandName("LIDÅS").build();
        Brand brand1 = Brand.builder().brandName("SUNNERSTA").build();
        Brand brand2 = Brand.builder().brandName("BURHULT").build();
        Brand brand3 = Brand.builder().brandName("BORGEBY").build();
        Brand brand4 = Brand.builder().brandName("LACK").build();
        brandRepository.save(brand0);
        brandRepository.save(brand1);
        brandRepository.save(brand2);
        brandRepository.save(brand3);
        brandRepository.save(brand4);

        ProductCategory productCategory0 = ProductCategory.builder().categoryName("Products").build();
        ProductCategory productCategory1 = ProductCategory.builder().categoryName("All furniture").build();
        ProductCategory productCategory2 = ProductCategory.builder().categoryName("Tables & desks").build();
        ProductCategory productCategory3 = ProductCategory.builder().categoryName("Coffee & side tables").parentProductCategory(productCategory0).build();
        ProductCategory productCategory4 = ProductCategory.builder().categoryName("Side tables").parentProductCategory(productCategory1).build();
        ProductCategory productCategory5 = ProductCategory.builder().categoryName("LACK Side table").parentProductCategory(productCategory2).build();
        ProductCategory productCategory6 = ProductCategory.builder().categoryName("BORGEBY Coffee table").parentProductCategory(productCategory2).build();
        productCategoryRepository.save(productCategory0);
        productCategoryRepository.save(productCategory1);
        productCategoryRepository.save(productCategory2);
        productCategoryRepository.save(productCategory3);
        productCategoryRepository.save(productCategory4);
        productCategoryRepository.save(productCategory5);
        productCategoryRepository.save(productCategory6);

        VariationOption variationOption0 = VariationOption.builder().optionName("color").build();
        variationOptionRepository.save(variationOption0);

        VariationValue variationValue0 = VariationValue.builder().variationOption(variationOption0).value("Black-brown").build();
        VariationValue variationValue1 = VariationValue.builder().variationOption(variationOption0).value("White").build();
        VariationValue variationValue2 = VariationValue.builder().variationOption(variationOption0).value("White stained oak effect").build();
        VariationValue variationValue3 = VariationValue.builder().variationOption(variationOption0).value("Birch veneer").build();
        VariationValue variationValue4 = VariationValue.builder().variationOption(variationOption0).value("Black").build();
        variationValueRepository.save(variationValue0);
        variationValueRepository.save(variationValue1);
        variationValueRepository.save(variationValue2);
        variationValueRepository.save(variationValue3);
        variationValueRepository.save(variationValue4);

        Product product0 = Product.builder()
                .productCategory(productCategory5)
                .brand(brand4)
                .description("Side table, 55x55 cm (21 5/8x21 5/8 \")")
                .isForSale(true)
                .build();
        Product product1 = Product.builder()
                .productCategory(productCategory6)
                .brand(brand3)
                .description("Coffee table, 70 cm (27 1/2 \")")
                .isForSale(true)
                .build();
        productRepository.save(product0);
        productRepository.save(product1);

        Barcode barcode0 = Barcode.builder()
                .product(product0)
                .variation1Value(variationValue0)
                .widthCm(BigDecimal.valueOf(55))
                .depthCm(BigDecimal.valueOf(55))
                .heightCm(BigDecimal.valueOf(45))
                .weightKg(BigDecimal.valueOf(3.59))
                .originalPrice(BigDecimal.valueOf(14.99))
                .productImage(getImageAsByteArray("images/0/productImage.png"))
                .roomImage(getImageAsByteArray("images/0/roomImage.png"))
                .isDefaultForThumbnail(true)
                .build();
        Barcode barcode1 = Barcode.builder()
                .product(product0)
                .variation1Value(variationValue1)
                .widthCm(BigDecimal.valueOf(55))
                .depthCm(BigDecimal.valueOf(55))
                .heightCm(BigDecimal.valueOf(45))
                .weightKg(BigDecimal.valueOf(3.59))
                .originalPrice(BigDecimal.valueOf(14.99))
                .productImage(getImageAsByteArray("images/1/productImage.png"))
                .roomImage(getImageAsByteArray("images/1/roomImage.png"))
                .build();
        Barcode barcode2 = Barcode.builder()
                .product(product0)
                .variation1Value(variationValue2)
                .widthCm(BigDecimal.valueOf(55))
                .depthCm(BigDecimal.valueOf(55))
                .heightCm(BigDecimal.valueOf(45))
                .weightKg(BigDecimal.valueOf(3.59))
                .originalPrice(BigDecimal.valueOf(14.99))
                .productImage(getImageAsByteArray("images/2/productImage.png"))
                .roomImage(getImageAsByteArray("images/2/roomImage.png"))
                .build();
        Barcode barcode3 = Barcode.builder()
                .product(product1)
                .variation1Value(variationValue3)
                .widthCm(BigDecimal.valueOf(70))
                .depthCm(BigDecimal.valueOf(70))
                .heightCm(BigDecimal.valueOf(42))
                .weightKg(BigDecimal.valueOf(9.17))
                .originalPrice(BigDecimal.valueOf(159.00))
                .productImage(getImageAsByteArray("images/3/productImage.png"))
                .roomImage(getImageAsByteArray("images/3/roomImage.png"))
                .isDefaultForThumbnail(true)
                .build();
        Barcode barcode4 = Barcode.builder()
                .product(product1)
                .variation1Value(variationValue4)
                .widthCm(BigDecimal.valueOf(70))
                .depthCm(BigDecimal.valueOf(70))
                .heightCm(BigDecimal.valueOf(42))
                .weightKg(BigDecimal.valueOf(9.17))
                .originalPrice(BigDecimal.valueOf(159.00))
                .productImage(getImageAsByteArray("images/4/productImage.png"))
                .roomImage(getImageAsByteArray("images/4/roomImage.png"))
                .build();
        barcodeRepository.save(barcode0);
        barcodeRepository.save(barcode1);
        barcodeRepository.save(barcode2);
        barcodeRepository.save(barcode3);
        barcodeRepository.save(barcode4);

        WishlistItem wishlistItem0 = WishlistItem.builder()
                .wishlist(wishlist0)
                .barcode(barcode0)
                .quantity(2)
                .build();
        wishlistItemRepository.save(wishlistItem0);
    }
}
