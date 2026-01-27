import { Navigate } from "react-router";
import { useUserRole } from "../hooks/useUserRole";
import { Loader2Icon } from "lucide-react";

function ProtectedRoute({ children, requiredRole }) {
    const { role, isLoading, isInterviewer, isCandidate } = useUserRole();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2Icon className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    if (requiredRole === "interviewer" && !isInterviewer) {
        return <Navigate to="/dashboard" replace />;
    }

    if (requiredRole === "candidate" && !isCandidate) {
        // Optional: Redirect candidates trying to access something else? 
        // Usually candidate is the default so this might not be needed depending on logic
        // For now, if strictly candidate route exists
    }

    return children;
}

export default ProtectedRoute;
