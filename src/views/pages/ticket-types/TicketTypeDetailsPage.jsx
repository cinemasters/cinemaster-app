import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Loader, Stack, Title} from "@mantine/core";
import {isNullOrUndefined} from "../../../utils/ObjectUtils.jsx";
import TicketTypeForm from "../../../components/ticket-types/TicketTypeForm.jsx";

export default function TicketTypeDetailsPage() {
    const [isLoading, setLoading] = useState(false);
    const [ticketType, setTicketType] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/ticket-types/${id}`, {method: "GET", credentials: "include"})
            .then((res) => res?.json())
            .then((data) => {
                if (!isNullOrUndefined(data)) {
                    setTicketType(data);
                } else {
                    navigate("/ticket-types");
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
        <Stack>
            <Title order={1}>{`Rodzaje biletów / ${ticketType?.name ?? '...'}`}</Title>
            {
                isLoading ? <Loader/> : <TicketTypeForm data={ticketType}/>
            }
        </Stack>
    )
}