import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },
        category: {
            type: String,
            required: true, // e.g., "Array • Hash Table"
        },
        description: {
            text: {
                type: String,
                required: true,
            },
            notes: [
                {
                    type: String,
                },
            ],
        },
        examples: [
            {
                input: {
                    type: String,
                    required: true,
                },
                output: {
                    type: String,
                    required: true,
                },
                explanation: {
                    type: String,
                },
            },
        ],
        constraints: [
            {
                type: String,
            },
        ],
        starterCode: {
            javascript: {
                type: String,
                default: "",
            },
            python: {
                type: String,
                default: "",
            },
            java: {
                type: String,
                default: "",
            },
        },
        expectedOutput: {
            javascript: {
                type: String,
                default: "",
            },
            python: {
                type: String,
                default: "",
            },
            java: {
                type: String,
                default: "",
            },
        },
        topics: [
            {
                type: String, // e.g., "arrays", "hash-table"
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
