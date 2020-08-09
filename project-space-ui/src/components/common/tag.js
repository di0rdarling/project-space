import React from 'react';
import styled from 'styled-components';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    tagText: {
        fontFamily: 'Montserrat',
        fontSize: 10,
        fontWeight: 700
    }

})

const TagMedium = styled.div`
    padding: 5px;
    border-radius: 10px;
    background-color: ${props => props.tagColour};
    margin: 8px 8px 8px 0px;
`;

const TagSmall = styled.div`
        background-color: ${props => props.color};
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
`;

export default function Tag({ name, colour, size }) {

    let classes = useStyles();

    if (size === 'small') {
        return (
            <TagSmall tagColour={colour} />
        )
    } else {
        return (
            <TagMedium tagColour={colour}>
                <Typography className={classes.tagText}>{name}</Typography>
            </TagMedium>
        )
    }
}