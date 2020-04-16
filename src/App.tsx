import React from 'react';
import './App.css';
import Layout from "./component/util/layout/Layout";
import BurgerBuilder from "./component/burger/builder/BurgerBuilder";
import Checkout from "./component/checkout/Checkout";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Orders from "./component/order/Orders";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Layout>
                    <Switch>
                        <Route path='/checkout' component={Checkout}/>
                        <Route path='/orders' component={Orders}/>
                        <Route path='/' component={BurgerBuilder} exact/>
                    </Switch>
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;
