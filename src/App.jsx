import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MantineProvider} from "@mantine/core";
import store from "./store.jsx";
import {Provider} from "react-redux";
import AuthorizeView from "./views/layout/AuthorizeView.jsx";
import LoginPage from "./views/pages/LoginPage.jsx";
import Layout from "./views/layout/Layout.jsx";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import SeatTypesPage from "./views/pages/seat-types/SeatTypesPage.jsx";
import SeatTypeDetailsPage from "./views/pages/seat-types/SeatTypeDetailsPage.jsx";
import ScreeningTypesPage from "./views/pages/screening-types/ScreeningTypesPage.jsx";
import ScreeningTypeDetailsPage from "./views/pages/screening-types/ScreeningTypeDetailsPage.jsx";
import TicketTypesPage from "./views/pages/ticket-types/TicketTypesPage.jsx";
import TicketTypeDetailsPage from "./views/pages/ticket-types/TicketTypeDetailsPage.jsx";
import TicketPerkPage from "./views/pages/ticket-perks/TicketPerkPage.jsx";
import TicketPerkDetailsPage from "./views/pages/ticket-perks/TicketPerkDetailsPage.jsx";
import RoomLayoutsPage from "./views/pages/room-layouts/RoomLayoutsPage.jsx";
import RoomLayoutCreatePage from "./views/pages/room-layouts/RoomLayoutCreatePage.jsx";
import RoomLayoutDetailsPage from "./views/pages/room-layouts/RoomLayoutDetailsPage.jsx";
import MoviesPage from "./views/pages/movies/MoviesPage.jsx";
import MoviesDetailsPage from "./views/pages/movies/MoviesDetailsPage.jsx";
import MoviesCreatePage from "./views/pages/movies/MoviesCreatePage.jsx";
import ClientsPage from "./views/pages/clients/ClientsPage.jsx";
import ClientDetailsPage from "./views/pages/clients/ClientDetailsPage.jsx";
import ReviewsPage from "./views/pages/reviews/ReviewsPage.jsx";
import ReviewDetailsPage from "./views/pages/reviews/ReviewDetailsPage.jsx";
import CinemasPage from "./views/pages/cinemas/CinemasPage.jsx";
import CinemaCreatePage from "./views/pages/cinemas/CinemaCreatePage.jsx";
import CinemaDetailsPage from "./views/pages/cinemas/CinemaDetailsPage.jsx";
import TicketTypeCreatePage from "./views/pages/ticket-types/TicketTypeCreatePage.jsx";
import {Notifications} from "@mantine/notifications";
import SeatTypeCreatePage from "./views/pages/seat-types/SeatTypeCreatePage.jsx";
import ScreeningTypeCreatePage from "./views/pages/screening-types/ScreeningTypeCreatePage.jsx";

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
                element: <CinemasPage/>
            },
            {
                path: "cinemas/:id",
                element: <CinemaDetailsPage/>
            },
            {
                path: "cinemas/create",
                element: <CinemaCreatePage/>
            },
            {
                path: "movies",
                element: <MoviesPage/>
            },
            {
                path: "movies/:id",
                element: <MoviesDetailsPage/>
            },
            {
                path: "movies/create",
                element: <MoviesCreatePage/>
            },
            {
                path: "tickets",
                element: <div>Tickets</div>
            },
            {
                path: "accounts",
                element: <ClientsPage/>
            },
            {
                path: "accounts/:id",
                element: <ClientDetailsPage/>
            },
            {
                path: "reviews",
                element: <ReviewsPage/>
            },
            {
                path: "reviews/:id",
                element: <ReviewDetailsPage/>
            },
            {
                path: "vouchers",
                element: <div>Vouchers</div>
            },
            {
                path: "seat-types",
                element: <SeatTypesPage/>
            },
            {
                path: "seat-types/:id",
                element: <SeatTypeDetailsPage/>
            },
            {
                path: "seat-types/create",
                element: <SeatTypeCreatePage/>
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
                element: <TicketTypesPage/>
            },
            {
                path: "ticket-types/:id",
                element: <TicketTypeDetailsPage/>
            },
            {
                path: "ticket-types/create",
                element: <TicketTypeCreatePage/>
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
                element: <ScreeningTypesPage/>
            },
            {
                path: "screening-types/:id",
                element: <ScreeningTypeDetailsPage/>
            },
            {
                path: "screening-types/create",
                element: <ScreeningTypeCreatePage/>
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
            <Notifications/>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </MantineProvider>
    )
}

export default App
