import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Center, Group, Loader, Paper, Pill, Stack, Text, Title} from "@mantine/core";
import {IconEyeOff} from "@tabler/icons-react";

export default function RoomLayoutDetailsPage() {
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [layout, setLayout] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/room-layouts/${id}`, {method: "GET", credentials: "include"})
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp)
                if (resp !== null && resp !== undefined) {
                    setLayout(resp);
                } else {
                    navigate('/room-layouts');
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
        <Stack>
            <Title order={1}>{`Układy sal kinowych / ${layout?.name ?? '...'}`}</Title>
            {isLoading ? <Loader/> : (
                <Group>
                    <Stack>
                        <Title ta={"center"} order={3}>PODGLĄD</Title>
                        <Paper withBorder bg="var(--mantine-color-gray-light)" p="xs" shadow="xl">
                            <Title order={4} ta="center">EKRAN</Title>
                        </Paper>
                        <div style={{
                            display: 'grid', gap: `10px 0`, margin: '0 auto',
                            gridTemplateColumns: `repeat(${layout.columnCount}, minmax(50px,50px))`
                        }}>
                            {
                                layout.seats.map((el, it) => (
                                    <Center key={it} p="sm" bg="var(--mantine-color-gray-light)" w={40} h={40}
                                            style={{cursor: "default"}}>
                                        {el.isHidden ? <IconEyeOff/> : el.code}
                                    </Center>
                                ))
                            }
                        </div>
                    </Stack>
                    <Stack>
                        <Pill size="lg"># rzędów</Pill>
                        <Text>{layout.rowCount}</Text>
                        <Pill size="lg"># maks. miejsc w rzędzie</Pill>
                        <Text>{layout.columnCount}</Text>
                        <Pill size="lg"># miejsc</Pill>
                        <Text>{layout.seats.filter(el => !el.isHidden).length}</Text>
                    </Stack>
                </Group>
            )}
        </Stack>
    )
}