// Middleware to check if user has specific role
export const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user?.role;

            if (!userRole) {
                return res.status(401).json({ message: "Unauthorized - user role not found" });
            }

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    message: `Forbidden - this action requires ${allowedRoles.join(" or ")} role`
                });
            }

            next();
        } catch (error) {
            console.error("Error in requireRole middleware", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
};

// Convenience middleware for specific roles
export const requireCandidate = requireRole(["candidate"]);
export const requireInterviewer = requireRole(["interviewer"]);
