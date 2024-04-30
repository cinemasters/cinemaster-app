import {Alert, Button, Container, Loader, PasswordInput, Stack, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginAction} from "../../actionCreators/auth.jsx";

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
                'Content-Type': 'application/json'
            }
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
        <Container>
            <h1>Cinemaster</h1>
            <div>
                {isError && (
                    <Alert title="Nieprawidłowe dane logowania!" color="red"/>
                )}
                <form onSubmit={login}>
                    <Stack gap="sm">
                        <TextInput required name="username" label="Nazwa użytkownika" onChange={formInputChange}/>
                        <PasswordInput required name="password" label="Hasło" onChange={formInputChange}/>
                        <Button disabled={isLoading} type="submit">Zaloguj</Button>
                        {isLoading && <Loader/>}
                    </Stack>
                </form>
            </div>
        </Container>

    )
}