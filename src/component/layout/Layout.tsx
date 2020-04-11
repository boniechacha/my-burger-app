import React from 'react';
import LayoutCSS from './Layout.module.css';
import Toolbar from "../navigation/toolbar/Toolbar";
import SideDrawer from "../navigation/drawer/SideDrawer";
import HamburgerButton from "../button/HamburgerButton";

type LayoutState = { drawerOpen: boolean }
type LayoutProps = {}

class Layout extends React.Component<LayoutProps, LayoutState> {

    state = {
        drawerOpen: false
    }

    openDrawer = () => {
        this.setState({drawerOpen: true});
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <HamburgerButton onClicked={() => this.openDrawer()}/>
                <Toolbar/>
                <SideDrawer open={this.state.drawerOpen}/>
                <main className={LayoutCSS.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout