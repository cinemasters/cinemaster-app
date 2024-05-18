import {Stack, Title} from "@mantine/core";
import TicketTypeForm from "../../../components/ticket-types/TicketTypeForm.jsx";

export default function TicketTypeCreatePage() {
    return (
        <Stack>
            <Title order={1}>Utwórz rodzaj biletów</Title>
            <TicketTypeForm/>
        </Stack>
    )
}