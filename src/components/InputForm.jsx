import { useState } from "react";

export default function InputForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // 上传头像
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 真人随机头像 (异步函数)
  const generateRandomAvatar = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const photoUrl = data.results[0].picture.large;
      return photoUrl;
    } catch (error) {
      console.error("Failed to fetch random avatar:", error);
      return null;
    }
  };

  // 一键随机生成资料 (异步函数)
  const generateRandomAll = async () => {
    const randomId = "INT" + Math.floor(Math.random() * 1000000);
    const majors = ["Computer Science", "Mechanical Eng.", "Mathematics", "Physics"];
    const firstNames = ["Anand", "Meera", "Ravi", "Erick", "Sophia"];
    const lastNames = ["Kumar", "Sharma", "Singh", "Patel", "Verma"];
    const randomPhoto = await generateRandomAvatar();

    onChange({
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      id: randomId,
      major: majors[Math.floor(Math.random() * majors.length)],
      photo: randomPhoto,
    });
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
          value={data.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Last Name*</label>
        <input
          type="text"
          value={data.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">学号</label>
        <input
          type="text"
          value={data.id}
          onChange={(e) => updateField("id", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">专业</label>
        <input
          type="text"
          value={data.major}
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
            // 修复点: 使用 async 和 await
            onClick={async () => updateField("photo", await generateRandomAvatar())}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg"
          >
            🎲 随机头像
          </button>
        </div>
      </div>

      {/* 一键随机 */}
      <button
        type="button"
        // 修复点: 依然保持异步调用
        onClick={generateRandomAll}
        className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        🎲 一键随机生成所有信息
      </button>
    </form>
  );
}
