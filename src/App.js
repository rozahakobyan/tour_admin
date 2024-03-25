import React, {useContext} from "react";
import {BrowserRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileNavigate from "./pages/app/ProfileNavigate";
import AuthNavigate from "./pages/auth/authNavigate";
import classNames from "classnames";
import {ThemeContextValue} from "./components/ThemeProvider";

function App() {
    const token = useSelector(state => state.users.token);
    const {theme} = useContext(ThemeContextValue);
    return (
        <div id={'App'} className={classNames('App', {
            activeTheme: theme
        })}>
            <BrowserRouter>
                {
                    token ? <ProfileNavigate/> : <AuthNavigate/>
                }
            </BrowserRouter>
        </div>
    );
}

export default App;
