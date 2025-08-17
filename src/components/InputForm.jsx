import { useState } from "react";

export default function InputForm({ onChange, onRandom }) {
  const [photoPreview, setPhotoPreview] = useState(null);

  // 处理文件上传（头像）
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreview(ev.target.result);
        onChange("photo", ev.target.result); // 通知父组件
      };
      reader.readAsDataURL(file);
    }
  };

  // 随机头像
  const handleRandomPhoto = () => {
    const gender = Math.random() > 0.5 ? "men" : "women";
    const id = Math.floor(Math.random() * 90); // 0-89
    const url = `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
    setPhotoPreview(url);
    onChange("photo", url);
  };

  return (
    <div className="space-y-4">
      {/* 大学名称 */}
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
          onChange={(e) => onChange("name", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 学号 */}
      <div>
        <label className="block font-medium mb-1">学号</label>
        <input
          type="text"
          onChange={(e) => onChange("id", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 专业 */}
      <div>
        <label className="block font-medium mb-1">专业</label>
        <input
          type="text"
          onChange={(e) => onChange("major", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 照片上传 */}
      <div>
        <label className="block font-medium mb-1">照片</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {/* 头像预览 */}
        {photoPreview && (
          <img
            src={photoPreview}
            alt="preview"
            className="mt-2 w-24 h-24 rounded-full border object-cover"
          />
        )}
      </div>

      {/* 随机生成按钮 */}
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={onRandom}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          🎲 一键随机生成所有信息
        </button>
        <button
          type="button"
          onClick={handleRandomPhoto}
          className="bg-gray-600 text-white p-2 rounded"
        >
          🔄 随机头像
        </button>
      </div>
    </div>
  );
}
