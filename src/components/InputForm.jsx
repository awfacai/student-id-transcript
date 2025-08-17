import { useState } from "react";

export default function InputForm({ data, setData }) {
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  // 随机头像
  const generateRandomPhoto = async () => {
    setLoadingPhoto(true);
    try {
      const res = await fetch("https://randomuser.me/api/");
      const json = await res.json();
      const photoUrl = json.results[0].picture.large;
      setData({ ...data, photo: photoUrl });
    } catch (e) {
      console.error("获取随机头像失败:", e);
    } finally {
      setLoadingPhoto(false);
    }
  };

  // 上传头像
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setData({ ...data, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // 随机生成所有信息
  const generateRandomData = async () => {
    try {
      const res = await fetch("https://randomuser.me/api/");
      const json = await res.json();
      const user = json.results[0];

      setData({
        ...data,
        name: `${user.name.first} ${user.name.last}`,
        id: "ID" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        major: "Computer Science",
        photo: user.picture.large,
      });
    } catch (e) {
      console.error("生成随机数据失败:", e);
    }
  };

  return (
    <div className="space-y-4">
      {/* 大学固定 */}
      <div>
        <label className="block font-medium mb-1">大学</label>
        <input
          type="text"
          value={data.university}
          disabled
          className="w-full border rounded px-3 py-2 bg-gray-100"
        />
      </div>

      {/* 姓名 */}
      <div>
        <label className="block font-medium mb-1">姓名</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* 学号 */}
      <div>
        <label className="block font-medium mb-1">学号</label>
        <input
          type="text"
          value={data.id}
          onChange={(e) => setData({ ...data, id: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* 专业 */}
      <div>
        <label className="block font-medium mb-1">专业</label>
        <input
          type="text"
          value={data.major}
          onChange={(e) => setData({ ...data, major: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* 照片 */}
      <div>
        <label className="block font-medium mb-1">照片</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        <div className="mt-3 flex items-center space-x-3">
          {loadingPhoto ? (
            <p className="text-gray-500">生成中...</p>
          ) : (
            <img
              src={data.photo || "https://via.placeholder.com/100"}
              alt="preview"
              className="w-24 h-24 object-cover rounded-full border"
            />
          )}
          <button
            onClick={generateRandomPhoto}
            type="button"
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            🔄 随机头像
          </button>
        </div>
      </div>

      {/* 一键随机 */}
      <button
        onClick={generateRandomData}
        type="button"
        className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        🎲 一键随机生成所有信息
      </button>
    </div>
  );
}
