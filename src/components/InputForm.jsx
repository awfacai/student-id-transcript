import { useState } from "react";
import { faker } from "@faker-js/faker";

export default function InputForm({ onChange }) {
  const [form, setForm] = useState({
    university: "Indian Institute of Technology Bombay",
    name: "",
    id: "",
    faculty: "",
    issueDate: "",
    validUntil: "",
    photo: null,
    logo: "/iitb_logo.png", // 固定 IITB 校徽
  });

  // 更新字段
  const handleChange = (key, value) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    onChange(updated);
  };

  // 随机单个字段
  const randomField = (key) => {
    let value = "";
    switch (key) {
      case "name":
        value = faker.person.fullName();
        break;
      case "id":
        value = faker.string.alphanumeric(8).toUpperCase();
        break;
      case "faculty":
        value = faker.commerce.department();
        break;
      case "issueDate":
        value = faker.date.past().toISOString().split("T")[0];
        break;
      case "validUntil":
        value = faker.date.future().toISOString().split("T")[0];
        break;
      case "photo":
        value = faker.image.avatar(); // 随机头像
        break;
      default:
        value = form[key];
    }
    handleChange(key, value);
  };

  // 一键随机填充
  const randomAll = () => {
    const newData = {
      university: "Indian Institute of Technology Bombay",
      name: faker.person.fullName(),
      id: faker.string.alphanumeric(8).toUpperCase(),
      faculty: faker.commerce.department(),
      issueDate: faker.date.past().toISOString().split("T")[0],
      validUntil: faker.date.future().toISOString().split("T")[0],
      photo: faker.image.avatar(),
      logo: "/iitb_logo.png",
    };
    setForm(newData);
    onChange(newData);
  };

  return (
    <form className="space-y-4">
      {/* 大学名称 - 固定 IITB */}
      <div>
        <label className="block font-medium mb-1">大学名称</label>
        <input
          type="text"
          value={form.university}
          readOnly
          className="w-full border rounded p-2 bg-gray-100"
        />
      </div>

      {/* 学生姓名 */}
      <div>
        <label className="block font-medium mb-1">学生姓名</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("name")}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 学号 */}
      <div>
        <label className="block font-medium mb-1">学号</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={form.id}
            onChange={(e) => handleChange("id", e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("id")}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 专业 */}
      <div>
        <label className="block font-medium mb-1">专业</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={form.faculty}
            onChange={(e) => handleChange("faculty", e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("faculty")}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 照片上传 + 随机头像 */}
      <div>
        <label className="block font-medium mb-1">照片</label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange("photo", e.target.files[0])}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("photo")}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 签发日期 */}
      <div>
        <label className="block font-medium mb-1">签发日期</label>
        <div className="flex space-x-2">
          <input
            type="date"
            value={form.issueDate}
            onChange={(e) => handleChange("issueDate", e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("issueDate")}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 有效期至 */}
      <div>
        <label className="block font-medium mb-1">有效期至</label>
        <div className="flex space-x-2">
          <input
            type="date"
            value={form.validUntil}
            onChange={(e) => handleChange("validUntil", e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("validUntil")}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 一键填充 */}
      <div className="pt-4">
        <button
          type="button"
          onClick={randomAll}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          一键随机生成所有信息 🎲
        </button>
      </div>
    </form>
  );
}
