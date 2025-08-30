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

  // 生成最近一个月的日期
  const getRecentDate = () => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return oneMonthAgo.toISOString().split('T')[0]; // 格式: YYYY-MM-DD
  };

  // 根据学校生成学期信息
  const getSemesterInfo = (school) => {
    if (!school) return "Dec 2023 – Feb 2024";
    
    const currentYear = new Date().getFullYear();
    if (school.country === "Japan") {
      return `April ${currentYear} – March ${currentYear + 1}`;
    } else if (school.country === "USA") {
      return `Fall ${currentYear} – Spring ${currentYear + 1}`;
    } else {
      return `Dec ${currentYear} – Feb ${currentYear + 1}`;
    }
  };

  // 根据学校生成专业信息
  const getFacultyInfo = (school) => {
    if (!school) return "Faculty of Medicine";
    
    if (school.country === "Japan") {
      return "学部・研究科";
    } else if (school.country === "USA") {
      return "School of Arts and Sciences";
    } else {
      return "Faculty of Medicine";
    }
  };

  // ✅ 默认课程数据
  const getDefaultCourses = (school) => {
    if (!school) {
      return [
        { code: "MED101", title: "Anatomy and Physiology", credits: 3, grade: "A", gpa: 4.0 },
        { code: "MED102", title: "Biochemistry", credits: 3, grade: "B+", gpa: 3.3 },
        { code: "MED103", title: "Pathology", credits: 2, grade: "A-", gpa: 3.7 },
        { code: "MED104", title: "Pharmacology", credits: 3, grade: "B", gpa: 3.0 },
        { code: "MED105", title: "Clinical Practice", credits: 3, grade: "A", gpa: 4.0 },
      ];
    }

    if (school.country === "Japan") {
      return [
        { code: "JPN101", title: "Japanese Language I", credits: 4, grade: "A", gpa: 4.0 },
        { code: "ENG201", title: "Advanced English", credits: 3, grade: "A-", gpa: 3.7 },
        { code: "MATH301", title: "Calculus III", credits: 4, grade: "B+", gpa: 3.3 },
        { code: "PHYS401", title: "Quantum Physics", credits: 3, grade: "A", gpa: 4.0 },
        { code: "CS501", title: "Computer Science", credits: 3, grade: "A-", gpa: 3.7 },
      ];
    } else if (school.country === "USA") {
      return [
        { code: "ENG101", title: "Composition & Rhetoric", credits: 3, grade: "A", gpa: 4.0 },
        { code: "MATH150", title: "Calculus I", credits: 4, grade: "A-", gpa: 3.7 },
        { code: "CHEM101", title: "General Chemistry", credits: 4, grade: "B+", gpa: 3.3 },
        { code: "PHYS101", title: "Physics I", credits: 4, grade: "A", gpa: 4.0 },
        { code: "HIST101", title: "World History", credits: 3, grade: "A-", gpa: 3.7 },
      ];
    } else {
      return [
        { code: "MED101", title: "Anatomy and Physiology", credits: 3, grade: "A", gpa: 4.0 },
        { code: "MED102", title: "Biochemistry", credits: 3, grade: "B+", gpa: 3.3 },
        { code: "MED103", title: "Pathology", credits: 2, grade: "A-", gpa: 3.7 },
        { code: "MED104", title: "Pharmacology", credits: 3, grade: "B", gpa: 3.0 },
        { code: "MED105", title: "Clinical Practice", credits: 3, grade: "A", gpa: 4.0 },
      ];
    }
  };

  const courses = data.courses && data.courses.length > 0 ? data.courses : getDefaultCourses(school);
  const school = data.school || { name: "Kjit (Vadodara)", logo: "/kjit-campus-logo-white.svg" };

  // 根据学校生成默认评语
  const getDefaultRemarks = (school) => {
    if (!school) return "The student has demonstrated strong foundational knowledge in medicine and outstanding clinical skills. He/She is diligent, research-oriented, and has shown excellent teamwork and professional conduct, particularly in clinical practice.";

    if (school.country === "Japan") {
      return "この学生は、日本語の習得において優秀な成績を収め、学術研究においても高い能力を示しています。特に、数学と物理学の分野で卓越した理解力を持ち、研究への積極的な取り組みが評価されています。";
    } else if (school.country === "USA") {
      return "The student has demonstrated exceptional academic performance across all disciplines. With strong analytical skills in mathematics and sciences, excellent writing abilities, and a deep understanding of historical contexts, this student shows great potential for advanced studies and research.";
    } else {
      return "The student has demonstrated strong foundational knowledge in medicine and outstanding clinical skills. He/She is diligent, research-oriented, and has shown excellent teamwork and professional conduct, particularly in clinical practice.";
    }
  };

  // 计算总学分
  const calculateTotalCredits = (courses) => {
    return courses.reduce((sum, course) => sum + course.credits, 0);
  };

  // 计算平均GPA
  const calculateGPA = (courses) => {
    const totalCredits = calculateTotalCredits(courses);
    if (totalCredits === 0) return "0.00";
    const totalGradePoints = courses.reduce((sum, course) => sum + (course.gpa * course.credits), 0);
    return (totalGradePoints / totalCredits).toFixed(2);
  };

  // 根据学校生成默认排名
  const getDefaultRank = (school) => {
    if (!school) return "Top 10%";
    if (school.country === "Japan") {
      return "上位10%";
    } else if (school.country === "USA") {
      return "Top 10%";
    } else {
      return "Top 10%";
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">📑 成绩单预览</h2>

      <div ref={transcriptRef} className="border p-6 rounded-lg">
        {/* 顶部 logo 和标题 */}
        <div className="flex items-center space-x-3 mb-4">
          <img src={school.logo} alt="logo" className="h-14" />
          <div>
            <h3 className="text-xl font-bold">
              {school.name}
            </h3>
            <p className="text-sm text-gray-700">{getFacultyInfo(school)}</p>
            <p className="text-sm text-gray-600">{school.country === "Japan" ? "正式な成績証明書" : "Official Academic Transcript"}</p>
          </div>
        </div>

        {/* 学生基本信息 */}
        <div className="mb-4 text-sm">
          <p>
            <strong>{school.country === "Japan" ? "氏名:" : "Name:"}</strong>{" "}
            {data.firstName || data.lastName
              ? `${data.firstName || ""} ${data.lastName || ""}`
              : "未填写"}
          </p>
          <p><strong>{school.country === "Japan" ? "学籍番号:" : "Student ID:"}</strong> {data.id || "未填写"}</p>
          <p><strong>{school.country === "Japan" ? "学期:" : "Semester:"}</strong> {getSemesterInfo(school)}</p>
        </div>


        {/* 成绩表 */}
        <table className="w-full text-sm text-left border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">{school.country === "Japan" ? "科目コード" : "Course Code"}</th>
              <th className="p-2 border">{school.country === "Japan" ? "科目名" : "Course Title"}</th>
              <th className="p-2 border">{school.country === "Japan" ? "単位数" : "Credits"}</th>
              <th className="p-2 border">{school.country === "Japan" ? "成績" : "Grade"}</th>
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
          <p><strong>{school.country === "Japan" ? "総単位数:" : "Total Credits:"}</strong> {data.totalCredits || calculateTotalCredits(courses)}</p>
          <p><strong>{school.country === "Japan" ? "累積GPA:" : "Cumulative GPA:"}</strong> {data.cumulativeGPA || calculateGPA(courses)}</p>
          <p><strong>{school.country === "Japan" ? "順位:" : "Rank:"}</strong> {data.rank || getDefaultRank(school)}</p>
        </div>

        {/* 评语 */}
        <div className="text-sm mb-4">
          <strong>{school.country === "Japan" ? "評語:" : "Remarks:"}</strong>
          <p>
            {data.remarks || getDefaultRemarks(school)}
          </p>
        </div>

        {/* 签名和日期 */}
        <div className="text-sm mt-6">
          <p>{school.country === "Japan" ? "教務主任," : "Registrar,"} {getFacultyInfo(school)}</p>
          <p>{school.name}</p>
          <p>{school.country === "Japan" ? "発行日:" : "Date:"} {data.date || getRecentDate()}</p>
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
