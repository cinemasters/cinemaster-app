import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Group, Loader, rem, Stack, Tabs, Title} from "@mantine/core";
import MovieForm from "../../../components/movies/MovieForm.jsx";
import {IconInfoCircle, IconPhoto, IconUserScreen} from "@tabler/icons-react";

export default function MoviesDetailsPage() {
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const [tab, setTab] = useState('info')
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/movies/${id}`, {method: "GET", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    data['videoTypes'] = data.videoTypes.map(e => e.toString())
                    data['audioTypes'] = data.audioTypes.map(e => e.toString())
                    data['releaseDate'] = new Date(data['releaseDate'])
                    setMovie(data);
                } else {
                    navigate("/movies");
                }
            })
            .finally(() => {
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <Stack w="100%">
            <Group justify="space-between">
                <Title order={1}>{`Filmy / ${movie?.title ?? '...'}`}</Title>
                <Tabs value={tab} onChange={setTab}>
                    <Tabs.List>
                        <Tabs.Tab value="info" leftSection={<IconInfoCircle size={rem(12)}/>}>Informacje</Tabs.Tab>
                        <Tabs.Tab value="media" leftSection={<IconPhoto size={rem(12)}/>}>Multimedia</Tabs.Tab>
                        <Tabs.Tab value="screening" leftSection={<IconUserScreen size={rem(12)}/>}>Seanse</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </Group>
            {
                isLoading ? <Loader/> :
                    (
                        <Tabs value={tab} h="100%">
                            <Tabs.Panel value="info" h="100%">
                                <MovieForm data={movie}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="media">media</Tabs.Panel>
                            <Tabs.Panel value="screening">seanse</Tabs.Panel>
                        </Tabs>
                    )
            }
        </Stack>
    )
}