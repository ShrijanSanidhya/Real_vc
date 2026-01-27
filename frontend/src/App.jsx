import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import InterviewerDashboardPage from "./pages/InterviewerDashboardPage";
import QuestionManagementPage from "./pages/QuestionManagementPage";
import ProblemPage from "./pages/ProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import SessionPage from "./pages/SessionPage";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  // this will get rid of the flickering effect
  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />

        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
        <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />

        <Route path="/interviewer-dashboard" element={
          isSignedIn ? (
            <ProtectedRoute requiredRole="interviewer">
              <InterviewerDashboardPage />
            </ProtectedRoute>
          ) : <Navigate to={"/"} />
        } />
        <Route path="/interviewer/questions" element={
          isSignedIn ? (
            <ProtectedRoute requiredRole="interviewer">
              <QuestionManagementPage />
            </ProtectedRoute>
          ) : <Navigate to={"/"} />
        } />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
