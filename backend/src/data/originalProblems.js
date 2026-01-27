
export const ORIGINAL_PROBLEMS = [
    // EASY PROBLEMS
    {
        title: "Sum of Unique Elements",
        difficulty: "Easy",
        category: "Array • Hash Map",
        description: {
            text: "Given an integer array nums, return the sum of all elements that appear exactly once in the array.",
            notes: ["Count occurrences of each number first."]
        },
        examples: [
            { input: "nums = [1,2,3,2]", output: "4", explanation: "The unique elements are [1, 3], and the sum is 4." },
            { input: "nums = [1,1,1,1]", output: "0", explanation: "There are no unique elements." },
            { input: "nums = [1,2,3,4,5]", output: "15", explanation: "All elements are unique." }
        ],
        constraints: ["1 <= nums.length <= 100", "1 <= nums[i] <= 100"],
        starterCode: {
            javascript: `function sumOfUnique(nums) {\n  // Write your solution here\n}`,
            python: `def sumOfUnique(nums):\n    # Write your solution here\n    pass`,
            java: `class Solution {\n    public int sumOfUnique(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}`
        },
        expectedOutput: {
            javascript: "4\n0\n15",
            python: "4\n0\n15",
            java: "4\n0\n15"
        },
        topics: ["array", "hash-map"]
    },
    {
        title: "Find the Middle Index in Array",
        difficulty: "Easy",
        category: "Array • Prefix Sum",
        description: {
            text: "Given a 0-indexed integer array nums, find the leftmost middleIndex (i.e., the smallest amongst all possible ones). A middleIndex is an index where nums[0] + nums[1] + ... + nums[middleIndex-1] == nums[middleIndex+1] + ... + nums[nums.length-1]. If middleIndex == 0, the left side sum is considered to be 0. Similarly, if middleIndex == nums.length - 1, the right side sum is considered to be 0. Return the leftmost middleIndex that satisfies the condition, or -1 if there is no such index.",
            notes: []
        },
        examples: [
            { input: "nums = [2,3,-1,8,4]", output: "3", explanation: "The sum of the numbers before index 3 is: 2 + 3 + -1 = 4\nThe sum of the numbers after index 3 is: 4 = 4" },
            { input: "nums = [1,-1,4]", output: "2", explanation: "The sum of the numbers before index 2 is: 1 + -1 = 0\nThe sum of the numbers after index 2 is: 0" },
        ],
        constraints: ["1 <= nums.length <= 100", "-1000 <= nums[i] <= 1000"],
        starterCode: {
            javascript: `function findMiddleIndex(nums) {\n  // Write your solution here\n}`,
            python: `def findMiddleIndex(nums):\n    # Write your solution here\n    pass`,
            java: `class Solution {\n    public int findMiddleIndex(int[] nums) {\n        // Write your solution here\n        return -1;\n    }\n}`
        },
        expectedOutput: {
            javascript: "3\n2",
            python: "3\n2",
            java: "3\n2"
        },
        topics: ["array", "prefix-sum"]
    },
    {
        title: "Reverse Vowels of a String",
        difficulty: "Easy",
        category: "String • Two Pointers",
        description: {
            text: "Given a string s, reverse only all the vowels in the string and return it. The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.",
            notes: []
        },
        examples: [
            { input: 's = "hello"', output: '"holle"' },
            { input: 's = "leetcode"', output: '"leotcede"' },
        ],
        constraints: ["1 <= s.length <= 3 * 10^5", "s consist of printable ASCII characters."],
        starterCode: {
            javascript: `function reverseVowels(s) {\n  // Write your solution here\n}`,
            python: `def reverseVowels(s):\n    # Write your solution here\n    pass`,
            java: `class Solution {\n    public String reverseVowels(String s) {\n        // Write your solution here\n        return "";\n    }\n}`
        },
        expectedOutput: {
            javascript: '"holle"\n"leotcede"',
            python: '"holle"\n"leotcede"',
            java: '"holle"\n"leotcede"'
        },
        topics: ["string", "two-pointers"]
    },

    // MEDIUM PROBLEMS
    {
        title: "Product of Array Except Self",
        difficulty: "Medium",
        category: "Array • Prefix Sum",
        description: {
            text: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. you must write an algorithm that runs in O(n) time and without using the division operation.",
            notes: []
        },
        examples: [
            { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
            { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" }
        ],
        constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
        starterCode: {
            javascript: `function productExceptSelf(nums) {\n  // Write your solution here\n}`,
            python: `def productExceptSelf(nums):\n    # Write your solution here\n    pass`,
            java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Write your solution here\n        return new int[0];\n    }\n}`
        },
        expectedOutput: {
            javascript: "[24,12,8,6]\n[0,0,9,0,0]",
            python: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]",
            java: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]"
        },
        topics: ["array", "prefix-sum"]
    },
    {
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        category: "Array • Hash Map",
        description: {
            text: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
            notes: []
        },
        examples: [
            { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4." },
            { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" }
        ],
        constraints: ["0 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
        starterCode: {
            javascript: `function longestConsecutive(nums) {\n  // Write your solution here\n}`,
            python: `def longestConsecutive(nums):\n    # Write your solution here\n    pass`,
            java: `class Solution {\n    public int longestConsecutive(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}`
        },
        expectedOutput: {
            javascript: "4\n9",
            python: "4\n9",
            java: "4\n9"
        },
        topics: ["array", "hash-map"]
    },
    {
        title: "Find Duplicate File in System",
        difficulty: "Medium",
        category: "String • Hash Map",
        description: {
            text: "Given a list paths of directory info, including the directory path, and all the files with contents in this directory, return all the duplicate files in the file system in terms of their paths strings (i.e., top-down). You may return the answer in any order. A group of duplicate files consists of at least two files that have the same content.",
            notes: ["Input format: 'root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)'"]
        },
        examples: [
            { input: 'paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]', output: '[["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]' },
            { input: 'paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)"]', output: '[["root/a/2.txt","root/c/d/4.txt"],["root/a/1.txt","root/c/3.txt"]]' }
        ],
        constraints: ["1 <= paths.length <= 2 * 10^4", "1 <= paths[i].length <= 3000"],
        starterCode: {
            javascript: `function findDuplicate(paths) {\n  // Write your solution here\n}`,
            python: `def findDuplicate(paths):\n    # Write your solution here\n    pass`,
            java: `class Solution {\n    public List<List<String>> findDuplicate(String[] paths) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}`
        },
        expectedOutput: {
            javascript: "undefined", // complex to validate without custom judge
            python: "undefined",
            java: "undefined"
        },
        topics: ["string", "hash-map"]
    },

    // HARD PROBLEMS
    {
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        category: "Linked List • Heap",
        description: {
            text: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
            notes: []
        },
        examples: [
            { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
            { input: "lists = []", output: "[]" },
            { input: "lists = [[]]", output: "[]" }
        ],
        constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500"],
        starterCode: {
            javascript: `function mergeKLists(lists) {\n  // Write your solution here\n}`,
            python: `def mergeKLists(lists):\n    # Write your solution here\n    pass`,
            java: `class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Write your solution here\n        return null;\n    }\n}`
        },
        expectedOutput: {
            javascript: "[1,1,2,3,4,4,5,6]\n[]\n[]",
            python: "[1, 1, 2, 3, 4, 4, 5, 6]\n[]\n[]",
            java: "[1, 1, 2, 3, 4, 4, 5, 6]\n[]\n[]"
        },
        topics: ["linked-list", "heap"]
    },
    {
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        category: "Array • Sliding Window • Deque",
        description: {
            text: "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.",
            notes: []
        },
        examples: [
            { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]", explanation: "Window position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7" },
            { input: "nums = [1], k = 1", output: "[1]" }
        ],
        constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "1 <= k <= nums.length"],
        starterCode: {
            javascript: `function maxSlidingWindow(nums, k) {\n  // Write your solution here\n}`,
            python: `def maxSlidingWindow(nums, k):\n    # Write your solution here\n    pass`,
            java: `class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        // Write your solution here\n        return new int[0];\n    }\n}`
        },
        expectedOutput: {
            javascript: "[3,3,5,5,6,7]\n[1]",
            python: "[3, 3, 5, 5, 6, 7]\n[1]",
            java: "[3, 3, 5, 5, 6, 7]\n[1]"
        },
        topics: ["array", "sliding-window", "deque"]
    }
];
