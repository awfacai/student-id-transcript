import { useState } from "react";
import InputForm from "./components/InputForm";
import IDCardPreview from "./components/IDCardPreview";
import TranscriptPreview from "./components/TranscriptPreview";

export default function App() {
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
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎓 学生证 & 成绩单生成器</h1>
      <div className="grid grid-cols-2 gap-6">
        <InputForm data={data} setData={setData} />
        <div className="space-y-6">
          <IDCardPreview data={data} />
          <TranscriptPreview data={data} />
        </div>
      </div>
    </div>
  );
}
