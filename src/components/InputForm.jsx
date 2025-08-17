import { faker } from "@faker-js/faker";

export default function InputForm({ data, setData }) {
  const handleChange = (field, value) => setData({ ...data, [field]: value });

  const handleUpload = (field, e) => {
    const reader = new FileReader();
    reader.onload = () => setData({ ...data, [field]: reader.result });
    reader.readAsDataURL(e.target.files[0]);
  };

  // 随机头像
  const randomPhoto = async () => {
    const res = await fetch("https://randomuser.me/api/");
    const json = await res.json();
    const photo = json.results[0].picture.large;
    setData({ ...data, photo });
  };

  // 随机填充
  const randomFill = () => {
    setData({
      uni: "Indian Institute of Technology Bombay",
      name: faker.person.fullName(),
      id: "INT" + faker.string.numeric(6),
      faculty: faker.helpers.arrayElement([
        "Faculty of Medicine",
        "Faculty of Engineering",
        "Faculty of Science",
        "Faculty of Arts",
      ]),
      issue: "2023-12-27",
      expiry: "2027-12-27",
      photo: null,
      logo: data.logo,
      semester: "Dec 2023 – Feb 2024",
      courses: [
        {
          code: "MED101",
          title: "Anatomy",
          credits: 4,
          grade: "A",
          gpa: 4.0,
        },
        {
          code: "MED102",
          title: "Physiology",
          credits: 3,
          grade: "B+",
          gpa: 3.3,
        },
        {
          code: "MED103",
          title: "Biochemistry",
          credits: 3,
          grade: "A-",
          gpa: 3.7,
        },
      ],
    });
  };

  return (
    <div className="space-y-6">

      {/* 基本信息 */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-sm font-semibold mb-2">基本信息</h3>
        <label className="block text-sm">大学名称</label>
        <input value={data.uni} onChange={(e) => handleChange("uni", e.target.value)} className="border rounded p-2 w-full mb-2" />

        <label className="block text-sm">学生姓名</label>
        <input value={data.name} onChange={(e) => handleChange("name", e.target.value)} className="border rounded p-2 w-full mb-2" />

        <label className="block text-sm">学号</label>
        <input value={data.id} onChange={(e) => handleChange("id", e.target.value)} className="border rounded p-2 w-full mb-2" />

        <label className="block text-sm">专业</label>
        <input value={data.faculty} onChange={(e) => handleChange("faculty", e.target.value)} className="border rounded p-2 w-full" />
      </div>

      {/* 上传区 */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-sm font-semibold mb-2">上传资料</h3>
        <label className="block text-sm">上传校徽</label>
        <input type="file" onChange={(e) => handleUpload("logo", e)} className="mb-2" />
        
        <label className="block text-sm">上传照片</label>
        <input type="file" onChange={(e) => handleUpload("photo", e)} />
      </div>

      {/* 成绩单 */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="text-sm font-semibold mb-2">成绩单信息</h3>
        <label className="block text-sm">学期</label>
        <input value={data.semester} onChange={(e) => handleChange("semester", e.target.value)} className="border rounded p-2 w-full" />
      </div>

      {/* 操作按钮 */}
      <div className="flex space-x-2">
        <button type="button" onClick={randomFill} className="bg-blue-600 text-white px-3 py-2 rounded w-1/2">
          一键填充信息
        </button>
        <button type="button" onClick={randomPhoto} className="bg-indigo-600 text-white px-3 py-2 rounded w-1/2">
          随机照片
        </button>
      </div>
    </div>
  );
}
