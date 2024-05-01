import {useDisclosure} from "@mantine/hooks";
import {AppShell, Burger, Group, Title} from "@mantine/core";
import UserPanel from "../../components/layout/UserPanel.jsx";
import {Outlet} from "react-router-dom";
import Navigation from "../../components/layout/Navigation.jsx";

export default function Layout() {
    const [opened, {toggle}] = useDisclosure();
    return (
        <AppShell
            header={{height: 60}}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: {mobile: !opened},
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" style={{flexGrow: 0}}/>
                    <Group justify="space-between" style={{flexGrow: 1}}>
                        <Title order={2}>Cinemaster</Title>
                        <UserPanel/>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Navigation/>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    );
}