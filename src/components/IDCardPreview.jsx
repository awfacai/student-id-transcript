export default function IDCardPreview({ data }) {
  if (!data) return null;

  // 如果没有照片，生成随机人像
  const randomPhoto = () => {
    const gender = Math.random() > 0.5 ? "men" : "women";
    const id = Math.floor(Math.random() * 90); // 0-89
    return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
  };

  const photoUrl = data.photo || randomPhoto();

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">🪪 学生证预览</h2>
      <div className="border p-4 rounded-lg flex items-center space-x-4">
        {/* 左边头像 */}
        <img
          src={photoUrl}
          alt="student"
          className="w-24 h-24 object-cover rounded-full border"
        />
        {/* 右边文字 */}
        <div>
          <img src="/logo.png" alt="logo" className="h-10 mb-2" />
          <p><strong>大学：</strong> Indian Institute of Technology Bombay</p>
          <p><strong>姓名：</strong> {data.name || "未填写"}</p>
          <p><strong>学号：</strong> {data.id || "未填写"}</p>
          <p><strong>专业：</strong> {data.major || "未填写"}</p>
        </div>
      </div>
    </div>
  );
}
