import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MantineProvider} from "@mantine/core";
import store from "./store.jsx";
import {Provider} from "react-redux";
import AuthorizeView from "./views/layout/AuthorizeView.jsx";
import LoginPage from "./views/pages/LoginPage.jsx";
import Layout from "./views/layout/Layout.jsx";
import '@mantine/core/styles.css';
import SeatTypePage from "./views/pages/grids/SeatTypePage.jsx";
import SeatTypeDetailsPage from "./views/pages/details/SeatTypeDetailsPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthorizeView>
                <Layout/>
            </AuthorizeView>
        ),
        children: [
            {
                path: "dashboard",
                element: <div>Dashboard</div>
            },
            {
                path: "cinemas",
                element: <div>Cinemas</div>
            },
            {
                path: "movies",
                element: <div>Movies</div>
            },
            {
                path: "tickets",
                element: <div>Tickets</div>
            },
            {
                path: "accounts",
                element: <div>Accounts</div>
            },
            {
                path: "reviews",
                element: <div>Reviews</div>
            },
            {
                path: "vouchers",
                element: <div>Vouchers</div>
            },
            {
                path: "seat-types",
                element: <SeatTypePage/>
            },
            {
                path: "seat-types/:id",
                element: <SeatTypeDetailsPage/>
            },
            {
                path: "layouts",
                element: <div>Room layouts</div>
            },
            {
                path: "ticket-types",
                element: <div>Ticket types</div>
            },
            {
                path: "perks",
                element: <div>Ticket perks</div>
            },
            {
                path: "screening-types",
                element: <div>Screening types</div>
            }
        ]
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
