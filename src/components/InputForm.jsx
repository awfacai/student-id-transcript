import { useState } from "react";

export default function InputForm({ data, onChange }) {
  const [formData, setFormData] = useState(data);

  // 统一更新状态
  const updateField = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  // 上传头像
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField("photo", reader.result); // base64
      };
      reader.readAsDataURL(file);
    }
  };

  // 生成随机头像（DiceBear）
  const generateRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(7);
    return `https://avatars.dicebear.com/api/adventurer/${seed}.svg`;
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium">大学</label>
        <input
          type="text"
          value="Indian Institute of Technology Bombay"
          disabled
          className="w-full border rounded px-3 py-2 bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">First Name*</label>
        <input
          type="text"
          value={formData.firstName || ""}
          onChange={(e) => updateField("firstName", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Last Name*</label>
        <input
          type="text"
          value={formData.lastName || ""}
          onChange={(e) => updateField("lastName", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">学号</label>
        <input
          type="text"
          value={formData.id || ""}
          onChange={(e) => updateField("id", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">专业</label>
        <input
          type="text"
          value={formData.major || ""}
          onChange={(e) => updateField("major", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* 照片上传 + 随机头像 */}
      <div>
        <label className="block text-sm font-medium">照片</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        <div className="mt-2 flex items-center space-x-4">
          {formData.photo && (
            <img
              src={formData.photo}
              alt="preview"
              className="w-20 h-20 rounded-full border object-cover"
            />
          )}
          <button
            type="button"
            onClick={() => updateField("photo", generateRandomAvatar())}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg"
          >
            🎲 随机头像
          </button>
        </div>
      </div>
    </form>
  );
}
