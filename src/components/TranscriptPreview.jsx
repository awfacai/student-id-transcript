export default function TranscriptPreview({ data }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden w-[600px]">
      {/* 红色标题条 */}
      <div className="bg-red-600 text-white px-4 py-2 font-semibold">
        {data.uni} - Transcript
      </div>

      <div className="p-4 text-sm">
        <p><b>Name:</b> {data.name}</p>
        <p><b>ID:</b> {data.id}</p>
        <p><b>Semester:</b> {data.semester}</p>

        <table className="w-full mt-4 border text-center text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Code</th>
              <th className="p-2">Title</th>
              <th className="p-2">Credits</th>
              <th className="p-2">Grade</th>
              <th className="p-2">GPA</th>
            </tr>
          </thead>
          <tbody>
            {data.courses.map((c, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                <td>{c.code}</td>
                <td>{c.title}</td>
                <td>{c.credits}</td>
                <td>{c.grade}</td>
                <td>{c.gpa}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4 italic">Remarks: Excellent academic performance</p>
      </div>

      <div className="p-4 border-t">
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          下载成绩单 PDF
        </button>
      </div>
    </div>
  );
}
