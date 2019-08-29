import React, { Component } from 'react';
// Components
import Sidebar from '../components/sidebar/sidebar';

// Main Layout -> Just loads Sidebar component.
// Fairly unecessary right now, but useful if you wish to create more layouts,
// such as one for the drawer on the right side
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