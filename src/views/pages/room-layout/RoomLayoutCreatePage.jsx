import {useEffect, useState} from "react";
import {
    Button,
    Center,
    Group,
    Loader,
    NumberInput,
    Paper,
    Radio,
    Select,
    Stack,
    Stepper,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import {hasLength, isInRange, useForm} from "@mantine/form";
import {IconEyeOff} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

export default function RoomLayoutCreatePage() {
    const regularSeat = {value: '-1', label: 'Zwykła', code: ''}
    const [isLoading, setLoading] = useState(true);
    const [isSaving, setSaving] = useState(false);
    const [seatData, setSeatData] = useState([regularSeat])
    const [mode, setMode] = useState('set')
    const [seat, setSeat] = useState('-1')
    const [step, setStep] = useState(0);
    const [gridData, setGridData] = useState([])
    const [col, setCol] = useState(1)
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        validateInputOnBlur: true,
        initialValues: {name: '', rowCount: 1, columnCount: 1},
        validate: {
            name: hasLength({min: 1, max: 64}, 'Nazwa musi mieć od 1 do 64 znaków.'),
            rowCount: isInRange({min: 1, max: 30}, 'Liczba rzędów musi zawierać się w zakresie od 1 do 30.'),
            columnCount: isInRange({min: 1, max: 40}, 'Liczba miejsc musi zawierać się w zakresie od 1 do 40.'),
        }
    })

    useEffect(() => {
        fetch(`http://localhost:8080/api/seat-types`, {method: "GET", credentials: "include"})
            .then((res) => res.json())
            .then((data) => {
                if (data !== null && data !== undefined) {
                    let newData = [regularSeat, ...data.items.map((val) => ({
                        value: val.id.toString(),
                        label: val.name,
                        code: val.code
                    }))]
                    setSeatData(newData);
                }
            })
            .finally(() => {
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })

    }, []);

    const configureAction = () => {
        if (form.validate().hasErrors) {
            return;
        }

        let data = []

        for (let i = 1; i <= form.getValues()['rowCount']; i++) {
            for (let j = 1; j <= form.getValues()['columnCount']; j++) {
                data.push({row: i, col: j, value: ''})
            }
        }
        setCol(form.getValues()['columnCount'])
        setGridData(data)
        setStep(1)
    }

    const createLayout = () => {
        setSaving(true);

        let data = {
            ...form.getValues(),
            seats: gridData.map((el) => ({
                row: el.row,
                col: el.col,
                seatTypeId: (el.value === '' || el.value === 'hidden') ? null : parseInt(seatData.find(i => i.code === el.value)?.value),
                isHidden: el.value === 'hidden'
            }))
        }

        fetch(`http://localhost:8080/api/room-layouts`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res?.json())
            .then((data) => {
                if (data?.success === true) {
                    navigate('/layouts');
                }
            })
            .finally(() => {
                setSaving(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function GridElem({row, col, value}) {
        function changeValue() {
            let idx = gridData.indexOf(gridData.find(i => i.row === row && i.col === col));

            if (idx !== -1) {
                let newData = [...gridData]
                let code = seatData.find(i => i.value === seat)?.code ?? ''
                newData[idx] = {row: row, col: col, value: mode === 'set' ? code : 'hidden'}
                setGridData(newData)
            }
        }

        return (
            <Center p="sm" bg="var(--mantine-color-gray-light)" w={40} h={40} onClick={changeValue}
                    style={{cursor: "pointer"}}>
                {value !== 'hidden' ? value : <IconEyeOff/>}
            </Center>
        )
    }

    return (
        <Stack>
            <Title order={1}>Kreator układu sal kinowych</Title>
            {isLoading ? <Loader/> :
                (
                    <Stepper active={step}>
                        <Stepper.Step label="Konfiguracja parametrów">
                            <Stack>
                                <TextInput label="Nazwa" placeholder="Nazwa układu sal kinowych"
                                           key={form.key('name')} withAsterisk {...form.getInputProps('name')}/>
                                <NumberInput label="Liczba rzędów" placeholder="Liczba rzędów miejsc na sali"
                                             key={form.key('rowCount')} allowDecimal={false} min={1}
                                             {...form.getInputProps('rowCount')}/>
                                <NumberInput label="Maks. liczba miejsc w rzędzie"
                                             placeholder="Maksymalna liczba miejsc w jednym rzędzie na sali"
                                             allowDecimal={false} min={1}
                                             key={form.key('columnCount')} {...form.getInputProps('columnCount')}/>
                                <Button onClick={configureAction}>Dalej</Button>
                            </Stack>
                        </Stepper.Step>
                        <Stepper.Step label="Konfiguracja układu">
                            <Group>
                                <Stack>
                                    <Stack>
                                        <Paper withBorder bg="var(--mantine-color-gray-light)" p="xs" shadow="xl">
                                            <Title order={4} ta="center">EKRAN</Title>
                                        </Paper>
                                    </Stack>
                                    <div style={{
                                        display: 'grid', gap: `10px 0`, margin: '0 auto',
                                        gridTemplateColumns: `repeat(${col}, minmax(50px,50px))`
                                    }}>
                                        {
                                            gridData.map((el, it) => (
                                                <GridElem {...el} key={it}/>
                                            ))
                                        }
                                    </div>
                                    <Group grow>
                                        <Button variant="outline" onClick={() => {
                                            setStep(0)
                                        }}>Wróć</Button>
                                        <Button onClick={createLayout}>Utwórz</Button>
                                    </Group>
                                    {isSaving && <Loader/>}
                                </Stack>
                                <Stack>
                                    <Text>Narzędzia:</Text>
                                    <Radio.Group value={mode} onChange={setMode}>
                                        <Stack>
                                            <Radio value='set' label="Ustaw strefę"/>
                                            {mode === 'set' &&
                                                <Select data={seatData} value={seat} onChange={setSeat}
                                                        allowDeselect={false}/>}
                                            <Radio value='hide' label="Ukryj"/>
                                        </Stack>
                                    </Radio.Group>
                                </Stack>
                            </Group>

                        </Stepper.Step>
                    </Stepper>
                )}
        </Stack>
    )
}