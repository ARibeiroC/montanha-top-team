import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '@/context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles, allowedLevels }) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white'}}>Verificando permissões...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const userLevel = typeof user?.accessLevel === 'number' ? user.accessLevel : null;
    if (Array.isArray(allowedLevels) && allowedLevels.length > 0) {
        const isAllowed = userLevel !== null && allowedLevels.includes(userLevel);
        if (!isAllowed) {
            const target = userLevel !== null && userLevel >= 1 ? '/admin-panel' : '/user-area';
            return <Navigate to={target} replace />;
        }
    } else if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
        const isAllowed = allowedRoles.includes(user?.role);
        if (!isAllowed) {
            const target = ['admin', 'teacher'].includes(user?.role) ? '/admin-panel' : '/user-area';
            return <Navigate to={target} replace />;
        }
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string),
    allowedLevels: PropTypes.arrayOf(PropTypes.number)
};
