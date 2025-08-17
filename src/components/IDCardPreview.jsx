export default function IDCardPreview({ data }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden w-[350px]">
      {/* 红色标题条 */}
      <div className="bg-red-600 text-white px-4 py-2 font-semibold">
        Indian Institute of Technology Bombay
      </div>

      <div className="p-4 text-sm">
        {data.logo && <img src={data.logo} className="h-12 mb-2" alt="Logo" />}
        {data.photo && (
          <img src={data.photo} alt="Photo" className="h-28 w-24 object-cover mb-2 rounded" />
        )}
        <p><b>Name:</b> {data.name}</p>
        <p><b>ID:</b> {data.id}</p>
        <p><b>Faculty:</b> {data.faculty}</p>
        <p><b>Valid Until:</b> {data.expiry}</p>
      </div>

      <div className="p-4 border-t">
        <button className="bg-red-600 text-white px-4 py-2 rounded w-full">
          下载学生证 PNG
        </button>
      </div>
    </div>
  );
}
