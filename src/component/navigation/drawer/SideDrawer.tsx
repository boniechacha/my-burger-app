import React from "react";
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";
import CSS from './SideDrawer.module.css'
import Backdrop from "../../util/backdrop/Backdrop";

type SideDrawerState = {}
type SideDrawerProps = { open: boolean }

class SideDrawer extends React.Component<SideDrawerProps, SideDrawerState> {

    backdropClicked = false;

    closeSideDrawer = () => {
        this.backdropClicked =true;
        this.forceUpdate(() => this.backdropClicked = false);
    }

    render() {

        const shouldOpen = !this.backdropClicked && this.props.open;

        return (
            <React.Fragment>
                <Backdrop show={shouldOpen} clicked={() => this.closeSideDrawer()}/>

                <div className={`${CSS.SideDrawer} ${shouldOpen? CSS.Open : CSS.Close}`}>

                    <div className={CSS.Logo}>
                        <Logo/>
                    </div>

                    <Navigation onNavigating={l=>this.closeSideDrawer()}/>
                </div>
            </React.Fragment>
        )
    }
}

export default SideDrawer;