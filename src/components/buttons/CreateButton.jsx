import {Button, Loader} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";

export default function CreateButton(props) {
    return (
        <Button {...props} onClick={props.createAction} disabled={props.isSaving} radius="lg"
                rightSection={props.isSaving ? <Loader size={20}/> : <IconPlus style={{width: "80%", height: "80%"}}/>}>
            {props.isSaving ? 'Tworzenie...' : 'Utwórz'}
        </Button>
    )
}