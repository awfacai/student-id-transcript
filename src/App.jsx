import { useState } from "react";
import InputForm from "./components/InputForm";
import IDCardPreview from "./components/IDCardPreview";
import TranscriptPreview from "./components/TranscriptPreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function App() {
  const [formData, setFormData] = useState({});

  // 下载 PDF
  const handleDownloadPDF = async () => {
    const element = document.getElementById("preview-area"); // 右边整体区域
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("student_id_transcript.pdf");
  };

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
          <InputForm onChange={setFormData} />
        </div>

        {/* 右侧预览 */}
        <div className="space-y-6" id="preview-area">
          <IDCardPreview data={formData} />
          <TranscriptPreview data={formData} />
          <button
            onClick={handleDownloadPDF}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            ⬇️ 下载 PDF
          </button>
        </div>
      </main>
    </div>
  );
}
