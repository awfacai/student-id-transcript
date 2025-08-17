import { useState } from "react";
import InputForm from "./components/InputForm";
import IDCardPreview from "./components/IDCardPreview";
import TranscriptPreview from "./components/TranscriptPreview";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white py-4 shadow">
        <h1 className="text-center text-2xl font-bold">
          🎓 国际学生证 & 成绩单生成器
        </h1>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-2 gap-6">
        {/* 左侧表单 */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">📋 填写信息</h2>
          <InputForm />
        </div>

        {/* 右侧预览 */}
        <div className="space-y-6">
          <IDCardPreview />
          <TranscriptPreview />
        </div>
      </main>
    </div>
  );
}
