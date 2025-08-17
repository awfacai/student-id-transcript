export default function IDCardPreview({ data }) {
  if (!data) return null;

  const fullName =
    (data.firstName || "") + " " + (data.lastName || "");

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">🪪 学生证预览</h2>
      <div
        id="id-card"
        className="border p-4 rounded-lg w-full max-w-sm mx-auto"
      >
        {/* 顶部红色标题栏 */}
        <div className="bg-red-600 text-white flex items-center p-2 rounded-t-lg">
          <img src="/logo.png" alt="logo" className="h-10 w-10 mr-2" />
          <div>
            <h3 className="text-sm font-bold">
              Indian Institute of Technology Bombay
            </h3>
            <p className="text-xs">INTERNATIONAL STUDENT ID CARD</p>
          </div>
        </div>

        {/* 内容 */}
        <div className="flex p-4 items-center space-x-4">
          <img
            src={data.photo || "/default-avatar.png"}
            alt="student"
            className="w-24 h-24 rounded-lg object-cover border"
          />
          <div>
            <p>
              <strong>NAME:</strong> {fullName || "未填写"}
            </p>
            <p>
              <strong>STUDENT ID:</strong> {data.id || "未填写"}
            </p>
            <p>
              <strong>FACULTY:</strong> {data.major || "未填写"}
            </p>
          </div>
        </div>

        {/* 底部日期 */}
        <div className="flex justify-between text-xs border-t p-2">
          <div>
            ISSUE <br />
            <strong>2023-12-27</strong>
          </div>
          <div className="text-right">
            VALID <br />
            <strong>2027-12-27</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
