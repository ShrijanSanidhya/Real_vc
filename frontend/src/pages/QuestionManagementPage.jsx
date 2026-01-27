import { useState } from "react";
import { useProblems, useCreateProblem, useUpdateProblem, useDeleteProblem, useSeedProblems, useGenerateProblem } from "../hooks/useProblems";
import Navbar from "../components/Navbar";
import QuestionForm from "../components/QuestionForm";
import { Loader2Icon, PlusIcon, TrashIcon, PencilIcon, SparklesIcon, AlertTriangleIcon } from "lucide-react";
import toast from "react-hot-toast";

function QuestionManagementPage() {
    const { data, isLoading } = useProblems();
    const createProblem = useCreateProblem();
    const updateProblem = useUpdateProblem();
    const deleteProblem = useDeleteProblem();
    const seedProblems = useSeedProblems();
    const generateProblem = useGenerateProblem();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProblem, setEditingProblem] = useState(null);

    const problems = data?.problems || [];

    const handleGenerate = () => {
        generateProblem.mutate();
    };

    const handleEdit = (problem) => {
        setEditingProblem(problem);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this problem?")) {
            deleteProblem.mutate(id);
        }
    };

    const formatFormDataForSubmit = (data) => {
        // React Hook Form might return notes/constraints as array of objects if we used objects in fields
        // But our backend expects array of strings. 
        // Our QuestionForm handles this via register so data should be structure correctly if we were careful.
        // However, fieldArray for simple strings is tricky.
        // Let's ensure notes and constraints are strings.

        // Cleanup notes if they are objects (which fieldArray might do)
        if (data.description.notes && data.description.notes.length > 0 && typeof data.description.notes[0] !== 'string') {
            // This handles if we had used objects in field array, but we registered specific indices.
            // Actually, basic inputs registered as `description.notes.0` usually work as expected.
        }
        return data;
    }

    const handleSubmit = (formData) => {
        if (editingProblem) {
            updateProblem.mutate(
                { id: editingProblem._id, data: formData },
                {
                    onSuccess: () => {
                        setIsFormOpen(false);
                        setEditingProblem(null);
                    },
                }
            );
        } else {
            createProblem.mutate(formData, {
                onSuccess: () => {
                    setIsFormOpen(false);
                },
            });
        }
    };

    const handleSeed = () => {
        if (window.confirm("This will add default problems to the database if they don't exist. Continue?")) {
            seedProblems.mutate();
        }
    }

    if (isFormOpen) {
        return (
            <div className="min-h-screen bg-base-100 flex flex-col">
                <Navbar />
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">
                            {editingProblem ? "Edit Problem" : "Create New Problem"}
                        </h1>
                        <button
                            onClick={() => {
                                setIsFormOpen(false);
                                setEditingProblem(null);
                            }}
                            className="btn btn-ghost"
                        >
                            Cancel
                        </button>
                    </div>
                    <QuestionForm
                        initialData={editingProblem}
                        onSubmit={handleSubmit}
                        isLoading={createProblem.isPending || updateProblem.isPending}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-300 flex flex-col">
            <Navbar />

            <div className="container mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black mb-2">Question Bank</h1>
                        <p className="text-lg opacity-70">Manage coding problems for interviews</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleGenerate} className="btn btn-secondary gap-2" disabled={generateProblem.isPending}>
                            {generateProblem.isPending ? <Loader2Icon className="animate-spin size-4" /> : <SparklesIcon className="size-4" />}
                            Generate with AI
                        </button>
                        <button onClick={handleSeed} className="btn btn-ghost gap-2" disabled={seedProblems.isPending}>
                            {seedProblems.isPending ? <Loader2Icon className="animate-spin size-4" /> : <SparklesIcon className="size-4" />}
                            Seed Defaults
                        </button>
                        <button onClick={() => setIsFormOpen(true)} className="btn btn-primary gap-2">
                            <PlusIcon className="size-5" />
                            Add Problem
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2Icon className="size-10 animate-spin text-primary" />
                    </div>
                ) : problems.length === 0 ? (
                    <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-base-content/10">
                        <AlertTriangleIcon className="size-12 mx-auto text-warning mb-4" />
                        <h3 className="text-xl font-bold mb-2">No problems found</h3>
                        <p className="opacity-60 mb-6">Get started by creating your first problem or seeding the defaults.</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={handleGenerate} className="btn btn-secondary btn-outline gap-2">
                                <SparklesIcon className="size-4" />
                                Generate with AI
                            </button>
                            <button onClick={handleSeed} className="btn btn-outline gap-2">
                                <SparklesIcon className="size-4" />
                                Seed Defaults
                            </button>
                            <button onClick={() => setIsFormOpen(true)} className="btn btn-primary gap-2">
                                <PlusIcon className="size-4" />
                                Create Problem
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {problems.map((problem) => (
                            <div
                                key={problem._id}
                                className="card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-200"
                            >
                                <div className="card-body flex-row items-center justify-between p-6">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`badge badge-lg ${problem.difficulty === "Easy"
                                                ? "badge-success"
                                                : problem.difficulty === "Medium"
                                                    ? "badge-warning"
                                                    : "badge-error"
                                                } text-white`}
                                        >
                                            {problem.difficulty}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{problem.title}</h3>
                                            <div className="flex items-center gap-2 opacity-60 text-sm mt-1">
                                                <span>{problem.category}</span>
                                                {problem.topics?.map(topic => (
                                                    <span key={topic} className="badge badge-sm badge-ghost">{topic}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(problem)}
                                            className="btn btn-ghost btn-sm btn-square hover:bg-base-200"
                                        >
                                            <PencilIcon className="size-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(problem._id)}
                                            className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/10"
                                        >
                                            <TrashIcon className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionManagementPage;
