import {Loader, Stack, Title} from "@mantine/core";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {isNullOrUndefined} from "../../../utils/ObjectUtils.jsx";
import SeatTypeForm from "../../../components/seat-types/SeatTypeForm.jsx";

export default function SeatTypeDetailsPage() {
    const [isLoading, setLoading] = useState(true);
    const [seatType, setSeatType] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/seat-types/${id}`, {method: "GET", credentials: "include"})
            .then((res) => res?.json())
            .then((data) => {
                if (!isNullOrUndefined(data)) {
                    setSeatType(data);
                } else {
                    navigate("/seat-types");
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
            <Title order={1}>{`Strefy biletowe / ${seatType?.name ?? '...'}`}</Title>
            {
                isLoading ? <Loader/> : <SeatTypeForm data={seatType}/>
            }
        </Stack>
    )
}