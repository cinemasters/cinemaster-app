import {Stack, Title} from "@mantine/core";
import SeatTypeForm from "../../../components/seat-types/SeatTypeForm.jsx";

export default function SeatTypeCreatePage() {
    return (
        <Stack>
            <Title order={1}>Utwórz strefę biletową</Title>
            <SeatTypeForm/>
        </Stack>
    )
}