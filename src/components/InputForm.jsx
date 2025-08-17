export default function InputForm({ data, onChange }) {
  // 更新字段
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

  // 随机头像 (DiceBear)
  const generateRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(7);
    return `https://avatars.dicebear.com/api/adventurer/${seed}.svg`;
  };

  // 一键随机生成所有信息
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
