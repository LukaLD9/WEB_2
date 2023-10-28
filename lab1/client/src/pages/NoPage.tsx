import { Button } from '@nextui-org/button'
import { useNavigate } from 'react-router-dom';

function NoPage() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-6xl font-bold text-center mb-8">404 - Page not found</h1>
                <h2 className="text-3xl font-bold text-center mb-8">There is nothing here...</h2>
                <Button className="bg-blue-600 hover:bg-blue-900 text-white text-xl font-bold py-10 px-20 rounded" onClick={() => navigate(`/`)}>
                                                Return home
                </Button>
            </div>
        </div>
    );
}

export default NoPage;