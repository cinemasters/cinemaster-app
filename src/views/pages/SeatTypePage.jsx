import {ActionIcon, Button, Group, Loader, Pagination, Stack, Table, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconEdit, IconPlus} from "@tabler/icons-react";
import {Link} from "react-router-dom";

export default function SeatTypePage() {
    const [isLoading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [seatData, setSeatData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/seat-types?size=15&page=${currentPage - 1}`, {
            method: "GET",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    setSeatData(data.items)
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
            <Title order={1}>Strefy biletowe</Title>
            <Stack style={{flexGrow: 1}} justify="space-between">
                {isLoading ? <Loader/> : (
                    <>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Kod</Table.Th>
                                    <Table.Th>Nazwa</Table.Th>
                                    <Table.Th>Opis</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {
                                    seatData.map((el) => (
                                        <Table.Tr key={el.id}>
                                            <Table.Td>{el.code}</Table.Td>
                                            <Table.Td>{el.name}</Table.Td>
                                            <Table.Td>{el.description}</Table.Td>
                                            <Table.Td>
                                                <ActionIcon component={Link} to={`/seat-types/${el.id}`}
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
            <Group justify="flex-end">
                <Button component={Link} to="/seat-types/-1" radius="lg"
                        rightSection={<IconPlus style={{width: "80%", height: "80%"}}/>}>Utwórz</Button>
            </Group>
        </Stack>
    )
}