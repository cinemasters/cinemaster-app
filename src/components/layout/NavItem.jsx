import {Link, useLocation} from "react-router-dom";
import {NavLink} from "@mantine/core";

export default function NavItem({url, label, IconName, children}) {
    let loc = useLocation();

    return (
        <NavLink component={Link} label={label} href="#" to={url} active={loc?.pathname === url}
                 leftSection={<IconName size="1rem" stroke={1.5}/>}>
            {children}
        </NavLink>
    )
}
