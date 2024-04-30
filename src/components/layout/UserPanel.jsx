import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logoutAction} from "../../actionCreators/auth.jsx";
import {ActionIcon, Group, Menu, rem, Stack, Text, useMantineColorScheme} from "@mantine/core";
import {IconLogin, IconMoon, IconSun, IconUserFilled} from "@tabler/icons-react";

export default function UserPanel() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let userData = useSelector(s => s.account.userData);
    let {colorScheme, setColorScheme} = useMantineColorScheme();

    function toggleTheme() {
        setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
    }

    function logout() {
        fetch('http://localhost:8080/api/logout', {method: "POST"})
            .finally(() => {
                dispatch(logoutAction());
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Group>
            <Stack gap={0} justify="flex-start">
                <Text ta="right">{userData?.name}</Text>
                <Text fw={700} ta="right">{userData?.surname}</Text>
            </Stack>
            <Menu width={200}>
                <Menu.Target>
                    <ActionIcon variant="default" radius="xl">
                        <IconUserFilled style={{width: "80%", height: "80%"}}/>
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={toggleTheme}
                               leftSection={
                                   colorScheme === 'light' ?
                                       <IconSun style={{width: rem(14), height: rem(14)}}/>
                                       : <IconMoon style={{width: rem(14), height: rem(14)}}/>}>
                        Przełącz motyw
                    </Menu.Item>
                    <Menu.Item onClick={logout}
                               leftSection={<IconLogin style={{width: rem(14), height: rem(14)}}/>}>
                        Wyloguj
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    )
}