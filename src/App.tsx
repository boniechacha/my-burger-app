import React from 'react';
import './App.css';
import Layout from "./component/layout/Layout";
import BurgerBuilder from "./component/burger/builder/BurgerBuilder";

const App: React.FC = () => {
    return (
        <div className="App">
            <Layout>
                <BurgerBuilder/>
            </Layout>
        </div>
    );
}

export default App;
