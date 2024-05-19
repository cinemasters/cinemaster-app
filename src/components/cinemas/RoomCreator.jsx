import {ActionIcon, Button, Group, Loader, rem, Select, Stack, TextInput} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {hasLength, isNotEmpty, useForm} from "@mantine/form";
import {isNullOrUndefined} from "../../utils/ObjectUtils.jsx";
import UpdateButton from "../buttons/UpdateButton.jsx";

export default function RoomCreator({id}) {
    const [isLoading, setLoading] = useState(true);
    const [isSaving, setSaving] = useState(false);
    const [layouts, setLayouts] = useState([]);
    const form = useForm({
        mode: "uncontrolled",
        validateInputOnBlur: true,
        initialValues: {
            rooms: []
        },
        validate: {
            rooms: {
                name: hasLength({min: 1, max: 64}, 'Nazwa sali musi mieć od 1 do 64 znaków.'),
                roomId: isNotEmpty('Wybierz prawdiłowy układ sali.')
            }
        }
    })

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:8080/api/room-layouts`, {method: "GET", credentials: "include"})
            .then((res) => res?.json())
            .then((data) => {
                if (!isNullOrUndefined(data)) {
                    setLayouts(data.items.map((el) => ({value: el.id.toString(), label: el.name})));
                }
            })
            .catch((err) => {
                console.log(err)
            })

        fetch(`http://localhost:8080/api/cinemas/${id}/rooms`, {method: "GET", credentials: "include"})
            .then((res) => res?.json())
            .then((data) => {
                if (!isNullOrUndefined(data)) {
                    form.initialize({
                        rooms: data.map((el) => ({
                            name: el.name,
                            roomId: el.layoutId.toString()
                        }))
                    })
                }
            })
            .finally(() => {
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id]);

    function updateRooms() {
        if (form.validate().hasErrors) {
            return;
        }

        setSaving(true);

        let sendData = form.getValues().rooms.map((el) => ({
            layoutId: parseInt(el.roomId),
            name: el.name
        }))

        console.log(sendData)
        setSaving(false);
    }

    return (
        <Stack w={rem(500)}>
            {
                isLoading ? <Loader/> : (
                    <>
                        {
                            form.getValues().rooms.map((el, idx) => (
                                <Group key={idx}>
                                    <Select label="Układ sali" data={layouts}
                                            key={form.key(`rooms.${idx}.roomId`)} {...form.getInputProps(`rooms.${idx}.roomId`)}
                                            withAsterisk/>
                                    <TextInput label="Nazwa"
                                               key={form.key(`rooms.${idx}.name`)} {...form.getInputProps(`rooms.${idx}.name`)}
                                               withAsterisk></TextInput>
                                    <ActionIcon mt="md" color="red" onClick={() => {
                                        form.removeListItem('rooms', idx);
                                    }}>
                                        <IconTrash style={{width: '70%', height: '70%'}} stroke={1.5}/>
                                    </ActionIcon>
                                </Group>
                            ))
                        }
                        <Button onClick={() => {
                            form.insertListItem('rooms', {name: '', roomId: null})
                        }}>Dodaj</Button>
                        <UpdateButton updateAction={updateRooms} isSaving={isSaving}/>
                    </>
                )
            }
        </Stack>
    )
}