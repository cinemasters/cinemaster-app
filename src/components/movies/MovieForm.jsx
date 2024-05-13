import {useEffect, useState} from "react";
import {hasLength, isInRange, isNotEmpty, matches, useForm} from "@mantine/form";
import {
    Checkbox,
    Fieldset,
    Group,
    Loader,
    MultiSelect,
    NumberInput,
    Select,
    Stack,
    Textarea,
    TextInput
} from "@mantine/core";
import {DateInput} from "@mantine/dates";
import {useNavigate} from "react-router-dom";
import CreateButton from "../buttons/CreateButton.jsx";
import UpdateButton from "../buttons/UpdateButton.jsx";

export default function MovieForm({data}) {
    const [isLoading, setLoading] = useState(true);
    const [isSaving, setSaving] = useState(false);
    const ageRestrictions = [
        {value: 'g', label: 'Brak ograniczeń (G)'},
        {value: 'pg', label: 'Niestosowny dla dzieci (PG)'},
        {value: 'pg-13', label: 'Niestosowny dla młodzieży (PG-13)'},
        {value: 'r', label: 'Zawiera treści dla dorosłych (R)'},
        {value: 'nc-17', label: 'Ściśle dla dorosłych (NC-17)'}
    ]
    const [scrTypes, setScrTypes] = useState([])
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        validateInputOnBlur: true,
        initialValues: {
            'title': '',
            'originalTitle': '',
            'originalLanguage': '',
            'description': '',
            'cast': '',
            'director': '',
            'production': '',
            'genre': '',
            'releaseDate': null,
            'length': 1,
            'ageRestriction': 'g',
            'isVisible': true,
            'audioTypes': [],
            'videoTypes': []
        },
        validate: {
            'title': hasLength({min: 1, max: 255}, 'Tytuł musi mieć od 1 do 255 znaków.'),
            'originalTitle': hasLength({max: 255}, 'Tytuł oryginalny może składać się z maksymalnie 255 znaków.'),
            'originalLanguage': matches(/^([a-z]{2}|)$/, 'Język oryginalny może składać się z maksymalnie 2 znaków a-z (ISO 639-1).'),
            'description': hasLength({max: 2048}, 'Opis może składać się z maksymalnie 2048 znaków.'),
            'cast': hasLength({max: 255}, 'Obsada może składać się z maksymalnie 255 znaków.'),
            'director': hasLength({min: 1, max: 255}, 'Reżyser musi mieć od 1 do 255 znaków.'),
            'production': hasLength({min: 1, max: 64}, 'Produkcja musi mieć od 1 do 64 znaków.'),
            'genre': hasLength({min: 1, max: 64}, 'Gatunek może mieć maksymalnie 64 znaki.'),
            'releaseDate': isNotEmpty('Data wydania musi być ustalona.'),
            'length': isInRange({min: 1}, 'Czas trwania filmu musi być większy od zera.'),
            'ageRestriction': isNotEmpty('Ograniczenie wiekowe nie może być puste.'),
            'audioTypes': isNotEmpty('Rodzaje seansów (audio) nie mogą być puste.'),
            'videoTypes': isNotEmpty('Rodzaje seansów (wideo) nie mogą być puste.')
        }
    });

    useEffect(() => {
        fetch(`http://localhost:8080/api/screening-types`, {method: "GET", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                setScrTypes(data?.items.map((el) => ({
                    value: el.id.toString(),
                    label: el.name,
                    type: el.type
                })) ?? []);
            })
            .finally(() => {
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        if (data !== null) {
            form.initialize(data);
        }
    }, [data]);

    const isNullOrUndefined = (el) => {
        return el === undefined || el === null
    }

    function sendAction() {
        if (form.validate().hasErrors) {
            console.log('test')
            return;
        }

        let formData = form.getValues();
        formData['videoTypes'] = formData.videoTypes.map((el) => parseInt(el))
        formData['audioTypes'] = formData.audioTypes.map((el) => parseInt(el))

        setSaving(true);
        let method = isNullOrUndefined(data) ? 'POST' : 'PUT';
        let url = `http://localhost:8080/api/movies${!isNullOrUndefined(data) ? `/${data?.id}` : ''}`

        fetch(url, {
            method: method, credentials: 'include', body: JSON.stringify(formData), headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((resp) => {
                if (resp?.success === false) {
                    console.log(resp?.message ?? 'Nieznany błąd.')
                } else {
                    navigate(`/movies/${resp.data}`);
                }
            })
            .finally(() => {
                setSaving(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            {isLoading ? <Loader/> : (
                <Stack style={{flexGrow: 1}} h="100%">
                    <Group grow align="flex-start" style={{flexGrow: 1}}>
                        <Fieldset legend="Ogólne">
                            <Stack>
                                <TextInput key={form.key('title')} label="Tytuł" placeholder="Tytuł filmu"
                                           {...form.getInputProps('title')} withAsterisk/>
                                <Textarea key={form.key('description')} label="Opis" placeholder="Opis filmu"
                                          minRows={2} maxRows={4} autosize
                                          {...form.getInputProps('description')}/>
                                <TextInput key={form.key('genre')} label="Gatunek" placeholder="Gatunek filmu"
                                           {...form.getInputProps('genre')} withAsterisk/>
                                <NumberInput key={form.key('length')} label="Czas trwania [min]"
                                             placeholder="Czas trwania filmu" min={1} allowDecimal={false}
                                             {...form.getInputProps('length')} withAsterisk/>
                                <DateInput key={form.key('releaseDate')} label="Data wydania"
                                           placeholder="Data wydania w sieci"
                                           {...form.getInputProps('releaseDate')} withAsterisk/>
                            </Stack>
                        </Fieldset>
                        <Fieldset legend="Szczegóły">
                            <Stack>
                                <TextInput key={form.key('originalTitle')} label="Tytuł oryginalny"
                                           placeholder="Tytuł oryginalny filmu"
                                           {...form.getInputProps('originalTitle')}/>
                                <TextInput key={form.key('originalLanguage')} label="Język oryginalny"
                                           placeholder="Język oryginalny filmu"
                                           {...form.getInputProps('originalLanguage')}/>
                                <TextInput key={form.key('production')} label="Produkcja"
                                           placeholder="Kraj i rok produkcji filmu"
                                           {...form.getInputProps('production')} withAsterisk/>
                                <Textarea key={form.key('cast')} label="Obsada" placeholder="Obsada filmu"
                                          minRows={2} maxRows={4} autosize
                                          {...form.getInputProps('cast')}/>
                                <TextInput key={form.key('director')} label="Reżyser" placeholder="Reżyser filmu"
                                           {...form.getInputProps('director')} withAsterisk/>
                            </Stack>
                        </Fieldset>
                        <Fieldset legend="Konfiguracja">
                            <Stack>
                                <Select allowDeselect={false} key={form.key('ageRestriction')}
                                        label="Ograniczenia wiekowe" withAsterisk
                                        data={ageRestrictions} {...form.getInputProps('ageRestriction')} />
                                <MultiSelect key={form.key('videoTypes')} label="Rodzaje seansów (wideo)" withAsterisk
                                             data={scrTypes.filter((el) => el.type === 'Video')} {...form.getInputProps('videoTypes')} />
                                <MultiSelect key={form.key('audioTypes')} label="Rodzaje seansów (audio)" withAsterisk
                                             data={scrTypes.filter((el) => el.type === 'Audio')} {...form.getInputProps('audioTypes')} />
                                <Checkbox key={form.key('isVisible')}
                                          label="Film jest widoczny" {...form.getInputProps('isVisible', {type: 'checkbox'})} />
                            </Stack>
                        </Fieldset>
                    </Group>
                    <Group justify="flex-end">
                        {
                            data === null || data === undefined ?
                                <CreateButton isSaving={isSaving} createAction={sendAction}/> :
                                <UpdateButton isSaving={isSaving} createAction={sendAction}/>
                        }
                    </Group>
                </Stack>

            )}
        </>
    )
}