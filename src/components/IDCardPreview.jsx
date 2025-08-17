import html2canvas from "html2canvas";

export default function IDCardPreview({ data }) {
  const exportPNG = () => {
    html2canvas(document.getElementById("id-front")).then((canvas) => {
      const link = document.createElement("a");
      link.download = "StudentID_Front.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div>
      <div id="id-front" className="border p-4 w-80 bg-white shadow">
        {data.logo && <img src={data.logo} className="h-12 mb-2" alt="Logo" />}
        <h2 className="text-lg font-bold">{data.uni}</h2>
        {data.photo && <img src={data.photo} alt="Photo" className="h-24 my-2" />}
        <p><b>Name:</b> {data.name}</p>
        <p><b>ID:</b> {data.id}</p>
        <p><b>Faculty:</b> {data.faculty}</p>
        <p><b>Valid Until:</b> {data.expiry}</p>
      </div>
      <button onClick={exportPNG} className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">下载学生证 PNG</button>
    </div>
  );
}
