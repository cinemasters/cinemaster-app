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
import NavItem from "./NavItem.jsx";

export default function Navigation() {
    return (
        <nav>
            <NavItem url="/dashboard" label="Panel główny" IconName={IconHome}/>
            <NavItem url="/cinemas" label="Kina" IconName={IconBuilding}/>
            <NavItem url="/movies" label="Filmy" IconName={IconMovie}/>
            <NavItem url="/tickets" label="Bilety" IconName={IconTicket}/>
            <NavItem url="/accounts" label="Konta użytkowników" IconName={IconUsers}/>
            <NavItem url="/reviews" label="Recenzje" IconName={IconQuote}/>
            <NavItem url="/vouchers" label="Karty podarunkowe" IconName={IconCreditCard}/>
            <NavItem url="#" label="Konfiguracja" IconName={IconSettings}>
                <NavItem url="/seat-types" label="Strefy biletowe" IconName={IconBarrierBlock}/>
                <NavItem url="/layouts" label="Układy sal kinowych" IconName={IconLayout}/>
                <NavItem url="/ticket-types" label="Rodzaje biletów" IconName={IconTags}/>
                <NavItem url="/perks" label="Dopłaty do biletów" IconName={IconCash}/>
                <NavItem url="/screening-types" label="Rodzaje seansów" IconName={IconVideo}/>
            </NavItem>
        </nav>
    )
}