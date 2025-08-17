import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function TranscriptPreview({ data }) {
  const exportPDF = () => {
    html2canvas(document.getElementById("transcript")).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("Transcript.pdf");
    });
  };

  return (
    <div>
      <div id="transcript" className="border p-4 bg-white w-[600px] shadow">
        {data.logo && <img src={data.logo} alt="Logo" className="h-16 mb-2" />}
        <h2 className="text-xl font-bold">{data.uni} - Transcript</h2>
        <p><b>Name:</b> {data.name}</p>
        <p><b>ID:</b> {data.id}</p>
        <p><b>Semester:</b> {data.semester}</p>

        <table className="w-full mt-4 border">
          <thead className="bg-gray-200">
            <tr>
              <th>Code</th><th>Title</th><th>Credits</th><th>Grade</th><th>GPA</th>
            </tr>
          </thead>
          <tbody>
            {data.courses.map((c, i) => (
              <tr key={i} className="border">
                <td>{c.code}</td>
                <td>{c.title}</td>
                <td>{c.credits}</td>
                <td>{c.grade}</td>
                <td>{c.gpa}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4">Remarks: Excellent academic performance</p>
      </div>

      <button onClick={exportPDF} className="bg-green-600 text-white px-4 py-2 mt-2 rounded">下载成绩单 PDF</button>
    </div>
  );
}
