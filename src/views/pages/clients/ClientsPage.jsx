import {useEffect, useState} from "react";
import {ActionIcon, Checkbox, Loader, Pagination, Stack, Table, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {IconEdit} from "@tabler/icons-react";

export default function ClientsPage() {
    const [isLoading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [clients, setClients] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/clients?size=15&page=${currentPage - 1}`, {
            method: "GET",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    setClients(data.items)
                    setCurrentPage(data.pageNumber + 1)
                    setTotalPages(data.totalPages)
                }
            })
            .finally(() => {
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [currentPage]);

    return (
        <Stack w="100%">
            <Title order={1}>Konta użytkowników</Title>
            <Stack style={{flexGrow: 1}} justify="space-between">
                {isLoading ? <Loader/> : (
                    <>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>E-mail</Table.Th>
                                    <Table.Th>Imię</Table.Th>
                                    <Table.Th>Nazwisko</Table.Th>
                                    <Table.Th>Subskrybujący ofert</Table.Th>
                                    <Table.Th>Zablokowany</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {
                                    clients.map((el) => (
                                        <Table.Tr key={el.id}>
                                            <Table.Td>{el.email}</Table.Td>
                                            <Table.Td>{el.name}</Table.Td>
                                            <Table.Td>{el.surname}</Table.Td>
                                            <Table.Td><Checkbox onChange={() => {
                                            }} checked={el.offerSubscribed}/></Table.Td>
                                            <Table.Td><Checkbox onChange={() => {
                                            }} checked={el.locked}/></Table.Td>
                                            <Table.Td>
                                                <ActionIcon component={Link} to={`/accounts/${el.id}`}
                                                            variant="default" radius="xl">
                                                    <IconEdit style={{height: "60%", width: "60%"}}/>
                                                </ActionIcon>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                }
                            </Table.Tbody>
                        </Table>
                        <Pagination value={currentPage} onChange={setCurrentPage} total={totalPages}/>
                    </>
                )}
            </Stack>
        </Stack>
    )
}