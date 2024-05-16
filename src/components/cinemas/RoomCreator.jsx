import {ActionIcon, Button, Fieldset, Group, Select, Stack, TextInput} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";

function RoomCreator({form, layoutData}) {
    return (
        <Fieldset legend="Sale">
            <Stack>
                {
                    form.getValues().rooms.map((el, idx) => (
                        <Group key={idx}>
                            <Select label="Układ sali" data={layoutData}
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
            </Stack>
        </Fieldset>
    )
}