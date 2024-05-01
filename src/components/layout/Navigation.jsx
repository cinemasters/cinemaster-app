import {NavLink} from "@mantine/core";
import {
    IconBarrierBlock,
    IconBuilding,
    IconCash,
    IconCreditCard,
    IconHome,
    IconLayout,
    IconMovie,
    IconQuote,
    IconSettings,
    IconTags,
    IconTicket,
    IconUsers,
    IconVideo
} from "@tabler/icons-react";

export default function Navigation() {
    return (
        <nav>
            <NavLink label="Panel główny" href="#" leftSection={<IconHome size="1rem" stroke={1.5}/>}/>
            <NavLink label="Kina" href="#" leftSection={<IconBuilding size="1rem" stroke={1.5}/>}/>
            <NavLink label="Filmy" href="#" leftSection={<IconMovie size="1rem" stroke={1.5}/>}/>
            <NavLink label="Bilety" href="#" leftSection={<IconTicket size="1rem" stroke={1.5}/>}/>
            <NavLink label="Konta użytkowników" href="#" leftSection={<IconUsers size="1rem" stroke={1.5}/>}/>
            <NavLink label="Recenzje" href="#" leftSection={<IconQuote size="1rem" stroke={1.5}/>}/>
            <NavLink label="Karty podarunkowe" href="#" leftSection={<IconCreditCard size="1rem" stroke={1.5}/>}/>
            <NavLink label="Konfiguracja" leftSection={<IconSettings size="1rem" stroke={1.5}/>}>
                <NavLink label="Strefy biletowe" href="#" leftSection={<IconBarrierBlock size="1rem" stroke={1.5}/>}/>
                <NavLink label="Układy sal kinowych" href="#" leftSection={<IconLayout size="1rem" stroke={1.5}/>}/>
                <NavLink label="Rodzaje biletów" href="#" leftSection={<IconTags size="1rem" stroke={1.5}/>}/>
                <NavLink label="Dopłaty do biletów" href="#" leftSection={<IconCash size="1rem" stroke={1.5}/>}/>
                <NavLink label="Rodzaje seansów" href="#" leftSection={<IconVideo size="1rem" stroke={1.5}/>}/>
            </NavLink>
        </nav>
    )
}