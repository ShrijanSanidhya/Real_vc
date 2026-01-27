import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useActiveSessions, useJoinSessionAsInterviewer } from "../hooks/useSessions";
import { getDifficultyBadgeClass } from "../lib/utils";
import {
    ArrowRightIcon,
    Code2Icon,
    CrownIcon,
    EyeIcon,
    LoaderIcon,
    SparklesIcon,
    UsersIcon,
    ZapIcon,
    FileCodeIcon,
} from "lucide-react";

import Navbar from "../components/Navbar";

function InterviewerDashboardPage() {
    const navigate = useNavigate();
    const { user } = useUser();
    const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
    const joinAsInterviewerMutation = useJoinSessionAsInterviewer();

    const activeSessions = activeSessionsData?.sessions || [];

    const handleObserveSession = (sessionId) => {
        joinAsInterviewerMutation.mutate(sessionId, {
            onSuccess: () => {
                navigate(`/session/${sessionId}`);
            },
        });
    };

    return (
        <div className="min-h-screen bg-base-300">
            <Navbar />

            {/* Welcome Section */}
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-b border-base-300">
                <div className="container mx-auto px-6 py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-black mb-2">
                                Welcome back, <span className="text-primary">{user?.firstName || "Interviewer"}</span>!
                            </h1>
                            <p className="text-lg opacity-70">Observe and evaluate candidate sessions in real-time</p>
                        </div>
                        <div className="badge badge-primary badge-lg gap-2">
                            <EyeIcon className="size-4" />
                            Interviewer Mode
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm opacity-70 mb-1">Active Sessions</p>
                                    <p className="text-3xl font-black">{activeSessions.length}</p>
                                </div>
                                <div className="p-3 bg-primary/20 rounded-xl">
                                    <ZapIcon className="size-8 text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-secondary/20 to-secondary/5 border-2 border-secondary/30">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm opacity-70 mb-1">Available to Observe</p>
                                    <p className="text-3xl font-black">{activeSessions.length}</p>
                                </div>
                                <div className="p-3 bg-secondary/20 rounded-xl">
                                    <EyeIcon className="size-8 text-secondary" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm opacity-70 mb-1">Total Candidates</p>
                                    <p className="text-3xl font-black">
                                        {activeSessions.reduce((acc, s) => acc + (s.participant ? 2 : 1), 0)}
                                    </p>
                                </div>
                                <div className="p-3 bg-accent/20 rounded-xl">
                                    <UsersIcon className="size-8 text-accent" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Manage Questions Card */}
                    <div
                        className="card bg-base-100 border-2 border-base-300 hover:border-primary cursor-pointer transition-all"
                        onClick={() => navigate("/interviewer/questions")}
                    >
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-bold mb-1">Question Bank</p>
                                    <p className="text-sm opacity-70">Manage interview problems</p>
                                </div>
                                <div className="p-3 bg-base-200 rounded-xl">
                                    <FileCodeIcon className="size-8" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Sessions List */}
                <div className="card bg-base-100 border-2 border-primary/20">
                    <div className="card-body">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                                    <ZapIcon className="size-5" />
                                </div>
                                <h2 className="text-2xl font-black">All Active Sessions</h2>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="size-2 bg-success rounded-full" />
                                <span className="text-sm font-medium text-success">{activeSessions.length} active</span>
                            </div>
                        </div>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                            {loadingActiveSessions ? (
                                <div className="flex items-center justify-center py-20">
                                    <LoaderIcon className="size-10 animate-spin text-primary" />
                                </div>
                            ) : activeSessions.length > 0 ? (
                                activeSessions.map((session) => (
                                    <div
                                        key={session._id}
                                        className="card bg-base-200 border-2 border-base-300 hover:border-primary/50 transition-all"
                                    >
                                        <div className="flex items-center justify-between gap-4 p-5">
                                            {/* LEFT SIDE */}
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="relative size-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                                    <Code2Icon className="size-7 text-white" />
                                                    <div className="absolute -top-1 -right-1 size-4 bg-success rounded-full border-2 border-base-100" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="font-bold text-lg truncate">{session.problem}</h3>
                                                        <span
                                                            className={`badge badge-sm ${getDifficultyBadgeClass(
                                                                session.difficulty
                                                            )}`}
                                                        >
                                                            {session.difficulty.slice(0, 1).toUpperCase() +
                                                                session.difficulty.slice(1)}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-4 text-sm opacity-80">
                                                        <div className="flex items-center gap-1.5">
                                                            <CrownIcon className="size-4" />
                                                            <span className="font-medium">{session.host?.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <UsersIcon className="size-4" />
                                                            <span className="text-xs">{session.participant ? "2/2" : "1/2"}</span>
                                                        </div>
                                                        {session.interviewer ? (
                                                            <span className="badge badge-info badge-sm">Observed</span>
                                                        ) : (
                                                            <span className="badge badge-success badge-sm">Available</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* RIGHT SIDE - Action Button */}
                                            <button
                                                onClick={() => handleObserveSession(session._id)}
                                                disabled={joinAsInterviewerMutation.isPending}
                                                className="btn btn-primary btn-sm gap-2"
                                            >
                                                {joinAsInterviewerMutation.isPending ? (
                                                    <LoaderIcon className="size-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        <EyeIcon className="size-4" />
                                                        Observe
                                                        <ArrowRightIcon className="size-4" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
                                        <SparklesIcon className="w-10 h-10 text-primary/50" />
                                    </div>
                                    <p className="text-lg font-semibold opacity-70 mb-1">No active sessions</p>
                                    <p className="text-sm opacity-50">Waiting for candidates to start sessions...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InterviewerDashboardPage;
