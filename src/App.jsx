import { useState } from "react";
import InputForm from "./components/InputForm";
import IDCardPreview from "./components/IDCardPreview";
import TranscriptPreview from "./components/TranscriptPreview";

export default function App() {
  const [data, setData] = useState({
    university: "Indian Institute of Technology Bombay",
    firstName: "",
    lastName: "",
    id: "",
    major: "",
    photo: "",
    courses: [
      { name: "Mathematics", grade: "A" },
      { name: "Physics", grade: "B+" },
      { name: "Computer Science", grade: "A-" },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white py-4 shadow">
        <h1 className="text-center text-xl md:text-2xl font-bold">
          🎓 国际学生证 & 成绩单生成器
        </h1>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 左侧表单 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">📋 填写信息</h2>
          <InputForm data={data} setData={setData} />
        </div>

        {/* 右侧预览 */}
        <div className="space-y-6">
          <IDCardPreview data={data} />
          <TranscriptPreview data={data} />
        </div>
      </main>
    </div>
  );
}
