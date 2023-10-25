import NavigationBar from "../components/NavigationBar";
import { useAuth0 } from '@auth0/auth0-react'
import Login from "./Login";
import { Button } from '@nextui-org/button'
import TableOfCompetitions from "../components/TableOfCompetitions";

function Home() {
    const { isAuthenticated } = useAuth0();

    return (
        <div>
            <NavigationBar />
            {isAuthenticated ? (
                    <TableOfCompetitions />
            ) : (
            <Login />
            )}
        </div>
    );
}

export default Home;