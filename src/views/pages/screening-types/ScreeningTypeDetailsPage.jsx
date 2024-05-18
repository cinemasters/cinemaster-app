import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Loader, Stack, Title} from "@mantine/core";
import {isNullOrUndefined} from "../../../utils/ObjectUtils.jsx";
import ScreeningTypeForm from "../../../components/screening-types/ScreeningTypeForm.jsx";

export default function ScreeningTypeDetailsPage() {
    const [isLoading, setLoading] = useState(false);
    const [screeningType, setScreeningType] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/screening-types/${id}`, {method: "GET", credentials: "include"})
            .then((res) => res?.json())
            .then((data) => {
                if (!isNullOrUndefined(data)) {
                    setScreeningType(data);
                } else {
                    navigate("/screening-types");
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
            <Title order={1}>{`Rodzaje seansów / ${screeningType?.name ?? '...'}`}</Title>
            {
                isLoading ? <Loader/> : <ScreeningTypeForm data={screeningType}/>
            }
        </Stack>
    )
}