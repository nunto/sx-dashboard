import React, { Component } from 'react';
// Components
import Sidebar from '../components/sidebar/sidebar';


class MainLayout extends Component {
    render() {
        return (
            <div>
                <Sidebar/>
            </div>
        )
    }
}

export default MainLayout;