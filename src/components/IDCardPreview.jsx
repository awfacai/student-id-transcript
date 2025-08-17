import html2canvas from "html2canvas";

export default function IDCardPreview({ data }) {
  if (!data) return null;

  // 下载 PNG
  const downloadCard = () => {
    const element = document.getElementById("id-card");
    if (!element) return;
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "student-id.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">🪪 学生证预览</h2>
      <div
        id="id-card"
        className="border p-4 rounded-lg text-center max-w-sm mx-auto bg-white"
      >
        {/* 顶部红色条 */}
        <div className="bg-red-600 text-white flex items-center px-4 py-2 rounded-t-lg">
          <img
            src="/logo.png"
            alt="logo"
            className="h-10 mr-2 bg-white rounded"
          />
          <div>
            <h3 className="font-bold">Indian Institute of Technology Bombay</h3>
            <p className="text-xs">INTERNATIONAL STUDENT ID CARD</p>
          </div>
        </div>

        {/* 内容 */}
        <div className="p-4 flex space-x-4 items-center">
          {/* 头像区域 */}
          <div className="w-24 h-24 border rounded overflow-hidden">
            <img
              src={
                data.photo
                  ? typeof data.photo === "string"
                    ? data.photo // 如果是字符串（比如 /avatars/men/25.jpg）
                    : URL.createObjectURL(data.photo) // 如果是 File 类型（上传）
                  : "/avatars/men/1.jpg" // 默认头像
              }
              alt="学生照片"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 信息文字 */}
          <div className="text-left space-y-1">
            <p>
              <strong>NAME:</strong>{" "}
              {data.firstName || "未填"} {data.lastName || ""}
            </p>
            <p>
              <strong>STUDENT ID:</strong> {data.id || "未填"}
            </p>
            <p>
              <strong>FACULTY:</strong> {data.major || "未填"}
            </p>
          </div>
        </div>

        {/* 底部 */}
        <div className="grid grid-cols-2 text-xs border-t mt-2">
          <div className="p-2">
            <p>ISSUE</p>
            <p className="font-bold">2023-12-27</p>
          </div>
          <div className="p-2 border-l">
            <p>VALID</p>
            <p className="font-bold">2027-12-27</p>
          </div>
        </div>
      </div>

      {/* 下载按钮 */}
      <button
        onClick={downloadCard}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
      >
        ⬇️ 下载学生证 PNG
      </button>
    </div>
  );
}
