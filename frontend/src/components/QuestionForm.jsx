import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Editor } from "@monaco-editor/react";
import { PlusIcon, TrashIcon, Loader2Icon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function QuestionForm({ initialData, onSubmit, isLoading }) {
    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: initialData || {
            title: "",
            difficulty: "Easy",
            category: "",
            description: { text: "", notes: [] },
            examples: [{ input: "", output: "", explanation: "" }],
            constraints: [""],
            topics: [],
            starterCode: { javascript: "", python: "", java: "" },
            expectedOutput: { javascript: "", python: "", java: "" },
        },
    });

    const { fields: exampleFields, append: appendExample, remove: removeExample } = useFieldArray({
        control,
        name: "examples",
    });

    const { fields: noteFields, append: appendNote, remove: removeNote } = useFieldArray({
        control,
        name: "description.notes",
    });

    const { fields: constraintFields, append: appendConstraint, remove: removeConstraint } = useFieldArray({
        control,
        name: "constraints",
    });

    const [selectedLang, setSelectedLang] = useState("javascript");

    // Watch starterCode to update editor
    const starterCode = watch(`starterCode.${selectedLang}`);

    const handleEditorChange = (value) => {
        setValue(`starterCode.${selectedLang}`, value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
            <div className="space-y-4">
                <h3 className="text-xl font-bold">Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">Title</label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            type="text"
                            className="input input-bordered"
                            placeholder="e.g. Two Sum"
                        />
                        {errors.title && <span className="text-error text-sm">{errors.title.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">Difficulty</label>
                        <select {...register("difficulty")} className="select select-bordered">
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">Category</label>
                        <input
                            {...register("category", { required: "Category is required" })}
                            type="text"
                            className="input input-bordered"
                            placeholder="e.g. Array • Hash Table"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">Topics (comma separated)</label>
                        <input
                            type="text"
                            className="input input-bordered"
                            placeholder="e.g. array, hash-table"
                            defaultValue={initialData?.topics?.join(", ")}
                            onChange={(e) => setValue("topics", e.target.value.split(",").map(t => t.trim()))}
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">Description</label>
                    <textarea
                        {...register("description.text", { required: "Description is required" })}
                        className="textarea textarea-bordered h-32"
                        placeholder="Problem description..."
                    ></textarea>
                </div>

                {/* Notes */}
                <div className="form-control">
                    <label className="label flex justify-between">
                        <span>Notes</span>
                        <button type="button" onClick={() => appendNote("")} className="btn btn-ghost btn-xs text-primary">
                            <PlusIcon className="size-4" /> Add Note
                        </button>
                    </label>
                    <div className="space-y-2">
                        {noteFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                {/* Re-using the same name registration method for array of primitive strings is tricky in react-hook-form v7 
                     Wrap string in object for cleaner field array usage if possible, but here we just use index */}
                                <input
                                    {...register(`description.notes.${index}`)}
                                    type="text"
                                    className="input input-bordered flex-1"
                                />
                                <button type="button" onClick={() => removeNote(index)} className="btn btn-ghost btn-error btn-square">
                                    <TrashIcon className="size-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="divider"></div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Examples</h3>
                    <button type="button" onClick={() => appendExample({ input: "", output: "", explanation: "" })} className="btn btn-sm btn-outline">
                        <PlusIcon className="size-4" /> Add Example
                    </button>
                </div>

                <div className="space-y-4">
                    {exampleFields.map((field, index) => (
                        <div key={field.id} className="card bg-base-200 p-4 relative">
                            <button
                                type="button"
                                onClick={() => removeExample(index)}
                                className="absolute top-2 right-2 btn btn-ghost btn-xs btn-error"
                            >
                                <TrashIcon className="size-4" />
                            </button>
                            <div className="grid gap-2">
                                <input
                                    {...register(`examples.${index}.input`, { required: true })}
                                    className="input input-bordered input-sm"
                                    placeholder="Input (e.g. nums = [2,7,11,15], target = 9)"
                                />
                                <input
                                    {...register(`examples.${index}.output`, { required: true })}
                                    className="input input-bordered input-sm"
                                    placeholder="Output (e.g. [0,1])"
                                />
                                <input
                                    {...register(`examples.${index}.explanation`)}
                                    className="input input-bordered input-sm"
                                    placeholder="Explanation (optional)"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="divider"></div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Constraints</h3>
                    <button type="button" onClick={() => appendConstraint("")} className="btn btn-sm btn-outline">
                        <PlusIcon className="size-4" /> Add Constraint
                    </button>
                </div>

                <div className="space-y-2">
                    {constraintFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <input
                                {...register(`constraints.${index}`)}
                                type="text"
                                className="input input-bordered flex-1"
                                placeholder="e.g. 2 <= nums.length <= 10^4"
                            />
                            <button type="button" onClick={() => removeConstraint(index)} className="btn btn-ghost btn-error btn-square">
                                <TrashIcon className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="divider"></div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold">Code Configuration</h3>

                <div className="tabs tabs-boxed">
                    {Object.keys(LANGUAGE_CONFIG).map(lang => (
                        <a
                            key={lang}
                            className={`tab ${selectedLang === lang ? 'tab-active' : ''}`}
                            onClick={() => setSelectedLang(lang)}
                        >
                            {LANGUAGE_CONFIG[lang].name}
                        </a>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[400px]">
                    <div className="flex flex-col gap-2">
                        <label className="label font-bold">Starter Code ({LANGUAGE_CONFIG[selectedLang].name})</label>
                        <div className="flex-1 border border-base-300 rounded-lg overflow-hidden">
                            <Editor
                                height="100%"
                                language={LANGUAGE_CONFIG[selectedLang].monacoLang}
                                theme="vs-dark"
                                value={starterCode}
                                onChange={handleEditorChange}
                                options={{ minimap: { enabled: false } }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="label font-bold">Expected Output ({LANGUAGE_CONFIG[selectedLang].name})</label>
                        <textarea
                            {...register(`expectedOutput.${selectedLang}`)}
                            className="textarea textarea-bordered flex-1 font-mono text-sm leading-relaxed"
                            placeholder="Enter expected output for hidden test cases..."
                        ></textarea>
                        <p className="text-xs opacity-60">
                            Format: One output per line matching the test cases order.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 sticky bottom-0 bg-base-100 p-4 border-t border-base-300 z-10">
                <button type="submit" className="btn btn-primary min-w-[150px]" disabled={isLoading}>
                    {isLoading ? <Loader2Icon className="animate-spin" /> : "Save Problem"}
                </button>
            </div>
        </form>
    );
}

export default QuestionForm;
