import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {hasLength, matches, useForm} from "@mantine/form";
import {
    Center,
    Fieldset,
    Flex,
    Group,
    Loader,
    SimpleGrid,
    Stack,
    Switch,
    Text,
    Textarea,
    TextInput
} from "@mantine/core";
import CreateButton from "../buttons/CreateButton.jsx";
import UpdateButton from "../buttons/UpdateButton.jsx";
import {TimeInput} from "@mantine/dates";
import {isNullOrUndefined} from "../../utils/ObjectUtils.jsx";

export default function CinemaForm({data}) {
    const days = ['Monday', 'Wednesday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayMap = {
        Monday: 'Poniedziałek',
        Wednesday: 'Wtorek',
        Tuesday: 'Środa',
        Thursday: 'Czwartek',
        Friday: 'Piątek',
        Saturday: 'Sobota',
        Sunday: 'Niedziela'
    }
    const [isLoading, setLoading] = useState(true);
    const [isSaving, setSaving] = useState(false);
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        validateInputOnBlur: true,
        initialValues: {
            name: '',
            description: '',
            city: '',
            street: '',
            postalCode: '',
            email: '',
            phoneNumber: ''
        },
        validate: {
            name: hasLength({min: 1, max: 255}, 'Nazwa kina musi mieć od 1 do 255 znaków.'),
            description: hasLength({max: 2048}, 'Opis kina może mieć maksymalnie 2048 znaków.'),
            email: hasLength({max: 255}, 'Adres e-mail może mieć maksymalnie 255 znaków.'),
            phoneNumber: matches(/^(|[0-9]{9})$/, 'Wprowadź prawidłowy numer telefonu.'),
            city: hasLength({min: 1, max: 255}, 'Miasto musi mieć od 1 do 255 znaków.'),
            street: hasLength({min: 1, max: 255}, 'Ulica musi mieć od 1 do 255 znaków.'),
            postalCode: matches(/^(|[0-9]{2}-[0-9]{3})$/, 'Wprowadź prawidłowy kod pocztowy.')
        }
    });
    const timeForm = useForm({
        mode: 'controlled',
        validateInputOnBlur: true,
        initialValues: {
            openingHours: days.map((el) => ({day: el, openingHour: '', closingHour: '', closed: false}))
        },
        validate: {
            openingHours: {
                closingHour: (val, vals, path) => validateTime(vals, path, 'closing'),
                openingHour: (val, vals, path) => validateTime(vals, path, 'opening')
            }
        }
    });

    useEffect(() => {
        if (data !== null) {
            form.initialize(data);
        }

        setLoading(false);
    }, [data]);

    const validateTime = (values, path, type) => {
        let idx = parseInt(path.split('.')[1]);

        let {openingHour, closingHour, closed} = values.openingHours[idx];

        if (closed) {
            return null;
        }

        if ((type === 'closing' && closingHour === '') || (type === 'opening' && openingHour === '')) {
            return 'Ustaw prawidłową godzinę.';
        }

        return closingHour > openingHour ? null : 'Nieprawidłowy zakres czasu.';
    }

    function formatOpeningHours(timeData) {
        return {
            openingHours: timeData.openingHours.map((el) => ({
                day: el.day.toUpperCase(),
                openingHour: el.closed ? null : `${el.openingHour}:00`,
                closingHour: el.closed ? null : `${el.closingHour}:00`,
                closed: el.closed
            }))
        }
    }

    function sendAction() {
        let formVal = form.validate();
        let timeVal = timeForm.validate();

        if (formVal.hasErrors || timeVal.hasErrors) {
            return;
        }

        setSaving(true);

        let sendData = {...form.getValues(), ...formatOpeningHours(timeForm.getValues())}
        let url = `http://localhost:8080/api/cinemas${!isNullOrUndefined(data) ? `/${data?.id}` : ''}`
        let method = isNullOrUndefined(data) ? 'POST' : 'PUT';

        fetch(url, {
            method: method, credentials: 'include', body: JSON.stringify(sendData), headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((resp) => {
                if (resp?.success === false) {
                    console.log(resp?.message ?? 'Nieznany błąd.')
                } else {
                    navigate(`/cinemas/${resp.data}`);
                }
            })
            .finally(() => {
                setSaving(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return <>
        {isLoading ? <Loader/> : (
            <Stack style={{flexGrow: 1}} h="100%">
                <Group grow align="flex-start" style={{flexGrow: 1}} preventGrowOverflow={false}>
                    <Stack h="100%" justify="space-between">
                        <Fieldset legend="Ogólne">
                            <Stack>
                                <TextInput key={form.key('name')} label="Nazwa" placeholder="Nazwa kina"
                                           {...form.getInputProps('name')} withAsterisk/>
                                <Textarea key={form.key('description')} label="Opis" placeholder="Opis kina"
                                          minRows={2} maxRows={4} autosize
                                          {...form.getInputProps('description')}/>
                            </Stack>
                        </Fieldset>
                        <Fieldset legend="Kontakt">
                            <Stack>
                                <TextInput key={form.key('email')} label="Adres e-mail"
                                           placeholder="Adres e-mail kontaktowy kina"
                                           {...form.getInputProps('email')}/>
                                <TextInput key={form.key('phoneNumber')} label="Numer telefonu"
                                           placeholder="Kontaktowy numer telefonu kina"
                                           {...form.getInputProps('phoneNumber')}/>
                            </Stack>
                        </Fieldset>
                        <Fieldset legend="Dane adresowe">
                            <Stack>
                                <Group grow>
                                    <TextInput key={form.key('city')} label="Miasto"
                                               placeholder="Miasto, w którym jest kino" withAsterisk
                                               {...form.getInputProps('city')}/>
                                    <TextInput key={form.key('street')} label="Ulica"
                                               placeholder="Ulica na której jest kino" withAsterisk
                                               {...form.getInputProps('street')}/>
                                </Group>
                                <TextInput key={form.key('postalCode')} label="Kod pocztowy"
                                           placeholder="Kod pocztowy obszaru na którym jest kino"
                                           {...form.getInputProps('postalCode')}/>
                            </Stack>
                        </Fieldset>
                    </Stack>
                    <Fieldset h="100%" legend="Godziny otwarcia">
                        <SimpleGrid h="100%" cols={4}>
                            {timeForm.getValues().openingHours.map((el, idx) => (
                                <React.Fragment key={idx}>
                                    <Flex align="center">
                                        <Text>{dayMap[el.day]}</Text>
                                    </Flex>
                                    <TimeInput label="Otwarcie"
                                               key={timeForm.key(`openingHours.${idx}.openingHour`)}
                                               disabled={el.closed}
                                               {...timeForm.getInputProps(`openingHours.${idx}.openingHour`)}/>
                                    <TimeInput label="Zamknięcie"
                                               key={timeForm.key(`openingHours.${idx}.closingHour`)}
                                               disabled={el.closed}
                                               {...timeForm.getInputProps(`openingHours.${idx}.closingHour`)}/>
                                    <Center>
                                        <Switch label="Zamknięte"
                                                key={timeForm.key(`openingHours.${idx}.closed`)}
                                                {...timeForm.getInputProps(`openingHours.${idx}.closed`)}/>
                                    </Center>
                                </React.Fragment>
                            ))}
                        </SimpleGrid>
                    </Fieldset>
                </Group>
                <Group justify="flex-end">
                    {
                        data === null || data === undefined ?
                            <CreateButton createAction={sendAction} isSaving={isSaving}/> :
                            <UpdateButton updateAction={sendAction} isSaving={isSaving}/>
                    }
                </Group>
            </Stack>

        )}
    </>
}