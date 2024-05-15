import {useEffect, useState} from "react";
import {ActionIcon, Checkbox, Loader, Pagination, Rating, Stack, Table, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {IconEye} from "@tabler/icons-react";

export default function ReviewsPage() {
    const [isLoading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/reviews?size=15&page=${currentPage - 1}`, {
            method: "GET",
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    setReviews(data.items)
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
            <Title order={1}>Recenzje</Title>
            <Stack style={{flexGrow: 1}} justify="space-between">
                {isLoading ? <Loader/> : (
                    <>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Data publikacji</Table.Th>
                                    <Table.Th>Film</Table.Th>
                                    <Table.Th>Użytkownik</Table.Th>
                                    <Table.Th>Ocena</Table.Th>
                                    <Table.Th>Ukryty</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {
                                    reviews.map((el) => (
                                        <Table.Tr key={el.id}>
                                            <Table.Td>{new Date(el.publicationDate).toLocaleString()}</Table.Td>
                                            <Table.Td>{el.movie}</Table.Td>
                                            <Table.Td>{el.client}</Table.Td>
                                            <Table.Td>
                                                <Rating value={el.rating} onChange={() => {
                                                }} fractions={10} readOnly/>
                                            </Table.Td>
                                            <Table.Td><Checkbox onChange={() => {
                                            }} checked={el.hidden}/></Table.Td>
                                            <Table.Td>
                                                <ActionIcon component={Link} to={`/reviews/${el.id}`}
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
        </Stack>
    )
}