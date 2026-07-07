const fs = import("fs");
const path = import("path");

const dirsToSearch = [
  "app",
  "components",
  "hooks",
  "lib",
  "providers",
  "types",
  "utils",
  "services",
  "store",
];

const isCodeHeuristic = (text) => {
  if (
    /eslint-disable/i.test(text) ||
    /@ts-/i.test(text) ||
    /TODO/i.test(text) ||
    /FIXME/i.test(text) ||
    /NOTE/i.test(text) ||
    /HACK/i.test(text) ||
    /WARNING/i.test(text)
  ) {
    return false;
  }

  const codePatterns = [
    /^\s*import\s+.*from/,
    /^\s*(const|let|var)\s+\w+\s*=/,
    /^\s*function\s+\w+\s*\(/,
    /^\s*return\s+/,
    /^\s*console\.(log|error|warn|info)\(/,
    /^\s*export\s+(const|default|function|type|interface)/,
    /^\s*interface\s+\w+/,
    /^\s*type\s+\w+\s*=/,
    /^\s*<[A-Z]\w+/, // React component start
    /^\s*<(div|span|p|a\s+|img|button|ul|li|section|header|footer|nav|main|form|input|label)/, // Common HTML
    /^\s*<\/[A-Za-z]+>/, // JSX end
    /^\s*className=/,
    /^\s*onClick=/,
  ];

  return codePatterns.some((pattern) => pattern.test(text));
};

const findCommentedCode = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const matches = [];

  let inMultiLineComment = false;
  let multiLineBuffer = [];
  let multiLineStart = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check single line comments
    const singleLineMatch = line.match(/^\s*\/\/\s*(.*)/);
    if (singleLineMatch) {
      if (isCodeHeuristic(singleLineMatch[1])) {
        matches.push({ line: i + 1, content: line, type: "single" });
      }
    }

    // Very basic JSX comment check
    const jsxCommentMatch = line.match(/^\s*\{\/\*\s*(.*?)\s*\*\/\}\s*$/);
    if (jsxCommentMatch) {
      if (
        isCodeHeuristic(jsxCommentMatch[1]) ||
        /<[a-zA-Z]+/.test(jsxCommentMatch[1])
      ) {
        matches.push({ line: i + 1, content: line, type: "jsx-single" });
      }
    }
  }

  if (matches.length > 0) {
    console.log(`\nFile: ${filePath}`);
    matches.forEach((m) =>
      console.log(`  Line ${m.line}: ${m.content.trim()}`),
    );
  }
};

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== "node_modules" && file !== ".git" && file !== ".next") {
        walkSync(filePath, filelist);
      }
    } else if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) {
      findCommentedCode(filePath);
    }
  });
  return filelist;
};

dirsToSearch.forEach((dir) => {
  walkSync(path.join(process.cwd(), dir));
});
