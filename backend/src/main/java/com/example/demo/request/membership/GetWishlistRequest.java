package com.example.demo.request.membership;

import com.example.demo.request.common.ShortUserDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetWishlistRequest {
    private ShortUserDetail shortUserDetail;
    private Integer wishlistId;
}
