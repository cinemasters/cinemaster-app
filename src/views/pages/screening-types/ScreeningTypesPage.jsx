import {useEffect, useState} from "react";
import {ActionIcon, Group, Loader, Pagination, Stack, Table, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {IconEdit} from "@tabler/icons-react";
import CreateButton from "../../../components/buttons/CreateButton.jsx";
import {isNullOrUndefined} from "../../../utils/ObjectUtils.jsx";

export default function ScreeningTypesPage() {
    const [isLoading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [screeningData, setScreeningData] = useState([])
    const typeMap = {
        'Video': 'Wideo',
        'Audio': 'Audio'
    }

    useEffect(() => {
        fetch(`http://localhost:8080/api/screening-types?size=15&page=${currentPage - 1}`, {
            method: "GET",
            credentials: "include"
        })
            .then((res) => res?.json())
            .then((data) => {
                if (!isNullOrUndefined(data)) {
                    setScreeningData(data.items)
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
            <Title order={1}>Rodzaje seansów</Title>
            <Stack style={{flexGrow: 1}} justify="space-between">
                {isLoading ? <Loader/> : (
                    <>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Nazwa</Table.Th>
                                    <Table.Th>Typ</Table.Th>
                                    <Table.Th>Opis</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {
                                    screeningData.map((el) => (
                                        <Table.Tr key={el.id}>
                                            <Table.Td>{el.name}</Table.Td>
                                            <Table.Td>{typeMap[el.type]}</Table.Td>
                                            <Table.Td>{el.description}</Table.Td>
                                            <Table.Td>
                                                <ActionIcon component={Link} to={`/screening-types/${el.id}`}
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
                <CreateButton component={Link} to="/screening-types/create"/>
            </Group>
        </Stack>
    )
}