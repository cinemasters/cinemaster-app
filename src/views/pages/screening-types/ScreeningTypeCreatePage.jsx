import {Stack, Title} from "@mantine/core";
import ScreeningTypeForm from "../../../components/screening-types/ScreeningTypeForm.jsx";

export default function ScreeningTypeCreatePage() {
    return (
        <Stack>
            <Title order={1}>Utwórz rodzaj seansu</Title>
            <ScreeningTypeForm/>
        </Stack>
    )
}