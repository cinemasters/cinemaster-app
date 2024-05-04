import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {hasLength, useForm} from "@mantine/form";
import {Alert, Button, Group, Loader, NumberInput, Radio, Select, Stack, TextInput, Title} from "@mantine/core";
import {IconAlertTriangle} from "@tabler/icons-react";

export default function TicketPerkDetailsPage() {
    const [isLoading, setLoading] = useState(false);
    const [isSaving, setSaving] = useState(false);
    const [seatTypeData, setSeatTypeData] = useState([]);
    const [screeningTypeData, setScreeningTypeData] = useState([]);
    const [mode, setMode] = useState('SeatType');
    const [name, setName] = useState('');
    const [error, setError] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        validateInputOnBlur: true,
        initialValues: {
            id: -1,
            name: '',
            description: '',
            charge: 0,
            type: 'SeatType',
            seatTypeId: '-1',
            screeningTypeId: '-1'
        },
        validate: {
            name: hasLength({min: 1, max: 64}, "Nazwa musi mieć od 1 do 64 znaków."),
            description: hasLength({max: 255}, "Opis może mieć maksymalnie 255 znaków."),
            charge: (value) => (value === 0 || (value?.toString() ?? '') === '' ? "Opłata nie może być równa zero." : null),
            seatTypeId: (value, values) => (values.type === 'SeatType' && (value === '-1' || isNullOrUndefined(value)) ? 'Wybierz prawidłową strefę biletową.' : null),
            screeningTypeId: (value, values) => (values.type === 'ScreeningType' && (value === '-1' || isNullOrUndefined(value)) ? 'Wybierz prawidłowy rodzaj seansu.' : null)
        },
        transformValues: (values) => ({
            ...values,
            seatTypeId: values.type === 'SeatType' ? parseInt(values.seatTypeId ?? '-1') : null,
            screeningTypeId: values.type === 'ScreeningType' ? parseInt(values.screeningTypeId ?? '-1') : null
        })
    })

    const isNullOrUndefined = (val) => {
        return val === null || val === undefined
    }

    form.watch('type', ({value}) => {
        setMode(value);
    });

    function submitAction() {
        setSaving(true);
        let method = id === "-1" ? 'POST' : 'PUT';
        let url = `http://localhost:8080/api/ticket-perks${id !== '-1' ? `/${id}` : ''}`

        fetch(url, {
            method: method, credentials: 'include', body: JSON.stringify(form.getTransformedValues()), headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.success === false) {
                    setError(data?.message ?? 'Nieznany błąd.')
                } else {
                    navigate('/perks');
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
        setLoading(true);

        fetch(`http://localhost:8080/api/seat-types/usable?perkId=${id}`, {method: "GET", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    setSeatTypeData(data.map((val) => {
                        return {
                            value: val.id.toString(),
                            label: val.name
                        }
                    }));
                }
            })
            .catch((err) => {
                console.log(err)
            })

        fetch(`http://localhost:8080/api/screening-types/usable?perkId=${id}`, {method: "GET", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    setScreeningTypeData(data.map((val) => {
                        return {
                            value: val.id.toString(),
                            label: val.name
                        }
                    }));
                }
            })
            .catch((err) => {
                console.log(err)
            })

        if (id === "-1") {
            setLoading(false);
            return;
        }

        fetch(`http://localhost:8080/api/ticket-perks/${id}`, {method: "GET", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    // mantine requires string as Select's value
                    data['seatTypeId'] = data['seatTypeId']?.toString() ?? null
                    data['screeningTypeId'] = data['screeningTypeId']?.toString() ?? null
                    setMode(data['type'])
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
            <Title order={1}>{`Dopłaty do biletów / ${id === '-1' ? 'Utwórz' : name}`}</Title>
            {error !== '' && <Alert title={`Wystąpił błąd: ${error}`} color="red" icon={<IconAlertTriangle/>}/>}
            {
                isLoading ? <Loader/> : (
                    <form onSubmit={form.onSubmit(submitAction)} onChange={() => {
                        setError('')
                    }}>
                        <Stack>
                            <TextInput key={form.key('name')} placeholder="Nazwa dopłaty"
                                       label="Nazwa" {...form.getInputProps('name')} withAsterisk/>
                            <TextInput key={form.key('description')} placeholder="Opis dopłaty - opcjonalny"
                                       label="Opis" {...form.getInputProps('description')} />
                            <NumberInput key={form.key('charge')} placeholder="Dopłata do biletu"
                                         label="Dopłata [zł]" {...form.getInputProps('charge')} step={0.01}
                                         decimalScale={2} fixedDecimalScale withAsterisk/>
                            <Radio.Group label="Rodzaj" key={form.key('type')} {...form.getInputProps('type')}
                                         withAsterisk>
                                <Group mt="xs">
                                    <Radio value="SeatType" label='Strefa biletowa'/>
                                    <Radio value="ScreeningType" label='Rodzaj seansu'/>
                                </Group>
                            </Radio.Group>
                            {mode === 'SeatType' && (
                                <Select label="Strefa biletowa" placeholder="Wybierz strefę biletową..."
                                        key={form.key('seatTypeId')} {...form.getInputProps('seatTypeId')}
                                        data={seatTypeData} withAsterisk/>)}
                            {mode === 'ScreeningType' && (
                                <Select label="Rodzaj seansu" placeholder="Wybierz rodzaj seansu..."
                                        key={form.key('screeningTypeId')} {...form.getInputProps('screeningTypeId')}
                                        data={screeningTypeData} withAsterisk/>)}

                            <Button disabled={isSaving} type='submit'>{id === "-1" ? 'Utwórz' : 'Zaktualizuj'}</Button>
                            {isSaving && <Loader/>}
                        </Stack>
                    </form>
                )
            }
        </Stack>
    )
}