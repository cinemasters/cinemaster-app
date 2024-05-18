import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {hasLength, useForm} from "@mantine/form";
import {Group, Loader, Radio, Stack, TextInput} from "@mantine/core";
import CreateButton from "../buttons/CreateButton.jsx";
import UpdateButton from "../buttons/UpdateButton.jsx";
import {isNullOrUndefined} from "../../utils/ObjectUtils.jsx";
import {notifications} from "@mantine/notifications";

export default function ScreeningTypeForm({data}) {
    const [isLoading, setLoading] = useState(true);
    const [isSaving, setSaving] = useState(false);
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        validateInputOnBlur: true,
        initialValues: {type: 'Video', name: '', description: ''},
        validate: {
            name: hasLength({min: 1, max: 64}, "Nazwa musi mieć od 1 do 64 znaków."),
            description: hasLength({max: 255}, "Opis może mieć maksymalnie 255 znaków.")
        }
    })

    function submitAction() {
        if (form.validate().hasErrors) {
            return;
        }
        
        setSaving(true);

        let method = isNullOrUndefined(data) ? 'POST' : 'PUT';
        let url = `http://localhost:8080/api/screening-types${!isNullOrUndefined(data) ? `/${data?.id}` : ''}`

        fetch(url, {
            method: method, credentials: 'include', body: JSON.stringify(form.getValues()), headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res?.json())
            .then((resp) => {
                if (!resp?.success) {
                    notifications.show({
                        color: 'red',
                        title: 'Błąd',
                        message: (resp?.message ?? 'Wystąpił nieznany błąd.')
                    });
                } else {
                    navigate(`/screening-types${isNullOrUndefined(data) ? `/${resp.data}` : ''}`);
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
        if (!isNullOrUndefined(data)) {
            form.initialize(data);
        }

        setLoading(false);
    }, [data]);

    return (
        <>
            {
                isLoading ? <Loader/> : (
                    <Stack>
                        <TextInput key={form.key('name')} placeholder="Nazwa rodzaju seansów"
                                   label="Nazwa" {...form.getInputProps('name')} withAsterisk/>
                        <TextInput key={form.key('description')} placeholder="Opis rodzaju seansów - opcjonalny"
                                   label="Opis" {...form.getInputProps('description')} />
                        <Radio.Group key={form.key('type')} label='Typ' {...form.getInputProps('type')}
                                     withAsterisk>
                            <Group mt='xs'>
                                <Radio value='Video' label='Wideo'/>
                                <Radio value='Audio' label='Audio'/>
                            </Group>
                        </Radio.Group>
                        {
                            isNullOrUndefined(data) ?
                                <CreateButton createAction={submitAction} isSaving={isSaving}/> :
                                <UpdateButton updateAction={submitAction} isSaving={isSaving}/>
                        }
                    </Stack>
                )
            }
        </>
    )
}