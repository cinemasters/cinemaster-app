import {Stack, Title} from "@mantine/core";
import CinemaForm from "../../../components/cinemas/CinemaForm.jsx";

export default function CinemaCreatePage() {
    return (
        <Stack w="100%">
            <Title order={1}>Utwórz kino</Title>
            <CinemaForm style={{flexGrow: 1}}/>
        </Stack>
    )
}