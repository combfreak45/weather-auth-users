import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseAuth";
import { FaSort } from "react-icons/fa";

const Table = () => {
  const [data, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [name, setName] = useState("");
  const [filtername, setFiltername] = useState("");
  const [date, setDate] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const q = query(collection(db, "people"));
    const d = onSnapshot(q, (querySnap) => {
      let arr = [];
      querySnap.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setData(arr);
      setFilterdata(arr);
    });
    return () => d();
  }, []);

  const toggleStatus = async (value) => {
    await updateDoc(doc(db, "people", value.id), {
      completed: !value.completed,
    });
  };

  const createPeople = async (e) => {
    try {
      e.preventDefault(e);
      if (name === "" || date === "") {
        alert("enter the value");
        return;
      }
      const formatDate = new Date(date);
      await addDoc(collection(db, "people"), {
        name: name,
        date: formatDate,
        completed: false,
      });
      setName("");
      setDate("");
    } catch (error) {
      console.log(error);
    }
  };

  const deletePeople = async (value) => {
    await deleteDoc(doc(db, "people", value.id));
  };

  const sortData = (arr) => {
    return arr.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  };

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setData(sortData(data));
  };

  const handleNameFilter = () => {
    const response = data.filter((d) => {
      return d.name.includes(filtername);
    });
    setFilterdata(response);
  };

  return (
    <div className="pt-[5rem]  min-h-screen">
      <div className="bg-purple-600 p-5 text-center text-4xl font-bold text-white">
        Users
      </div>
      <div className="flex flex-row gap-4 p-5 justify-center">
        <input
          type="text"
          placeholder="Name"
          className="border-2 p-1 rounded-xl "
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="date"
          className="border-2 p-1 rounded-xl"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <button
          className="rounded-xl bg-red-500 p-1 px-5 text-bold hover:bg-red-700"
          onClick={createPeople}
        >
          Add
        </button>
      </div>

      <div className="flex flex-row gap-8 p-5 justify-center">
        <label htmlFor="name" className="p-1 rounded-xl text-xl font-semibold">
          Enter Name
        </label>
        <input
          type="text"
          placeholder="Name"
          id="name"
          className="border-2 p-1 rounded-xl "
          value={filtername}
          onChange={(e) => {
            setFiltername(e.target.value);
          }}
        />
        <button
          className="rounded-xl bg-red-500 p-1 px-5 text-bold hover:bg-red-700"
          onClick={handleNameFilter}
        >
          Filter
        </button>
      </div>

      <div className="pt-10 min-h-screen">
        <div className="flex flex-row justify-center text-xl  font-[Roboto]">
          <table className="border-2 flex flex-col p-5">
            <thead className="py-3 bg-purple-300">
              <tr>
                <th
                  className="px-5 w-[10rem] text-left hover:cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex flex-row items-center">
                    <div> Name</div>
                    <div>
                      <FaSort />
                    </div>
                  </div>
                </th>
                <th
                  className="px-5 w-[10rem] text-left hover:cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex flex-row items-center">
                    <div> Date</div>
                    <div>
                      <FaSort />
                    </div>
                  </div>
                </th>
                <th className="px-5 w-[10rem] text-left">Status</th>
                <th className="px-5 w-[15rem] text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="p-2">
              {filterdata.map((d) => {
                return (
                  <tr>
                    <td className="p-5 w-[10rem]">{d.name}</td>
                    <td className="p-5 w-[10rem]">
                      {d.date.toDate().toLocaleDateString()}
                    </td>
                    <td className="p-5 w-[10rem]">
                      {d.completed ? "active" : "inactive"}
                    </td>
                    <td className="p-5 w-[15rem]">
                      <div className="flex flex-row gap-2">
                        <div
                          className="bg-green-400 px-1 rounded-lg hover:bg-green-600 hover:cursor-pointer"
                          onClick={() => toggleStatus(d)}
                        >
                          Status
                        </div>
                        <div
                          className="bg-red-400 px-1 rounded-lg hover:bg-red-600 hover:cursor-pointer"
                          onClick={() => deletePeople(d)}
                        >
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
