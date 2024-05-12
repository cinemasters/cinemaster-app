import {Button, Loader} from "@mantine/core";
import {IconDeviceFloppy} from "@tabler/icons-react";

export default function UpdateButton(props) {
    return (
        <Button {...props} onClick={props.updateAction} disabled={props.isSaving} radius="lg"
                rightSection={props.isSaving ? <Loader size={20}/> :
                    <IconDeviceFloppy style={{width: "80%", height: "80%"}}/>}>
            {props.isSaving ? 'Aktualizowanie...' : 'Zaktualizuj'}
        </Button>
    )
}