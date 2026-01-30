
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {

        return <Navigate to="/login" replace />;
    }


    return <Outlet />;
};

export default ProtectedRoute;
