import { useState } from "react";

// 全局集合，避免重复
const usedIds = new Set();
const usedNames = new Set();

export default function InputForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // 上传头像
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateField("photo", URL.createObjectURL(file));
    }
  };

  // ✅ 使用本地 public/avatars/men 的头像
  const generateRandomAvatar = () => {
    const id = Math.floor(Math.random() * 99) + 1; // 1 - 99
    return `/avatars/men/${id}.jpg`; // 直接引用 public 下的文件
  };

  // 生成唯一学号
  const generateUniqueId = () => {
    let newId;
    do {
      newId = "INT" + Math.floor(100000 + Math.random() * 900000); // 6位数
    } while (usedIds.has(newId));
    usedIds.add(newId);
    return newId;
  };

  // 生成唯一姓名
  const generateUniqueName = (firstNames, lastNames) => {
    let fullName;
    let first, last;
    do {
      first = firstNames[Math.floor(Math.random() * firstNames.length)];
      last = lastNames[Math.floor(Math.random() * lastNames.length)];
      fullName = `${first} ${last}`;
    } while (usedNames.has(fullName));
    usedNames.add(fullName);
    return { first, last };
  };

  // 一键随机生成资料
  const generateRandomAll = () => {
    const majors = ["Computer Science", "Mechanical Eng.", "Mathematics", "Physics"];
    const firstNames = ["Anand", "Meera", "Ravi", "Erick", "Sophia"];
    const lastNames = ["Kumar", "Sharma", "Singh", "Patel", "Verma"];

    const { first, last } = generateUniqueName(firstNames, lastNames);
    const randomId = generateUniqueId();

    onChange({
      firstName: first,
      lastName: last,
      id: randomId,
      major: majors[Math.floor(Math.random() * majors.length)],
      photo: generateRandomAvatar(),
    });
  };

  // 复制功能（静默复制）
  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).catch((err) => console.error("复制失败", err));
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium">大学</label>
        <input
          type="text"
          value="Kjit (Vadodara)"
          disabled
          className="w-full border rounded px-3 py-2 bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">First Name*</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={data.firstName || ""}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            type="button"
            onClick={() => copyToClipboard(data.firstName)}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            📋
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Last Name*</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={data.lastName || ""}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            type="button"
            onClick={() => copyToClipboard(data.lastName)}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            📋
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">学号</label>
        <input
          type="text"
          value={data.id || ""}
          onChange={(e) => updateField("id", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">专业</label>
        <input
          type="text"
          value={data.major || ""}
          onChange={(e) => updateField("major", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* 照片 */}
      <div>
        <label className="block text-sm font-medium">照片</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        <div className="mt-2 flex items-center space-x-4">
          {data.photo && (
            <img
              src={data.photo}
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

      {/* 一键随机 */}
      <button
        type="button"
        onClick={generateRandomAll}
        className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        🎲 一键随机生成所有信息
      </button>
    </form>
  );
}
