export default function TranscriptPreview({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-center">📑 成绩单预览</h2>

      {/* 校徽 */}
      <div className="flex justify-center mb-4">
        <img
          src={data.logo || "/iitb_logo.png"}
          alt="校徽"
          className="h-16"
        />
      </div>

      {/* 学生基本信息 */}
      <div className="text-center mb-6">
        <p className="font-bold text-xl">{data.name || "学生姓名"}</p>
        <p className="text-gray-700">{data.university || "大学名称"}</p>
        <p className="text-gray-700">学号: {data.id || "------"}</p>
        <p className="text-gray-700">专业: {data.faculty || "------"}</p>
      </div>

      {/* 成绩列表 (这里简单用假数据) */}
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">课程</th>
            <th className="border border-gray-300 p-2">成绩</th>
          </tr>
        </thead>
        <tbody>
          {(data.transcript || [
            { subject: "数学", grade: "A" },
            { subject: "物理", grade: "B+" },
            { subject: "计算机科学", grade: "A-" },
          ]).map((item, i) => (
            <tr key={i}>
              <td className="border border-gray-300 p-2">{item.subject}</td>
              <td className="border border-gray-300 p-2">{item.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
