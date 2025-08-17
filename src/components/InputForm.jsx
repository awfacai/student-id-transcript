import { useState } from "react";
import { faker } from "@faker-js/faker";

export default function InputForm({ onChange }) {
  const [formData, setFormData] = useState({
    university: "Indian Institute of Technology Bombay",
    name: "",
    id: "",
    major: "",
    photo: "",
    courses: [
      { name: "Mathematics", grade: "A" },
      { name: "Physics", grade: "B+" },
      { name: "Computer Science", grade: "A-" },
    ],
  });

  // 🔄 更新数据
  const updateField = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange && onChange(updated);
  };

  // 🔄 随机头像（只真人像）
  const randomAvatar = () => {
    const gender = Math.random() > 0.5 ? "men" : "women";
    const id = Math.floor(Math.random() * 90); // 0-89
    // 每次生成不同的 URL，避免浏览器缓存
    return `https://randomuser.me/api/portraits/${gender}/${id}.jpg?rand=${Date.now()}`;
  };

  // 🔄 随机单个字段
  const randomField = (field) => {
    let value;
    switch (field) {
      case "name":
        value = faker.person.fullName();
        break;
      case "id":
        value = faker.string.alphanumeric(8).toUpperCase();
        break;
      case "major":
        value = faker.word.words(2);
        break;
      case "photo":
        value = randomAvatar();
        break;
      default:
        value = "";
    }
    updateField(field, value);
  };

  // 🔄 一键随机所有
  const randomAll = () => {
    const all = {
      university: "Indian Institute of Technology Bombay",
      name: faker.person.fullName(),
      id: faker.string.alphanumeric(8).toUpperCase(),
      major: faker.word.words(2),
      photo: randomAvatar(),
      courses: [
        { name: "Mathematics", grade: "A" },
        { name: "Physics", grade: "B+" },
        { name: "Computer Science", grade: "A-" },
      ],
    };
    setFormData(all);
    onChange && onChange(all);
  };

  return (
    <form className="space-y-4">
      {/* 大学 */}
      <div>
        <label className="block font-medium mb-1">大学</label>
        <input
          type="text"
          value={formData.university}
          readOnly
          className="w-full border rounded p-2 bg-gray-100"
        />
      </div>

      {/* 姓名 */}
      <div>
        <label className="block font-medium mb-1">姓名</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("name")}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 学号 */}
      <div>
        <label className="block font-medium mb-1">学号</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={formData.id}
            onChange={(e) => updateField("id", e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("id")}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 专业 */}
      <div>
        <label className="block font-medium mb-1">专业</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={formData.major}
            onChange={(e) => updateField("major", e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("major")}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 照片 + 预览 */}
      <div>
        <label className="block font-medium mb-1">照片</label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              updateField("photo", URL.createObjectURL(e.target.files[0]))
            }
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("photo")}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            🔄
          </button>
        </div>
        {formData.photo && (
          <img
            src={formData.photo}
            alt="preview"
            className="mt-2 w-24 h-24 object-cover rounded-full border"
          />
        )}
      </div>

      {/* 一键填充 */}
      <button
        type="button"
        onClick={randomAll}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        🎲 一键随机生成所有信息
      </button>
    </form>
  );
}
