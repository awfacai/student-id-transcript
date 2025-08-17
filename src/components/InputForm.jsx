import { useState } from "react";

export default function InputForm({ data, onChange }) {
  const [copiedField, setCopiedField] = useState(null);

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

  // 真人随机头像 (固定外链，不走 fetch，避免 CORS)
  const generateRandomAvatar = () => {
    const id = Math.floor(Math.random() * 99) + 1; // 1-99
    return `https://student.frp.gs/static/image/men/${id}.jpg`;
  };

  // 一键随机生成资料
  const generateRandomAll = () => {
    const randomId = "INT" + Math.floor(Math.random() * 1000000);
    const majors = ["Computer Science", "Mechanical Eng.", "Mathematics", "Physics"];
    const firstNames = ["Anand", "Meera", "Ravi", "Erick", "Sophia"];
    const lastNames = ["Kumar", "Sharma", "Singh", "Patel", "Verma"];

    onChange({
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      id: randomId,
      major: majors[Math.floor(Math.random() * majors.length)],
      photo: generateRandomAvatar(),
    });
  };

  // 复制功能（按钮状态变 ✅）
  const copyToClipboard = (field, text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1000); // 1s 后恢复
    }
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

      {/* First Name */}
      <div>
        <label className="block text-sm font-medium">First Name*</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={data.firstName || ""}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            type="button"
            onClick={() => copyToClipboard("firstName", data.firstName)}
            className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
          >
            {copiedField === "firstName" ? "✅" : "📋"}
          </button>
        </div>
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium">Last Name*</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={data.lastName || ""}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            type="button"
            onClick={() => copyToClipboard("lastName", data.lastName)}
            className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
          >
            {copiedField === "lastName" ? "✅" : "📋"}
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
