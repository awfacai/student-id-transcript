import { useRef } from "react";
import html2canvas from "html2canvas";

export default function IDCardPreview({ data }) {
  const cardRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.download = "student-id-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">🪪 学生证预览</h2>
      <div ref={cardRef} className="border rounded-lg w-[400px] mx-auto">
        {/* Header */}
        <div className="bg-red-600 text-white flex items-center px-4 py-2 rounded-t-lg">
          <img src="/logo.png" alt="logo" className="h-10 mr-3" />
          <div>
            <h3 className="font-bold">Indian Institute of Technology Bombay</h3>
            <p className="text-sm">INTERNATIONAL STUDENT ID CARD</p>
          </div>
        </div>
        {/* Body */}
        <div className="p-4 flex space-x-4">
          <img
            src={data.photo || "https://randomuser.me/api/portraits/men/1.jpg"}
            alt="student"
            className="w-24 h-24 object-cover rounded-lg border"
          />
          <div className="text-gray-800 space-y-1">
            <p><strong>NAME:</strong> {data.name || "未填写"}</p>
            <p><strong>STUDENT ID:</strong> {data.id || "未填写"}</p>
            <p><strong>FACULTY:</strong> {data.major || "未填写"}</p>
          </div>
        </div>
        {/* Footer */}
        <div className="grid grid-cols-2 text-center text-sm border-t">
          <div className="py-2">ISSUE<br /><b>2023-12-27</b></div>
          <div className="py-2">VALID<br /><b>2027-12-27</b></div>
        </div>
      </div>

      {/* 下载按钮 */}
      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ⬇️ 下载学生证 PNG
      </button>
    </div>
  );
}
