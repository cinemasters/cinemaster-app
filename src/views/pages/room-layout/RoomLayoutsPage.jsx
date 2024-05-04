import {useEffect, useState} from "react";
import {ActionIcon, Button, Group, Loader, Pagination, Stack, Table, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {IconEye, IconPlus} from "@tabler/icons-react";

export default function RoomLayoutsPage() {
    const [isLoading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [layoutData, setLayoutData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/room-layouts?size=15&page=${currentPage - 1}`, {
            method: "GET",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    setLayoutData(data.items)
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
            <Title order={1}>Układy sal kinowych</Title>
            <Stack style={{flexGrow: 1}} justify="space-between">
                {isLoading ? <Loader/> : (
                    <>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Nazwa</Table.Th>
                                    <Table.Th># miejsc</Table.Th>
                                    <Table.Th># rzędów</Table.Th>
                                    <Table.Th># użyć</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {
                                    layoutData.map((el) => (
                                        <Table.Tr key={el.id}>
                                            <Table.Td>{el.name}</Table.Td>
                                            <Table.Td>{el.seatCount}</Table.Td>
                                            <Table.Td>{el.rowCount}</Table.Td>
                                            <Table.Td>{el.useCount}</Table.Td>
                                            <Table.Td>
                                                <ActionIcon component={Link} to={`/layouts/${el.id}`}
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
                <Button component={Link} to="/layouts/create" radius="lg"
                        rightSection={<IconPlus style={{width: "80%", height: "80%"}}/>}>Utwórz</Button>
            </Group>
        </Stack>
    )
}