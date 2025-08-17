export default function IDCardPreview({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <h2 className="text-lg font-semibold mb-4">🎫 学生证预览</h2>

      {/* 校徽 */}
      <img
        src={data.logo || "/iitb_logo.png"}
        alt="校徽"
        className="h-16 mx-auto mb-4"
      />

      {/* 照片 */}
      <div className="w-32 h-32 mx-auto mb-4 border rounded overflow-hidden">
        {data.photo ? (
          <img
            src={typeof data.photo === "string" ? data.photo : URL.createObjectURL(data.photo)}
            alt="学生照片"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
            无照片
          </div>
        )}
      </div>

      {/* 信息 */}
      <p className="font-bold text-xl">{data.name || "学生姓名"}</p>
      <p className="text-gray-700">{data.university || "大学名称"}</p>
      <p className="text-gray-700">学号: {data.id || "------"}</p>
      <p className="text-gray-700">专业: {data.faculty || "------"}</p>

      {/* 日期 */}
      <div className="mt-4 text-sm text-gray-600">
        <p>签发日期: {data.issueDate || "YYYY-MM-DD"}</p>
        <p>有效期至: {data.validUntil || "YYYY-MM-DD"}</p>
      </div>
    </div>
  );
}
