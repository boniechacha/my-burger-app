import React from 'react';
import LayoutCSS from './Layout.module.css';

const Layout: React.FC = (props) => {
    return (
        <React.Fragment>
            <div>Toolbar,SideDraw, Backdrop</div>
            <main className={LayoutCSS.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout