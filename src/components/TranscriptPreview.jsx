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

  // ✅ 默认课程数据
  const defaultCourses = [
    { code: "MED101", title: "Anatomy and Physiology", credits: 3, grade: "A", gpa: 4.0 },
    { code: "MED102", title: "Biochemistry", credits: 3, grade: "B+", gpa: 3.3 },
    { code: "MED103", title: "Pathology", credits: 2, grade: "A-", gpa: 3.7 },
    { code: "MED104", title: "Pharmacology", credits: 3, grade: "B", gpa: 3.0 },
    { code: "MED105", title: "Clinical Practice", credits: 3, grade: "A", gpa: 4.0 },
  ];

  const courses = data.courses && data.courses.length > 0 ? data.courses : defaultCourses;

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">📑 成绩单预览</h2>

      <div ref={transcriptRef} className="border p-6 rounded-lg">
        {/* 顶部 logo 和标题 */}
        <div className="flex items-center space-x-3 mb-4">
          <img src="/logo.png" alt="logo" className="h-14" />
          <div>
            <h3 className="text-xl font-bold">
              FIITJEE Hyderabad
            </h3>
            <p className="text-sm text-gray-700">Faculty of Medicine</p>
            <p className="text-sm text-gray-600">Official Academic Transcript</p>
          </div>
        </div>

{/* 学生基本信息 */}
<div className="mb-4 text-sm">
  <p>
    <strong>Name:</strong>{" "}
    {data.firstName || data.lastName
      ? `${data.firstName || ""} ${data.lastName || ""}`
      : "未填写"}
  </p>
  <p><strong>Student ID:</strong> {data.id || "未填写"}</p>
  <p><strong>Semester:</strong> {data.semester || "Dec 2023 – Feb 2024"}</p>
</div>


        {/* 成绩表 */}
        <table className="w-full text-sm text-left border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Course Code</th>
              <th className="p-2 border">Course Title</th>
              <th className="p-2 border">Credits</th>
              <th className="p-2 border">Grade</th>
              <th className="p-2 border">GPA</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr key={i}>
                <td className="p-2 border">{c.code}</td>
                <td className="p-2 border">{c.title}</td>
                <td className="p-2 border">{c.credits}</td>
                <td className="p-2 border">{c.grade}</td>
                <td className="p-2 border">{c.gpa}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 总结信息 */}
        <div className="text-sm mb-4">
          <p><strong>Total Credits:</strong> {data.totalCredits || "14"}</p>
          <p><strong>Cumulative GPA:</strong> {data.cumulativeGPA || "3.67 / 4.00"}</p>
          <p><strong>Rank:</strong> {data.rank || "Top 10%"}</p>
        </div>

        {/* 评语 */}
        <div className="text-sm mb-4">
          <strong>Remarks:</strong>
          <p>
            {data.remarks ||
              "The student has demonstrated strong foundational knowledge in medicine and outstanding clinical skills. He/She is diligent, research-oriented, and has shown excellent teamwork and professional conduct, particularly in clinical practice."}
          </p>
        </div>

        {/* 签名和日期 */}
        <div className="text-sm mt-6">
          <p>Registrar, Faculty of Medicine</p>
          <p>FIITJEE Hyderabad</p>
          <p>Date: {data.date || "2024-03-01"}</p>
        </div>
      </div>

      {/* 下载按钮 */}
      <button
        onClick={handleDownload}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        ⬇️ 下载成绩单 PDF
      </button>
    </div>
  );
}
