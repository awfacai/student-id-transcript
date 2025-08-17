import { useState } from "react";
import { faker } from "@faker-js/faker";

export default function InputForm({ onChange }) {
  const [form, setForm] = useState({
    university: "Indian Institute of Technology Bombay",
    name: "",
    id: "",
    faculty: "",
    issueDate: "2023-12-27",
    validUntil: "2027-12-27",
    logo: null,
    photo: null,
  });

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onChange && onChange(updated);
  };

  // 随机生成字段
  const randomField = (field) => {
    let value = "";
    switch (field) {
      case "name":
        value = faker.person.fullName();
        break;
      case "id":
        value = "INT" + faker.number.int({ min: 100000, max: 999999 });
        break;
      case "faculty":
        value = faker.word.words(2);
        break;
      default:
        break;
    }
    handleChange(field, value);
  };

  // 随机填充全部
  const randomAll = () => {
    const updated = {
      ...form,
      name: faker.person.fullName(),
      id: "INT" + faker.number.int({ min: 100000, max: 999999 }),
      faculty: faker.word.words(2),
    };
    setForm(updated);
    onChange && onChange(updated);
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={randomAll}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        一键随机填充所有信息
      </button>

      {/* 大学名称 - 固定 */}
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
        <div className="flex">
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("name")}
            className="ml-2 p-2 rounded bg-gray-200 hover:bg-gray-300"
            title="随机生成姓名"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 学号 */}
      <div>
        <label className="block font-medium mb-1">学号</label>
        <div className="flex">
          <input
            type="text"
            value={form.id}
            onChange={(e) => handleChange("id", e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("id")}
            className="ml-2 p-2 rounded bg-gray-200 hover:bg-gray-300"
            title="随机生成学号"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 专业 */}
      <div>
        <label className="block font-medium mb-1">专业</label>
        <div className="flex">
          <input
            type="text"
            value={form.faculty}
            onChange={(e) => handleChange("faculty", e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            type="button"
            onClick={() => randomField("faculty")}
            className="ml-2 p-2 rounded bg-gray-200 hover:bg-gray-300"
            title="随机生成专业"
          >
            🔄
          </button>
        </div>
      </div>

      {/* 签发日期 */}
      <div>
        <label className="block font-medium mb-1">签发日期</label>
        <input
          type="date"
          value={form.issueDate}
          onChange={(e) => handleChange("issueDate", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 有效期至 */}
      <div>
        <label className="block font-medium mb-1">有效期至</label>
        <input
          type="date"
          value={form.validUntil}
          onChange={(e) => handleChange("validUntil", e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 上传照片 */}
      <div>
        <label className="block font-medium mb-1">上传照片</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleChange("photo", e.target.files[0])}
          className="w-full border rounded p-2"
        />
      </div>

      {/* 上传校徽 */}
      <div>
        <label className="block font-medium mb-1">上传校徽</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleChange("logo", e.target.files[0])}
          className="w-full border rounded p-2"
        />
      </div>
    </div>
  );
}
