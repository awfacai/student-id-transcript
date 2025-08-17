export default function IDCardPreview({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">🪪 学生证预览</h2>
      <div className="border p-4 rounded-lg flex items-center space-x-4">
        {/* 左边头像 */}
        <img
          src={data.photo || "/placeholder-avatar.png"}
          alt="student"
          className="w-24 h-24 object-cover rounded-full border"
        />
        {/* 右边信息 */}
        <div>
          <img src="/iitb-logo.png" alt="logo" className="h-10 mb-2" />
          <p><strong>大学：</strong> {data.uni}</p>
          <p><strong>姓名：</strong> {data.name || "未填写"}</p>
          <p><strong>学号：</strong> {data.id || "未填写"}</p>
          <p><strong>专业：</strong> {data.major || "未填写"}</p>
        </div>
      </div>
    </div>
  );
}
