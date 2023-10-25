import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { useAuth0 } from '@auth0/auth0-react'


export default function NavigationBar() {

  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0()

  return (
    <Navbar position="static" isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Competition Monitoring App</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        
      </NavbarContent>
      <NavbarContent justify="end">
      <NavbarItem>
        {isAuthenticated ? (
          <Button color="danger" variant="flat" onClick={() => logout()}>
            Logout
          </Button>
        ) : (
          <Button as={Link} color="primary" href="#" variant="flat" onClick={() => loginWithRedirect()}>
            Sign Up
          </Button>
        )}
      </NavbarItem>
    </NavbarContent>
    </Navbar>
  );
}
