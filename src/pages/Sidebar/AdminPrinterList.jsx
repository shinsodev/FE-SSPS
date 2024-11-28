// import { Title } from "../../router";
import Table from "../../components/Table/Table";
import { Link } from "react-router-dom";

const AdminPrinterList = () => {
  return (
    <>
      <section className="p-8">
        <div>
          <h2 className="font-medium text-3xl">Printers</h2>
        </div>
        <hr className="my-5" />
        <div className="flex items-center justify-end">
          <Link
            to="/admin/addprinter"
            className="px-6 py-3 bg-blue-500 text-white font-medium text-[17px] rounded-lg hover:bg-blue-600 transition-all mb-4"
          >
            Add printer
          </Link>
        </div>
        <Table />
      </section>
    </>
  );
};

export default AdminPrinterList;
