import {Alert, Button, Container, Loader, PasswordInput, Stack, TextInput} from "@mantine/core";
import {useState} from "react";

export default function LoginPage() {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);

    const formInputChange = () => {
        setError(false);
    }

    async function login(e) {
        e.preventDefault();

        let loginData = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        setLoading(true);

        fetch('http://localhost:8080/api/login', {method: "POST", body: JSON.stringify(loginData)})
            .then((res) => res.json())
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