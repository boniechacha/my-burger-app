import React from "react";
import TopBreadCSS from './TopBread.module.css';

const TopBread: React.FC = (props) => {
    return (
        <div className={TopBreadCSS.TopBread}>
            <div className={TopBreadCSS.Seeds1}/>
            <div className={TopBreadCSS.Seeds2}/>
        </div>
    );
}

export default TopBread;