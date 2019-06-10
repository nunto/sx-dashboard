import React from 'react';
import styled from 'styled-components'


function SwitchLabel(props) {
    if (props.bold === true) {
        return (
            <Content>{props.label}</Content>
        );
    }
    return (
        <p>{props.label}</p>
    );
}

export default SwitchLabel;

const Content = styled.p`
    font-family: Roboto,Helvetica,Arial,sans-serif;
    font-weight: bold;
    line-height: 1.5em;
    color: Black;
`;
