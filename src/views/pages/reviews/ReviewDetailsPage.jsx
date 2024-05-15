import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Badge, Blockquote, Button, Checkbox, Group, Loader, Rating, rem, Stack, Text, Title} from "@mantine/core";
import {IconEye, IconEyeOff} from "@tabler/icons-react";

export default function ReviewDetailsPage() {
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [isSaving, setSaving] = useState(false);
    const [review, setReview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/reviews/${id}`, {method: "GET", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    setReview(data);
                } else {
                    navigate("/reviews");
                }
            })
            .finally(() => {
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    function toggleAction() {
        setSaving(true)

        fetch(`http://localhost:8080/api/reviews/${id}/toggleVisibility`, {method: "POST", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                if (data?.success) {
                    setReview({
                        ...review,
                        hidden: data?.data ?? review.hidden
                    });
                }
            })
            .finally(() => {
                setSaving(false)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <Stack w="100%">
            <Title order={1}>{`Recenzje / ${review?.id ?? '...'}`}</Title>
            {
                isLoading ? <Loader/> :
                    (
                        <>
                            <Group style={{flexGrow: 1}} align="flex-start">
                                <Stack>
                                    <Badge>Film</Badge>
                                    <Text>{review?.movie}</Text>
                                    <Badge>Data wystawienia</Badge>
                                    <Text>{new Date(review?.publicationDate).toLocaleString()}</Text>
                                    <Badge>Ocena</Badge>
                                    <Rating value={review?.rating} onChange={() => {
                                    }} fractions={10} readOnly/>
                                    <Badge>Ukryta</Badge>
                                    <Checkbox onChange={() => {
                                    }} checked={review?.hidden}/>
                                </Stack>
                                <Stack w={rem(600)}>
                                    <Badge>Komentarz</Badge>
                                    <Blockquote cite={review?.client}>
                                        {review?.comment}
                                    </Blockquote>
                                </Stack>
                            </Group>
                            <Group justify="flex-end">
                                {isSaving && <Loader/>}
                                <Button onClick={toggleAction} radius="lg" rightSection={review?.hidden ?
                                    <IconEye style={{width: "80%", height: "80%"}}/> : <IconEyeOff style={{
                                        width: "80%",
                                        height: "80%"
                                    }}/>}>{review?.hidden ? 'Odkryj' : 'Ukryj'}</Button>
                            </Group>
                        </>
                    )
            }
        </Stack>
    )
}