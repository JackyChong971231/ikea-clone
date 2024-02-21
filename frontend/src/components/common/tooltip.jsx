import React, { useEffect, useState } from 'react';

export const Tooltip = (props) => {
    const { tooltipText, ...other } = props;
    return (
        <span class="tooltip-text"><p>{tooltipText}</p></span>
    )
}