import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {hasLength, useForm} from "@mantine/form";
import {Alert, Button, Group, Loader, Radio, Stack, TextInput, Title} from "@mantine/core";
import {IconAlertTriangle} from "@tabler/icons-react";

export default function ScreeningTypeDetailsPage() {
    const [isLoading, setLoading] = useState(false);
    const [isSaving, setSaving] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {id: -1, type: 'Video', name: '', description: ''},
        validate: {
            name: hasLength({min: 1, max: 64}, "Nazwa musi mieć od 1 do 64 znaków."),
            description: hasLength({max: 255}, "Opis może mieć maksymalnie 255 znaków.")
        }
    })

    function submitAction() {
        setSaving(true);
        let method = id === "-1" ? 'POST' : 'PUT';
        let url = `http://localhost:8080/api/screening-types${id !== '-1' ? `/${id}` : ''}`

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
                    navigate('/screening-types');
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

        fetch(`http://localhost:8080/api/screening-types/${id}`, {method: "GET", credentials: "include"})
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
            <Title order={1}>{`Rodzaje seansów / ${id === '-1' ? 'Utwórz' : name}`}</Title>
            {error !== '' && <Alert title={`Wystąpił błąd: ${error}`} color="red" icon={<IconAlertTriangle/>}/>}
            {
                isLoading ? <Loader/> : (
                    <form onSubmit={form.onSubmit(submitAction)} onChange={() => {
                        setError('')
                    }}>
                        <Stack>
                            <Radio.Group key={form.key('type')} label='Typ' {...form.getInputProps('type')}>
                                <Group mt='xs'>
                                    <Radio value='Video' label='Wideo'/>
                                    <Radio value='Audio' label='Audio'/>
                                </Group>
                            </Radio.Group>
                            <TextInput key={form.key('name')} placeholder="Nazwa rodzaju seansów"
                                       label="Nazwa" {...form.getInputProps('name')} />
                            <TextInput key={form.key('description')} placeholder="Opis rodzaju seansów - opcjonalny"
                                       label="Opis" {...form.getInputProps('description')} />
                            <Button disabled={isSaving} type='submit'>{id === "-1" ? 'Utwórz' : 'Zaktualizuj'}</Button>
                            {isSaving && <Loader/>}
                        </Stack>
                    </form>
                )
            }
        </Stack>
    )
}