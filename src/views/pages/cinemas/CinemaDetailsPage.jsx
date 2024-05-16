import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Group, Loader, rem, Stack, Tabs, Title} from "@mantine/core";
import {IconInfoCircle, IconPhoto, IconUserScreen} from "@tabler/icons-react";
import CinemaForm from "../../../components/cinemas/CinemaForm.jsx";

export default function CinemaDetailsPage() {
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [cinema, setCinema] = useState(null);
    const [tab, setTab] = useState('info')
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/cinemas/${id}`, {method: "GET", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    setCinema(data);
                } else {
                    navigate("/cinemas");
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
                <Title order={1}>{`Kina / ${cinema?.name ?? '...'}`}</Title>
                <Tabs value={tab} onChange={setTab}>
                    <Tabs.List>
                        <Tabs.Tab value="info" leftSection={<IconInfoCircle size={rem(12)}/>}>Informacje</Tabs.Tab>
                        <Tabs.Tab value="rooms" leftSection={<IconPhoto size={rem(12)}/>}>Sale</Tabs.Tab>
                        <Tabs.Tab value="screening" leftSection={<IconUserScreen size={rem(12)}/>}>Seanse</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </Group>
            {
                isLoading ? <Loader/> :
                    (
                        <Tabs value={tab} h="100%">
                            <Tabs.Panel value="info" h="100%">
                                <CinemaForm data={cinema}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="rooms">sale</Tabs.Panel>
                            <Tabs.Panel value="screening">seanse</Tabs.Panel>
                        </Tabs>
                    )
            }
        </Stack>
    )
}