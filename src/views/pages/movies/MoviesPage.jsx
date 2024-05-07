import {useEffect, useState} from "react";
import {ActionIcon, Button, Checkbox, Group, Loader, Pagination, Stack, Table, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {IconEdit, IconPlus} from "@tabler/icons-react";

export default function MoviesPage() {
    const [isLoading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/movies?size=15&page=${currentPage - 1}`, {
            method: "GET",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    setMovies(data.items)
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
            <Title order={1}>Filmy</Title>
            <Stack style={{flexGrow: 1}} justify="space-between">
                {isLoading ? <Loader/> : (
                    <>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Nazwa</Table.Th>
                                    <Table.Th>Produkcja</Table.Th>
                                    <Table.Th>Gatunek</Table.Th>
                                    <Table.Th>Data wydania</Table.Th>
                                    <Table.Th>Widoczny</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {
                                    movies.map((el) => (
                                        <Table.Tr key={el.id}>
                                            <Table.Td>{el.name}</Table.Td>
                                            <Table.Td>{el.production}</Table.Td>
                                            <Table.Td>{el.genre}</Table.Td>
                                            <Table.Td>{el.releaseDate}</Table.Td>
                                            <Table.Td><Checkbox checked={el.isVisible} /></Table.Td>
                                            <Table.Td>
                                                <ActionIcon component={Link} to={`/movies/${el.id}`}
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
                <Button component={Link} to="/movies/create" radius="lg"
                        rightSection={<IconPlus style={{width: "80%", height: "80%"}}/>}>Utwórz</Button>
            </Group>
        </Stack>
    )
}