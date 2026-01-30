interface Props {
  role: "student" | "teacher";
  setRole: (role: "student" | "teacher") => void;
}

export default function AuthTabs({ role, setRole }: Props) {
  return (
    <div className="flex bg-gray-800 rounded-lg p-1 mb-6 font-medium ">
      {(["student", "teacher"] as const).map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`flex-1 py-2 text-sm rounded-md transition-all ${
            role === r
              ? "bg-gray-950 text-blue-400 shadow"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          {r === "student" ? "Student" : "Teacher"}
        </button>
      ))}
    </div>
  );
}
