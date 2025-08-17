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
    photo: "", // 照片直接放这里
    courses: [
      { name: "Mathematics", grade: "A" },
      { name: "Physics", grade: "B+" },
      { name: "Computer Science", grade: "A-" },
    ],
  });

  // 更新某个字段
  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // 随机生成全部信息
  const handleRandom = async () => {
    const randomName = ["Rahul Sharma", "Ananya Gupta", "Erick Schimmel", "Li Wei", "John Doe"];
    const randomMajors = ["Computer Science", "Electrical Engineering", "Mechanical", "Mathematics", "Physics"];
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();

    // 头像
    const gender = Math.random() > 0.5 ? "men" : "women";
    const idNum = Math.floor(Math.random() * 90);
    const randomPhoto = `https://randomuser.me/api/portraits/${gender}/${idNum}.jpg`;

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

  // 下载 PDF
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

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-2 gap-6">
        {/* 左边表单 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">📋 填写信息</h2>
          <InputForm onChange={handleChange} onRandom={handleRandom} data={data} />
        </div>

        {/* 右边预览 */}
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
