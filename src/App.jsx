import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MantineProvider} from "@mantine/core";
import store from "./store.jsx";
import {Provider} from "react-redux";
import AuthorizeView from "./views/layout/AuthorizeView.jsx";
import LoginPage from "./views/pages/LoginPage.jsx";
import Layout from "./views/layout/Layout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthorizeView>
                <Layout/>
            </AuthorizeView>
        )
    },
    {
        path: "/login",
        element: <LoginPage/>
    }
])

function App() {


    return (
        <MantineProvider>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </MantineProvider>
    )
}

export default App
