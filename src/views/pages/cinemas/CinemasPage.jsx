import {useEffect, useState} from "react";
import {ActionIcon, Badge, Group, Loader, Pagination, Stack, Table, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {IconEye} from "@tabler/icons-react";
import CreateButton from "../../../components/buttons/CreateButton.jsx";

export default function CinemasPage() {
    const [isLoading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [cinemas, setCinemas] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/cinemas?size=15&page=${currentPage - 1}`, {
            method: "GET",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    setCinemas(data.items)
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
            <Title order={1}>Kina</Title>
            <Stack style={{flexGrow: 1}} justify="space-between">
                {isLoading ? <Loader/> : (
                    <>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Nazwa</Table.Th>
                                    <Table.Th>Miasto</Table.Th>
                                    <Table.Th>Email</Table.Th>
                                    <Table.Th>Telefon</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {
                                    cinemas.map((el) => (
                                        <Table.Tr key={el.id}>
                                            <Table.Td>{el.name}</Table.Td>
                                            <Table.Td>{el.city}</Table.Td>
                                            <Table.Td>{el.email}</Table.Td>
                                            <Table.Td>{el.phoneNumber}</Table.Td>
                                            <Table.Td>{el.open ? <Badge color="green">Otwarte</Badge> :
                                                <Badge color="red">Zamknięte</Badge>}</Table.Td>
                                            <Table.Td>
                                                <ActionIcon component={Link} to={`/cinemas/${el.id}`}
                                                            variant="default" radius="xl">
                                                    <IconEye style={{height: "60%", width: "60%"}}/>
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
            <Group justify="flex-end">
                <CreateButton component={Link} to="/cinemas/create"/>
            </Group>
        </Stack>
    )
}