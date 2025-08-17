import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function TranscriptPreview({ data }) {
  const transcriptRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(transcriptRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("transcript.pdf");
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">📑 成绩单预览</h2>
      <div ref={transcriptRef} className="border p-4 rounded-lg">
        <div className="flex items-center space-x-3 mb-4">
          <img src="/logo.png" alt="logo" className="h-12" />
          <div>
            <h3 className="text-lg font-bold">
              Indian Institute of Technology Bombay
            </h3>
            <p className="text-sm text-gray-600">Official Academic Transcript</p>
          </div>
        </div>
        <p><strong>Name:</strong> {data.name || "未填写"}</p>
        <p><strong>Student ID:</strong> {data.id || "未填写"}</p>
        <p><strong>Faculty:</strong> {data.major || "未填写"}</p>
        <hr className="my-3" />
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Grade</th>
            </tr>
          </thead>
          <tbody>
            {(data.courses || []).map((c, i) => (
              <tr key={i}>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 下载按钮 */}
      <button
        onClick={handleDownload}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ⬇️ 下载成绩单 PDF
      </button>
    </div>
  );
}
