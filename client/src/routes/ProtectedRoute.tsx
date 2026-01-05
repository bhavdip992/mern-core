import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
    children,
}: {
    children: TSX.Element;
}) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
}