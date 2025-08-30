import { useState } from "react";

// 全局集合，避免重复
const usedIds = new Set();
const usedNames = new Set();

// 学校列表
const schools = [
  { id: "kjit", name: "Kjit (Vadodara)", country: "India", logo: "/kjit-campus-logo-white.svg" },
  { id: "tokyo", name: "University of Tokyo", country: "Japan", logo: "/tokyo-university.svg" },
  { id: "kyoto", name: "Kyoto University", country: "Japan", logo: "/kyoto-university.svg" },
  { id: "osaka", name: "Osaka University", country: "Japan", logo: "/osaka-university.svg" },
  { id: "waseda", name: "Waseda University", country: "Japan", logo: "/waseda-university.svg" },
  { id: "keio", name: "Keio University", country: "Japan", logo: "/logo.png" },
  { id: "hokkaido", name: "Hokkaido University", country: "Japan", logo: "/logo.png" },
  { id: "tsukuba", name: "University of Tsukuba", country: "Japan", logo: "/logo.png" },
  { id: "harvard", name: "Harvard University", country: "USA", logo: "/harvard-university.svg" },
  { id: "stanford", name: "Stanford University", country: "USA", logo: "/stanford-university.svg" },
  { id: "mit", name: "Massachusetts Institute of Technology", country: "USA", logo: "/mit-university.svg" },
  { id: "berkeley", name: "University of California, Berkeley", country: "USA", logo: "/logo.png" },
  { id: "yale", name: "Yale University", country: "USA", logo: "/logo.png" },
  { id: "princeton", name: "Princeton University", country: "USA", logo: "/logo.png" },
  { id: "columbia", name: "Columbia University", country: "USA", logo: "/logo.png" },
  { id: "chicago", name: "University of Chicago", country: "USA", logo: "/logo.png" },
  { id: "caltech", name: "California Institute of Technology", country: "USA", logo: "/logo.png" },
  { id: "ucla", name: "University of California, Los Angeles", country: "USA", logo: "/logo.png" },
  { id: "nyu", name: "New York University", country: "USA", logo: "/logo.png" },
  { id: "cornell", name: "Cornell University", country: "USA", logo: "/logo.png" }
];

// 随机字母串（4-6位）
const randomString = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const length = Math.floor(Math.random() * 3) + 4; // 4 ~ 6
  let result = "";
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
};

// 生成唯一学号
const generateUniqueId = () => {
  let newId;
  do {
    newId = "INT" + Math.floor(100000 + Math.random() * 900000); // INT + 6位数字
  } while (usedIds.has(newId));
  usedIds.add(newId);
  return newId;
};

export default function InputForm({ data, onChange }) {
  const [copiedField, setCopiedField] = useState(null);

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

  // 使用本地 public/avatars/men 的头像
  const generateRandomAvatar = () => {
    const id = Math.floor(Math.random() * 99) + 1; // 1 - 99
    return `/avatars/men/${id}.jpg`;
  };

  // 一键随机生成资料
  const generateRandomAll = () => {
    const majors = ["Computer Science", "Mechanical Eng.", "Mathematics", "Physics", "Medicine", "Engineering", "Business", "Arts"];
    let first, last, fullName;
    do {
      first = randomString();
      last = randomString();
      fullName = `${first} ${last}`;
    } while (usedNames.has(fullName));
    usedNames.add(fullName);

    const randomId = generateUniqueId();
    const randomSchool = schools[Math.floor(Math.random() * schools.length)];

    onChange({
      firstName: first,
      lastName: last,
      id: randomId,
      major: majors[Math.floor(Math.random() * majors.length)],
      photo: generateRandomAvatar(),
      school: randomSchool,
    });
  };

  // 复制功能 + ✅ 动态反馈
  const copyToClipboard = (field, text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1000); // 1s 后恢复
    });
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium">大学</label>
        <select
          value={data.school?.id || "kjit"}
          onChange={(e) => {
            const selectedSchool = schools.find(s => s.id === e.target.value);
            updateField("school", selectedSchool);
          }}
          className="w-full border rounded px-3 py-2"
        >
          {schools.map(school => (
            <option key={school.id} value={school.id}>
              {school.name} ({school.country})
            </option>
          ))}
        </select>
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
            onClick={() => copyToClipboard("firstName", data.firstName)}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {copiedField === "firstName" ? "✅" : "📋"}
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
            onClick={() => copyToClipboard("lastName", data.lastName)}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
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
