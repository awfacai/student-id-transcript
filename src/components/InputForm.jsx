import { faker } from "@faker-js/faker";
import { RotateCw } from "lucide-react"; // 一个漂亮的刷新按钮图标

export default function InputForm({ data, setData }) {
  const handleChange = (field, value) => setData({ ...data, [field]: value });

  // 随机生成单个字段
  const randomField = (field) => {
    let value = "";
    switch (field) {
      case "name":
        value = faker.person.fullName();
        break;
      case "id":
        value = "INT" + faker.string.numeric(6);
        break;
      case "faculty":
        value = faker.helpers.arrayElement([
          "Faculty of Medicine",
          "Faculty of Engineering",
          "Faculty of Science",
          "Faculty of Arts",
        ]);
        break;
      default:
        value = "";
    }
    setData({ ...data, [field]: value });
  };

  // 随机照片
  const randomPhoto = () => {
    setData({ ...data, photo: `https://picsum.photos/200?random=${Date.now()}` });
  };

  return (
    <div className="space-y-6">

      {/* 大学名称（固定） */}
      <div className="border rounded-lg p-4 bg-gray-50 flex items-center justify-between">
        <div>
          <label className="block text-sm font-semibold mb-1">大学名称</label>
          <input
            value="Indian Institute of Technology Bombay"
            readOnly
            className="border rounded p-2 w-full bg-gray-100 text-gray-600"
          />
        </div>
        {data.logo && (
          <img src={data.logo} alt="logo" className="h-12 ml-4" />
        )}
      </div>

      {/* 学生姓名 */}
      <div className="border rounded-lg p-4 bg-gray-50 flex items-center">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">学生姓名</label>
          <input
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          type="button"
          onClick={() => randomField("name")}
          className="ml-2 p-2 rounded bg-gray-200 hover:bg-gray-300"
          title="随机生成"
        >
          <RotateCw size={18} />
        </button>
      </div>

      {/* 学号 */}
      <div className="border rounded-lg p-4 bg-gray-50 flex items-center">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">学号</label>
          <input
            value={data.id}
            onChange={(e) => handleChange("id", e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          type="button"
          onClick={() => randomField("id")}
          className="ml-2 p-2 rounded bg-gray-200 hover:bg-gray-300"
          title="随机生成"
        >
          <RotateCw size={18} />
        </button>
      </div>

      {/* 专业 */}
      <div className="border rounded-lg p-4 bg-gray-50 flex items-center">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">专业</label>
          <input
            value={data.faculty}
            onChange={(e) => handleChange("faculty", e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          type="button"
          onClick={() => randomField("faculty")}
          className="ml-2 p-2 rounded bg-gray-200 hover:bg-gray-300"
          title="随机生成"
        >
          <RotateCw size={18} />
        </button>
      </div>

      {/* 照片上传 + 随机照片 */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <label className="block text-sm font-semibold mb-1">上传照片</label>
        <input type="file" onChange={(e) => {
          const reader = new FileReader();
          reader.onload = () => setData({ ...data, photo: reader.result });
          reader.readAsDataURL(e.target.files[0]);
        }} />
        <button
          type="button"
          onClick={randomPhoto}
          className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded"
        >
          随机照片
        </button>
      </div>

    </div>
  );
}
