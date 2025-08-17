import { useState } from "react";
import InputForm from "./components/InputForm";
import IDCardPreview from "./components/IDCardPreview";
import TranscriptPreview from "./components/TranscriptPreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function App() {
  const [data, setData] = useState({
    uni: "Indian Institute of Technology Bombay",
    name: "",
    id: "",
    major: "",
    photo: "",
    courses: [
      { name: "Mathematics", grade: "A" },
      { name: "Physics", grade: "B+" },
      { name: "Computer Science", grade: "A-" },
    ],
  });

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // 随机生成所有信息（带随机头像）
  const handleRandom = async () => {
    const randomName = ["Rahul Sharma", "Ananya Gupta", "Erick Schimmel", "Li Wei", "John Doe"];
    const randomMajors = ["Computer Science", "Electrical Engineering", "Mechanical", "Mathematics", "Physics"];
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();

    // 调用 randomuser.me API 获取头像
    const res = await fetch("https://randomuser.me/api/");
    const user = await res.json();
    const randomPhoto = user.results[0].picture.large;

    setData({
      uni: "Indian Institute of Technology Bombay",
      name: randomName[Math.floor(Math.random() * randomName.length)],
      id: randomId,
      major: randomMajors[Math.floor(Math.random() * randomMajors.length)],
      photo: randomPhoto,
      courses: [
        { name: "Mathematics", grade: "A" },
        { name: "Physics", grade: "B+" },
        { name: "Computer Science", grade: "A-" },
      ],
    });
  };

  const handleDownload = async () => {
    const element = document.getElementById("preview-area");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("student-docs.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white py-4 shadow">
        <h1 className="text-center text-2xl font-bold">
          🎓 国际学生证 & 成绩单生成器
        </h1>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 左侧表单 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">📋 填写信息</h2>
          <InputForm onChange={handleChange} onRandom={handleRandom} data={data} />
        </div>

        {/* 右侧预览 */}
        <div id="preview-area" className="space-y-6">
          <IDCardPreview data={data} />
          <TranscriptPreview data={data} />
        </div>
      </main>

      <footer className="p-6 text-center">
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white py-2 px-6 rounded shadow hover:bg-green-700"
        >
          📥 下载 PDF
        </button>
      </footer>
    </div>
  );
}
