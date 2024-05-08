import {Stack, Title} from "@mantine/core";
import MovieForm from "../../../components/movies/MovieForm.jsx";

export default function MoviesCreatePage() {
    return (
        <Stack w="100%">
            <Title order={1}>Utwórz film</Title>
            <MovieForm style={{flexGrow:1}}/>
        </Stack>
    )
}