import {Alert, Button, Container, Loader, Paper, PasswordInput, Stack, TextInput, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginAction} from "../../actionCreators/auth.jsx";
import {IconAlertTriangle} from "@tabler/icons-react";

export default function LoginPage() {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let isAuthenticated = useSelector(state => state.account.isAuthenticated);

    const formInputChange = () => {
        setError(false);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated])

    async function login(e) {
        e.preventDefault();

        let loginData = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        setLoading(true);

        fetch('http://localhost:8080/api/login', {
            method: "POST", body: JSON.stringify(loginData), headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(loginAction(data));
            })
            .finally(() => {
                setLoading(false);
            })
            .catch((err) => {
                setError(true);
                console.log(err)
            })
    }

    return (
        <Container w="30em" mt="25vh">
            <Title order={1} mb="0.5em" ta="center">Cinemaster</Title>
            <Paper withBorder p="lg" shadow="sm" radius="md">
                <form onSubmit={login}>
                    <Stack gap="sm">
                        {isError && (
                            <Alert title="Nieprawidłowe dane logowania!" color="red" icon={<IconAlertTriangle/>}
                                   autocontrast/>
                        )}
                        <TextInput required placeholder="Wprowadź nazwę użytkownika..." name="username"
                                   label="Nazwa użytkownika" onChange={formInputChange}/>
                        <PasswordInput required placeholder="Wprowadź hasło..." name="password" label="Hasło"
                                       onChange={formInputChange}/>
                        <Button disabled={isLoading} type="submit">{isLoading ? "Logowanie..." : "Zaloguj"}</Button>
                        {isLoading && <Loader m="auto"/>}
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}