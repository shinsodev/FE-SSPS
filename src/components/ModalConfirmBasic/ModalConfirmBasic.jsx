import { X } from "react-feather";

const ModalConfirmBasic = ({
  open,
  onClose,
  title,
  message,
  onConfirm,
  image,
}) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <X />
        </button>
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>

        {/* Render image if provided */}
        {image && (
          <div className="flex items-center justify-center mx-4">
            <img
              src={image}
              alt="Modal visual"
              className="mb-4 rounded h-[300px]"
            />
          </div>
        )}

        <p className="mb-4">{message}</p>
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => {
              onConfirm("student"); // Gọi onConfirm với vai trò là sinh viên
              onClose(); // Đóng modal
            }}
            className="py-3 px-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
          >
            Đăng Ký Sinh Viên
          </button>
          <button
            onClick={() => {
              onConfirm("admin"); // Gọi onConfirm với vai trò là quản lý
              onClose(); // Đóng modal
            }}
            className="py-3 px-3 rounded-md bg-green-500 text-white hover:bg-green-600 shadow-lg"
          >
            Đăng Ký Quản Lý
          </button>
        </div>

        {/* <button
          onClick={onClose}
          className="mt-4 py-2 px-5 rounded-md bg-gray-300 hover:bg-gray-400 shadow-lg"
        >
          Hủy
        </button> */}
      </div>
    </div>
  );
};

export default ModalConfirmBasic;
