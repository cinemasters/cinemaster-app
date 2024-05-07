import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MantineProvider} from "@mantine/core";
import store from "./store.jsx";
import {Provider} from "react-redux";
import AuthorizeView from "./views/layout/AuthorizeView.jsx";
import LoginPage from "./views/pages/LoginPage.jsx";
import Layout from "./views/layout/Layout.jsx";
import '@mantine/core/styles.css';
import SeatTypePage from "./views/pages/seat-type/SeatTypePage.jsx";
import SeatTypeDetailsPage from "./views/pages/seat-type/SeatTypeDetailsPage.jsx";
import ScreeningTypePage from "./views/pages/screening_type/ScreeningTypePage.jsx";
import ScreeningTypeDetailsPage from "./views/pages/screening_type/ScreeningTypeDetailsPage.jsx";
import TicketTypePage from "./views/pages/ticket_type/TicketTypePage.jsx";
import TicketTypeDetailsPage from "./views/pages/ticket_type/TicketTypeDetailsPage.jsx";
import TicketPerkPage from "./views/pages/ticket_perk/TicketPerkPage.jsx";
import TicketPerkDetailsPage from "./views/pages/ticket_perk/TicketPerkDetailsPage.jsx";
import RoomLayoutsPage from "./views/pages/room-layout/RoomLayoutsPage.jsx";
import RoomLayoutCreatePage from "./views/pages/room-layout/RoomLayoutCreatePage.jsx";
import RoomLayoutDetailsPage from "./views/pages/room-layout/RoomLayoutDetailsPage.jsx";

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
                element: <RoomLayoutsPage/>
            },
            {
                path: "layouts/:id",
                element: <RoomLayoutDetailsPage/>
            },
            {
                path: "layouts/create",
                element: <RoomLayoutCreatePage/>
            },
            {
                path: "ticket-types",
                element: <TicketTypePage/>
            },
            {
                path: "ticket-types/:id",
                element: <TicketTypeDetailsPage/>
            },
            {
                path: "perks",
                element: <TicketPerkPage/>
            },
            {
                path: "perks/:id",
                element: <TicketPerkDetailsPage/>
            },
            {
                path: "screening-types",
                element: <ScreeningTypePage/>
            },
            {
                path: "screening-types/:id",
                element: <ScreeningTypeDetailsPage/>
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
