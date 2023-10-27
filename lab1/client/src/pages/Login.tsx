import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@nextui-org/button'
import LoadingComponent from '../components/LoadingComponent';

function Login() {

    const { loginWithRedirect, isLoading } = useAuth0()

    return (
        <>
            { isLoading ?
            <LoadingComponent /> :
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-6xl font-bold text-center mb-8">Competition Monitoring App</h1>
                <h2 className="text-3xl font-bold text-center mb-8">Welcome and join us!</h2>

                <Button className="bg-blue-600 hover:bg-blue-900 text-white text-xl font-bold py-10 px-20 rounded"
                onClick={() => loginWithRedirect()}>
                    Login
                </Button>
            </div>
            }
        </>
    );
}

export default Login;