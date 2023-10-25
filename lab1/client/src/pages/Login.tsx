import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@nextui-org/button'


function Login() {

    const { loginWithRedirect } = useAuth0()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Centered Title */}
            <h1 className="text-6xl font-bold text-center mb-8">Competition Monitoring App</h1>
            <h2 className="text-3xl font-bold text-center mb-8">Welcome and join us!</h2>

            {/* Centered Login Button */}
            <Button className="bg-blue-600 hover:bg-blue-900 text-white text-xl font-bold py-10 px-20 rounded"
            onClick={() => loginWithRedirect()}>
                Login
            </Button>
        </div>

    );
}

export default Login;