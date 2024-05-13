import {useEffect, useState} from "react";
import {hasLength, isEmail, matches, useForm} from "@mantine/form";
import {Checkbox, Group, Loader, PasswordInput, rem, Stack, TextInput} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import UpdateButton from "../buttons/UpdateButton.jsx";

export default function ClientForm({data}) {
    const [isLoading, setLoading] = useState(true);
    const [isSaving, setSaving] = useState(false);
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        validateInputOnBlur: true,
        initialValues: {
            'name': '',
            'surname': '',
            'email': '',
            'phoneNumber': '',
            'password': '',
            'confirmPassword': '',
            'offerSubscribed': false,
            'locked': false
        },
        validate: {
            'name': hasLength({max: 64}, 'Imię może mieć maksymalnie 64 znaki.'),
            'surname': hasLength({max: 64}, 'Nazwisko może mieć maksymalnie 64 znaki.'),
            'email': isEmail('Wprowadź poprawny adres e-mail.'),
            'phoneNumber': matches(/^(|[0-9]{9})$/, 'Wprowadź prawidłowy numer telefonu'),
            'password': matches(/^(||[A-Za-z0-9!@#$%]{4,16})$/, 'Hasło może składać się z 4-16 znaków: a-z A-Z 0-9 @#$%'),
            'confirmPassword': (value, values) => value !== values['password'] ? 'Hasła muszą być zgodne.' : null
        }
    });

    useEffect(() => {
        if (data !== null) {
            form.initialize(data);
            form.setFieldValue('password', '');
            form.setFieldValue('confirmPassword', '')
            setLoading(false);
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

        setSaving(true);
        let method = isNullOrUndefined(data) ? 'POST' : 'PUT';
        let url = `http://localhost:8080/api/clients${!isNullOrUndefined(data) ? `/${data?.id}` : ''}`

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
                    navigate(`/accounts/${resp.data}`);
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
                    <Stack style={{flexGrow: 1}} w={rem(400)}>
                        <TextInput key={form.key('name')} label="Imię" placeholder="Imię użytkownika"
                                   {...form.getInputProps('name')}/>
                        <TextInput key={form.key('surname')} label="Nazwisko" placeholder="Nazwisko użytkownika"
                                   {...form.getInputProps('surname')}/>
                        <TextInput key={form.key('email')} label="Adres e-mail" placeholder="Adres e-mail użytkownika"
                                   {...form.getInputProps('email')} withAsterisk/>
                        <TextInput key={form.key('phoneNumber')} label="Numer telefonu"
                                   placeholder="Numer telefonu użytkownika" {...form.getInputProps('phoneNumber')}/>
                        <PasswordInput key={form.key('password')} label="Hasło"
                                       placeholder="Nowe hasło użytkownika"
                                       {...form.getInputProps('password')}/>
                        <PasswordInput key={form.key('confirmPassword')} label="Potwierdź hasło"
                                       placeholder="Potwierdź zmianę hasła"
                                       {...form.getInputProps('confirmPassword')}/>
                        <Checkbox key={form.key('locked')}
                                  label="Konto jest zablokowane" {...form.getInputProps('locked', {type: 'checkbox'})} />
                        <Checkbox key={form.key('offerSubscribed')}
                                  label="Subskrybuje oferty" {...form.getInputProps('offerSubscribed', {type: 'checkbox'})} />
                    </Stack>
                    <Group justify="flex-end">
                        <UpdateButton isSaving={isSaving} updateAction={sendAction}/>
                    </Group>
                </Stack>

            )}
        </>
    )
}