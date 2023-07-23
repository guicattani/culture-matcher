import { useState, useMemo, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import Modal from "react-modal";
import { MaterialReactTable } from "material-react-table";

import { AddBox, Save, Close } from "@mui/icons-material/";
import { IconButton, Tooltip } from "@mui/material";

Modal.setAppElement("#root");

export default function CompaniesTable() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [companies, setCompanies] = useState(false);
  const [cultureTypes, setCultureTypes] = useState(false);

  useEffect(() => {
    fetch("/api/v1/companies")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCompanies(data);
        setTableLoading(false);
      });

    fetch("/api/v1/culture_types")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCultureTypes(data);
      });
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = (e) => {
    createCompany({
      name: e.Name,
      culture_type_id: e.cultureTypeId,
    });
    closeModal();
  };

  const createCompany = (attributes) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attributes),
    };
    fetch("/api/v1/companies", requestOptions)
      .then((response) => response.json())
      .then((data) => setCompanies([...companies, data]));
  };

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "culture_type.name",
        header: "Culture type",
        size: 150,
      },
    ],
    []
  );

  let formFields = {};
  const cultureTypeRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Company"
        >
          <div className="flex pb-4">
            <h2 className="flex-1">Add Company</h2>
            <button onClick={closeModal}>
              <Close />
            </button>
          </div>

          <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label> Name</label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  ref={(input) => (formFields.Name = input)}
                  id="Name"
                  type="text"
                  placeholder="ACME Inc."
                  required
                  {...register("Name", { required: true })}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label>Culture Type</label>
              </div>
              <div className="md:w-2/3">
                <div className="inline-block relative w-49">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    ref={cultureTypeRef}
                    required
                    defaultValue=""
                    {...register("cultureTypeId", { required: true })}
                  >
                    <option value="" disabled hidden />
                    {cultureTypes &&
                      cultureTypes.map((e) => (
                        <option value={e.id} key={e.id}>{`${e.name}`}</option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3 flex">
                <button
                  className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  <div className="flex">
                    <Save />
                    <p>Save</p>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
      <MaterialReactTable
        columns={columns}
        data={companies}
        enableTopToolbar={!modalIsOpen}
        enableBottomToolbar={!modalIsOpen}
        state={{ isLoading: tableLoading }}
        muiTableContainerProps={{
          sx: {
            minWidth: "1000px",
          },
        }}
        renderTopToolbarCustomActions={() => {
          return (
            <div>
              <Tooltip arrow title="Create New Company">
                <IconButton onClick={openModal}>
                  <AddBox />
                </IconButton>
              </Tooltip>
            </div>
          );
        }}
      />
    </div>
  );
}
