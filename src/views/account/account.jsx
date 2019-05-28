import React, { Component } from 'react';
import styled from 'styled-components';

const Content = styled.h1`
    font-family: Roboto,Helvetica,Arial,sans-serif;
    font-weight: 300;
    line-height: 1.5em;
    color: Black; 
`;

class Account extends Component {
    render() {
        return (
            <Content>Account components will go here</Content>
        )
    }
}

export default Account;