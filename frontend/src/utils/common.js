import { useSharedContext } from "../SharedContext";

export async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export function navigate(href) {
    window.location.href = href
}

export const starRatingGenerator = (rating) => {
    if (rating !== null) {
        let starRatingContainer = [];
        let tempRating = rating;
        for (let i=0; i<5; i++) {
            if (tempRating >= 1) {
                starRatingContainer.push(<svg focusable="false" viewBox="0 0 24 24" className="plp-svg-icon plp-rating__star plp-rating__star--filled" aria-hidden="true"><path d="m12 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8627 18 12 16.2818 8.1373 18l.4252-4.2391L5.75 10.5836l4.1255-.9018L12 6z"></path></svg>)
            } else if (tempRating >= 0 && tempRating < 1) {
                starRatingContainer.push(<svg focusable="false" viewBox="0 0 24 24" className="plp-svg-icon plp-rating__star plp-rating__star--half-filled" aria-hidden="true"><path d="M12 6v10.2818L8.1373 18l.4252-4.2391L5.75 10.5836l4.1255-.9018L12 6z"></path><path d="m12 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8627 18 12 16.2818V6z" fill="rgb(var(--colour-neutral-3, 223, 223, 223))"></path></svg>)
            } else if (tempRating <= 0) {
                starRatingContainer.push(<svg focusable="false" viewBox="0 0 24 24" className="plp-svg-icon plp-rating__star plp-rating__star--empty" aria-hidden="true"><path d="m12 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8627 18 12 16.2818 8.1373 18l.4252-4.2391L5.75 10.5836l4.1255-.9018L12 6z" fill="rgb(var(--colour-neutral-3, 223, 223, 223))"></path></svg>)
            }
            tempRating -= 1;
        }
        return starRatingContainer
    } else {
        return null
    }
}

export const converPrice2String = (priceInt) => {
    let priceStr = priceInt.toFixed(2).split('.');
    return priceStr
}