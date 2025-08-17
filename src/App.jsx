import { useState } from "react";
import InputForm from "./components/InputForm";
import IDCardPreview from "./components/IDCardPreview";
import TranscriptPreview from "./components/TranscriptPreview";

export default function App() {
  // 初始化 state，保证不会 undefined
  const [data, setData] = useState({
    uni: "Indian Institute of Technology Bombay",
    name: "Anand Kumar",
    id: "INT798835",
    faculty: "Faculty of Medicine",
    issue: "2023-12-27",
    expiry: "2027-12-27",
    photo: null,
    logo: null,
    semester: "Dec 2023 – Feb 2024",
    courses: [
      { code: "MED101", title: "Anatomy", credits: 4, grade: "A", gpa: 4.0 },
      { code: "MED102", title: "Physiology", credits: 3, grade: "B+", gpa: 3.3 },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white py-4 shadow">
        <h1 className="text-center text-2xl font-bold">
          🎓 国际学生证 & 成绩单生成器
        </h1>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-2 gap-6">
        {/* 左侧表单 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">📋 填写信息</h2>
          {/* ✅ 传递 data 和 setData */}
          <InputForm data={data} setData={setData} />
        </div>

        {/* 右侧预览 */}
        <div className="space-y-6">
          {/* ✅ 传递 data */}
          <IDCardPreview data={data} />
          <TranscriptPreview data={data} />
        </div>
      </main>
    </div>
  );
}
