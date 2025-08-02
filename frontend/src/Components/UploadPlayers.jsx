import React, { useEffect, useState } from "react";
import axios from "axios";

import * as XLSX from "xlsx";
import Papa from "papaparse";
import SuccessIndicator from "./SuccessIndicator";

function UploadPlayers({ tournamentId }) {
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("UploadPlayers received tournamentId:", tournamentId);
  }, [tournamentId]);

  const expectedHeaders = ["Name", "Email", "Phone", "Seed"];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop();

    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;

      if (fileExtension === "csv") {
        Papa.parse(fileContent, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = validateHeaders(
              result.meta.fields,
              expectedHeaders
            )
              ? result.data
              : [];

            setData(parsedData);
          },
        });
      } else if (fileExtension === "xlsx") {
        const workbook = XLSX.read(fileContent, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const parsedData = validateHeaders(
          Object.keys(jsonData[0] || {}),
          expectedHeaders
        )
          ? jsonData
          : [];

        setData(parsedData);
      } else {
        alert("Invalid file format. Please upload a CSV or Excel file.");
      }
    };

    if (fileExtension === "xlsx") {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

  const validateHeaders = (actualHeaders, expectedHeaders) => {
    return expectedHeaders.every((header) => actualHeaders.includes(header));
  };

  useEffect(() => {
    console.log("PlayerData: ", data);
  }, [data]);

  //! Submit Players
  const handleSubmit = async () => {
    if (!tournamentId) {
      alert("Tournament ID is missing. Please refresh the page and try again.");
      return;
    }

    if (!data || data.length === 0) {
      alert("No player data to upload. Please select a file first.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/player/add/tournament/${tournamentId}`,
        { playerData: data },
        { withCredentials: true }
      );

      console.log(response.data.message);

      if (response.status === 200) {
        setSuccess(true);
        setData(null);

        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }
    } catch (err) {
      console.log("Error adding players: ", err);
      alert("Error adding players. Please try again.");
    }
    // console.log(data);
  };

  return (
    <div className="py-2">
      <div className="flex gap-8">
        <label className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer w-fit hover:bg-blue-700">
          Add Players
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {data && data.length > 0 && (
          <button
            onClick={handleSubmit}
            className=" py-2 px-4 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 "
          >
            Sumbit Players
          </button>
        )}

        {success && <SuccessIndicator message="Players added successfully" />}
      </div>

      {data && data.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold mb-2">Parsed Data:</h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2 border-b">Name</th>
                <th className="text-left px-4 py-2 border-b">Seed</th>
                <th className="text-left px-4 py-2 border-b">Email</th>
                <th className="text-left px-4 py-2 border-b">Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{row.Name}</td>
                  <td className="px-4 py-2 border-b">{row.Seed}</td>
                  <td className="px-4 py-2 border-b">{row.Email}</td>
                  <td className="px-4 py-2 border-b">{row.Phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UploadPlayers;
