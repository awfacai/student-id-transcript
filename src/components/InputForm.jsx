export default function InputForm({ data, setData }) {
  const handleChange = (field, value) => setData({ ...data, [field]: value });

  const handleUpload = (field, e) => {
    const reader = new FileReader();
    reader.onload = () => setData({ ...data, [field]: reader.result });
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="space-y-4">
      <div>
        <label>大学名称</label>
        <input value={data.uni} onChange={(e) => handleChange("uni", e.target.value)} className="border p-2 w-full" />
      </div>
      <div>
        <label>学生姓名</label>
        <input value={data.name} onChange={(e) => handleChange("name", e.target.value)} className="border p-2 w-full" />
      </div>
      <div>
        <label>学号</label>
        <input value={data.id} onChange={(e) => handleChange("id", e.target.value)} className="border p-2 w-full" />
      </div>
      <div>
        <label>专业</label>
        <input value={data.faculty} onChange={(e) => handleChange("faculty", e.target.value)} className="border p-2 w-full" />
      </div>
      <div>
        <label>上传校徽</label>
        <input type="file" onChange={(e) => handleUpload("logo", e)} />
      </div>
      <div>
        <label>上传照片</label>
        <input type="file" onChange={(e) => handleUpload("photo", e)} />
      </div>
    </div>
  );
}
