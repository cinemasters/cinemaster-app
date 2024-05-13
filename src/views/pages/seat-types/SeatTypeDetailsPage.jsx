import {Alert, Loader, Stack, TextInput, Title} from "@mantine/core";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {hasLength, matches, useForm} from "@mantine/form";
import {IconAlertTriangle} from "@tabler/icons-react";
import CreateButton from "../../../components/buttons/CreateButton.jsx";
import UpdateButton from "../../../components/buttons/UpdateButton.jsx";

export default function SeatTypeDetailsPage() {
    const [isLoading, setLoading] = useState(false);
    const [isSaving, setSaving] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        validateInputOnBlur: true,
        initialValues: {id: -1, code: '', name: '', description: ''},
        validate: {
            name: hasLength({min: 1, max: 64}, "Nazwa musi mieć od 1 do 64 znaków."),
            code: matches(/^[A-Za-z0-9]$/, "Kod musi składać się z jednego znaku: A-Z, a-z, 0-9."),
            description: hasLength({max: 255}, "Opis może mieć maksymalnie 255 znaków.")
        }
    })

    function submitAction() {
        setSaving(true);
        let method = id === "-1" ? 'POST' : 'PUT';
        let url = `http://localhost:8080/api/seat-types${id !== '-1' ? `/${id}` : ''}`

        fetch(url, {
            method: method, credentials: 'include', body: JSON.stringify(form.getValues()), headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.success === false) {
                    setError(data?.message ?? 'Nieznany błąd.')
                } else {
                    navigate('/seat-types');
                }
            })
            .finally(() => {
                setSaving(false);
            })
            .catch((err) => {
                console.log(err)
            })

    }

    useEffect(() => {
        if (id === "-1") {
            return;
        }

        setLoading(true);

        fetch(`http://localhost:8080/api/seat-types/${id}`, {method: "GET", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    form.initialize(data);
                    setName(data.name);
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
            <Title order={1}>{`Strefy biletowe / ${id === '-1' ? 'Utwórz' : name}`}</Title>
            {error !== '' && <Alert title={`Wystąpił błąd: ${error}`} color="red" icon={<IconAlertTriangle/>}/>}
            {
                isLoading ? <Loader/> : (
                    <form onSubmit={form.onSubmit(submitAction)} onChange={() => {
                        setError('')
                    }}>
                        <Stack>
                            <TextInput key={form.key('code')} placeholder="Identyfikator strefy biletowej"
                                       label="Kod" {...form.getInputProps('code')} withAsterisk/>
                            <TextInput key={form.key('name')} placeholder="Nazwa strefy biletowej"
                                       label="Nazwa" {...form.getInputProps('name')} withAsterisk/>
                            <TextInput key={form.key('description')} placeholder="Opis strefy biletowej - opcjonalny"
                                       label="Opis" {...form.getInputProps('description')} />
                            {
                                id === "-1" ?
                                    <CreateButton isSaving={isSaving} type="submit"/> :
                                    <UpdateButton isSaving={isSaving} type="submit"/>
                            }
                        </Stack>
                    </form>
                )
            }
        </Stack>
    )
}