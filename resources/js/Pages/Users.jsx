import React, { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import Layout from "@Layout";
import { CheckCircle, AlertCircle, Plus } from "lucide-react";
import Pagination from "@/Components/Pagination";
import Modal from "../components/Modal";
import CoreButton from "../components/CoreButton";
import BodyCard from "../components/BodyCard";

export default function Users() {

  const { users, flash } = usePage().props;
  const { success, error } = flash || {};
  const [isOpen, setIsOpen] = useState(false);

  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset,
    progress,
    clearErrors,
  } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const usersData = users.data;
  const [visibleSuccess, setVisibleSuccess] = useState(success);
  const [visibleError, setVisibleError] = useState(error);

  useEffect(() => {
    if (success) setVisibleSuccess(success);
    if (error) setVisibleError(error);

    const timeout = setTimeout(() => {
      setVisibleSuccess(null);
      setVisibleError(null);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [success, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();
    post("/users", {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setIsOpen(false);
        Inertia.reload({ only: ["users"] });
      },
    });
  };

  const columns = [
    { title: "ID", accessorKey: "id" },
    { title: "Name", accessorKey: "name" },
    { title: "Email", accessorKey: "email" },
  ];

  return (
    <Layout title="Users">
           <div>
          <button onClick={start}>Start polling</button>
          <button onClick={stop}>Stop polling</button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleSubmit}
        title="User Form"
        message="Add a new user or edit an existing one."
        btnMessage="Add User"
        size="normal"
        showActions={true}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              required
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              required
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              required
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow disabled:opacity-50"
            disabled={processing}
          >
            {processing ? "Adding..." : "Add User"}
          </button>

          {progress && (
            <div className="mt-2 text-sm text-gray-600">
              Uploading: {progress.percentage}%
              <progress
                value={progress.percentage}
                max="100"
                className="w-full mt-1 h-2 rounded bg-gray-200"
              />
            </div>
          )}
        </form>
      </Modal>

      <BodyCard
        title="Users"
        action={
          <CoreButton
            color="green"
            variant="soft"
            onClick={() => setIsOpen(true)}
            title="Add User"
            icon={<Plus size={15} />}
          >
            Add User
          </CoreButton>
        }
      >
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">Manage Users</h2>
            <p className="text-sm text-gray-500">
              Add new users and manage existing ones.
            </p>
          </div>

          {visibleSuccess && (
            <div className="flex items-start gap-2 p-4 bg-green-50 border border-green-300 text-green-800 rounded-md shadow-sm animate-fade-in">
              <CheckCircle size={20} />
              <span className="text-sm font-medium">{visibleSuccess}</span>
            </div>
          )}

          {visibleError && (
            <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-300 text-red-800 rounded-md shadow-sm animate-fade-in">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{visibleError}</span>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 overflow-x-auto">
            <h3 className="font-semibold text-lg text-gray-800 mb-3">All Users</h3>
            <table className="w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="bg-gray-50 border-b">
                  {columns.map((column, idx) => (
                    <th key={idx} className="px-3 py-2 font-semibold">
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usersData && usersData.length > 0 ? (
                  usersData.map((user, idx) => (
                    <tr
                      key={user.id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-3 py-2">{user.id}</td>
                      <td className="px-3 py-2">{user.name}</td>
                      <td className="px-3 py-2">{user.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-500 py-4">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination links={users.meta && users.meta.links} />
          </div>
        </div>
      </BodyCard>
    </Layout>
  );
}
