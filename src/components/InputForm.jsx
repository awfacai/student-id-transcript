import { useState } from "react";

export default function InputForm({ onChange, onRandom, data }) {
  const [photoPreview, setPhotoPreview] = useState(data.photo);

  // 文件上传
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreview(ev.target.result);
        onChange("photo", ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 随机头像
  const handleRandomPhoto = async () => {
    const res = await fetch("https://randomuser.me/api/");
    const user = await res.json();
    const url = user.results[0].picture.large;
    setPhotoPreview(url);
    onChange("photo", url);
  };

  return (
    <div className="space-y-4">
      {/* 大学 */}
      <div>
        <label className="block font-medium mb-1">大学</label>
        <input
          type="text"
          value="Indian Institute of Technology Bombay"
          readOnly
          className="w-full border rounded p-2 bg-gray-100"
        />
      </div>

      {/* 姓名 */}
      <div>
        <label className="block font-medium mb-1">姓名</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 学号 */}
      <div>
        <label className="block font-medium mb-1">学号</label>
        <input
          type="text"
          value={data.id}
          onChange={(e) => onChange("id", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 专业 */}
      <div>
        <label className="block font-medium mb-1">专业</label>
        <input
          type="text"
          value={data.major}
          onChange={(e) => onChange("major", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 照片 */}
      <div>
        <label className="block font-medium mb-1">照片</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {photoPreview && (
          <img
            src={photoPreview}
            alt="preview"
            className="mt-2 w-24 h-24 rounded-full border object-cover"
          />
        )}
      </div>

      {/* 按钮 */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={onRandom}
          className="flex-1 bg-blue-600 text-white p-2 rounded"
        >
          🎲 一键随机生成所有信息
        </button>
        <button
          type="button"
          onClick={handleRandomPhoto}
          className="flex-1 bg-gray-600 text-white p-2 rounded"
        >
          🔄 随机头像
        </button>
      </div>
    </div>
  );
}
