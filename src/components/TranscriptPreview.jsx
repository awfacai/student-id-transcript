export default function TranscriptPreview({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">📑 成绩单预览</h2>
      <div className="border p-4 rounded-lg">
        {/* 顶部校徽 + 标题 */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src="/iitb-logo.png"
            alt="IIT Bombay Logo"
            className="h-12"
          />
          <div>
            <h3 className="text-lg font-bold">
              Indian Institute of Technology Bombay
            </h3>
            <p className="text-sm text-gray-600">学生成绩单</p>
          </div>
        </div>

        {/* 基本信息 */}
        <p>
          <strong>姓名：</strong> {data.name || "未填写"}
        </p>
        <p>
          <strong>学号：</strong> {data.id || "未填写"}
        </p>
        <p>
          <strong>专业：</strong> {data.major || "未填写"}
        </p>

        <hr className="my-3" />

        {/* 课程表 */}
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">课程</th>
              <th className="p-2 border">成绩</th>
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
    </div>
  );
}
