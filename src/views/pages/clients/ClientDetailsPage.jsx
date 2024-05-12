import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Group, Loader, rem, Stack, Tabs, Title} from "@mantine/core";
import {IconInfoCircle, IconPhoto} from "@tabler/icons-react";
import ClientForm from "../../../components/clients/ClientForm.jsx";

export default function ClientDetailsPage() {
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [client, setClient] = useState(null);
    const [tab, setTab] = useState('info')
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/clients/${id}`, {method: "GET", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    setClient(data);
                } else {
                    navigate("/accounts");
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
                <Title order={1}>{`Konta / ${client?.email ?? '...'}`}</Title>
                <Tabs value={tab} onChange={setTab}>
                    <Tabs.List>
                        <Tabs.Tab value="info" leftSection={<IconInfoCircle size={rem(12)}/>}>Informacje</Tabs.Tab>
                        <Tabs.Tab value="tickets" leftSection={<IconPhoto size={rem(12)}/>}>Bilety</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
            </Group>
            {
                isLoading ? <Loader/> :
                    (
                        <Tabs value={tab} h="100%">
                            <Tabs.Panel value="info" h="100%">
                                <ClientForm data={client}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="tickets">bilety</Tabs.Panel>
                        </Tabs>
                    )
            }
        </Stack>
    )
}