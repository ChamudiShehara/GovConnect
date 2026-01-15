export const detectDepartment = async (description, departmentNames) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt: `
Choose ONLY ONE department from this list:
${departmentNames.join(", ")}

Complaint:
"${description}"

Reply with ONLY the department name.
`,
      stream: false,
    }),
  });

  const data = await response.json();
  return data.response.trim().toLowerCase();
};
