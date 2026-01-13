export default function TextArea() {
  return (
    <div className="py-3 flex flex-col px-5">
      <span className="font-medium text-base text-white mb-2">글 작성</span>
      <input
        className="font-medium text-base px-2 py-3 text-gray-300 border-b border-gray-850 focus:outline-none"
        placeholder="제목을 입력해주세요.(최대 00자)"
      />
      <textarea
        className="px-2 py-4 text-gray-300 text-normal focus:outline-none min-h-41"
        placeholder="내용을 입력해주세요."
      />
    </div>
  );
}
