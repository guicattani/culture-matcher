import { useState, useMemo, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import Modal from "react-modal";
import { MaterialReactTable } from "material-react-table";

import { AddBox, Save, Close } from "@mui/icons-material/";
import { IconButton, Tooltip } from "@mui/material";

Modal.setAppElement("#root");

export default function CultureTypesTable() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [cultureTypes, setCultureTypes] = useState(false);

  useEffect(() => {
    fetch("/api/v1/culture_types")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCultureTypes(data);
        setTableLoading(false);
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
    createCultureType({
      name: e.Name,
    });
    closeModal();
  };

  const createCultureType = (attributes) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attributes),
    };
    fetch("/api/v1/culture_types", requestOptions)
      .then((response) => response.json())
      .then((data) => setCultureTypes([...cultureTypes, data]));
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
          contentLabel="Add Culture Type"
        >
          <div className="flex pb-4">
            <h2 className="flex-1">Add Culture Type</h2>
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
                  placeholder="Carbon Neutral"
                  required
                  {...register("Name", { required: true })}
                />
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
        data={cultureTypes}
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
              <Tooltip arrow title="Create New Culture Type">
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
