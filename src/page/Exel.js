import React, { useState, useRef } from "react";

import Footer from "../page/Footer"; // Make sure to provide the correct path
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import { BsWhatsapp, BsEnvelope } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "../Style/Exel.css";

function Exel() {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    projectName: "",
    projectRole: "",
    dateOfCompletion: "",
    taskStartTime: "",
    taskStartTimeAMPM: "AM",
    taskEndTime: "",
    taskEndTimeAMPM: "AM",
    taskStatus: "",
    taskUpdate: "",
    taskTitle: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const submittedTableRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDownload = (e) => {
    e.preventDefault();
    setSubmittedData((prevData) => [...prevData, formData]);
    setFormData({
      name: "",
      employeeId: "",
      projectName: "",
      projectRole: "",
      dateOfCompletion: "",
      taskStartTime: "",
      taskStartTimeAMPM: "AM",
      taskEndTime: "",
      taskEndTimeAMPM: "AM",
      taskStatus: "",
      taskUpdate: "",
      taskTitle: "",
    });
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(submittedData);

    // Modify the cell styles
    const headerCellStyle = {
      fill: { fgColor: { rgb: "F0F0F0" } },
      font: { bold: true },
      alignment: { horizontal: "center" },
    };
    const statusCellStyle = {
      font: { bold: true },
      alignment: { horizontal: "center" },
    };

    // Apply styles to header cells
    worksheet["A1"].s = headerCellStyle;
    worksheet["B1"].s = headerCellStyle;
    worksheet["C1"].s = headerCellStyle;
    worksheet["D1"].s = headerCellStyle;
    worksheet["E1"].s = headerCellStyle;
    worksheet["F1"].s = headerCellStyle;
    worksheet["G1"].s = headerCellStyle;
    worksheet["H1"].s = headerCellStyle;
    worksheet["I1"].s = headerCellStyle;
    worksheet["J1"].s = headerCellStyle;
    worksheet["K1"].s = headerCellStyle;
    worksheet["L1"].s = headerCellStyle;

    // Apply styles to status cells
    for (let i = 2; i <= submittedData.length + 1; i++) {
      const cell = `H${i}`;
      worksheet[cell].s = statusCellStyle;
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submitted Details");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAsExcelFile(excelBuffer, "submitted_details.xlsx");
  };

  const saveAsExcelFile = (buffer, fileName) => {
    const data = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(data, fileName);
  };

  const handleShare = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleWhatsAppShare = () => {
    const formattedData = formatDataForSharing();
    const message = `Submitted Details:\n${formattedData}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const handleEmailShare = async () => {
    const formattedData = formatDataForSharing();
    const subject = "Submitted Details";
    const body = formattedData;

    // Generate PDF and attach it to the email
    const pdfDataUri = await generatePDFDataUri();

    // Create a link with the PDF data URI and trigger the download
    const link = document.createElement("a");
    link.href = pdfDataUri;
    link.download = "submitted_details.pdf";
    link.click();

    // Prompt the user to send the email manually
    const emailLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = emailLink;
  };
  const generatePDFDataUri = () => {
    return new Promise((resolve) => {
      html2canvas(submittedTableRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190; // Adjust the width (mm) of the image in the PDF
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        const pdfDataUri = pdf.output("datauristring");
        resolve(pdfDataUri);
      });
    });
  };
  const formatDataForSharing = () => {
    return submittedData
      .map((data) => {
        return `
          Name: ${data.name}
          Employee ID: ${data.employeeId}
          Project Name: ${data.projectName}
          Project Role: ${data.projectRole}
          Date of Completion: ${data.dateOfCompletion}
          Task Title: ${data.taskTitle}
          Task Start Time: ${data.taskStartTime} ${data.taskStartTimeAMPM}
          Task End Time: ${data.taskEndTime} ${data.taskEndTimeAMPM}
          Task Status: ${data.taskStatus}
          Task Update: ${data.taskUpdate}
        `;
      })
      .join("\n\n");
  };

  const generatePDF = () => {
    html2canvas(submittedTableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // Adjust the width (mm) of the image in the PDF
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("submitted_details.pdf");
    });
  };
  return (
    <React.Fragment>
      <div className="App">
        <h1>Daily Updates Details</h1>
        <form onSubmit={handleDownload}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="employeeId">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="projectRole">Project Role</label>
            <input
              type="text"
              name="projectRole"
              value={formData.projectRole}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="dateOfCompletion">Date Of Completion</label>
            <input
              type="date"
              name="dateOfCompletion"
              value={formData.dateOfCompletion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="taskTitle">Task Title</label>
            <input
              type="text"
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="taskStartTime">Task Start Time</label>
            <input
              type="time"
              name="taskStartTime"
              value={formData.taskStartTime}
              onChange={handleChange}
            />
            <select
              name="taskStartTimeAMPM"
              value={formData.taskStartTimeAMPM}
              onChange={handleChange}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div>
            <label htmlFor="taskEndTime">Task End Time</label>
            <input
              type="time"
              name="taskEndTime"
              value={formData.taskEndTime}
              onChange={handleChange}
            />
            <select
              name="taskEndTimeAMPM"
              value={formData.taskEndTimeAMPM}
              onChange={handleChange}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div>
            <label htmlFor="taskStatus">Task Status</label>
            <select
              name="taskStatus"
              value={formData.taskStatus}
              onChange={handleChange}
            >
              <option value="">-- Select Status --</option>
              <option value="completed">Completed</option>
              <option value="inProgress">In Progress</option>
              <option value="blockers">Blockers</option>
            </select>
          </div>
          <div>
            <label htmlFor="taskUpdate">Task Update</label>
            <textarea
              name="taskUpdate"
              value={formData.taskUpdate}
              onChange={handleChange}
              rows={4}
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
        {submittedData.length > 0 && (
          <div className="submitted-details">
            <h2>Submitted Details</h2>
            <table className="submitted-table" ref={submittedTableRef}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employee ID</th>
                  <th>Project Name</th>
                  <th>Project Role</th>
                  <th>Date of Completion</th>
                  <th>Task Title</th>
                  <th>Task Start Time</th>
                  <th>Task End Time</th>
                  <th>Task Status</th>
                  <th>Task Update</th>
                </tr>
              </thead>
              <tbody>
                {submittedData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.employeeId}</td>
                    <td>{data.projectName}</td>
                    <td>{data.projectRole}</td>
                    <td>{data.dateOfCompletion}</td>
                    <td>{data.taskTitle}</td>
                    <td>
                      {data.taskStartTime} {data.taskStartTimeAMPM}
                    </td>
                    <td>
                      {data.taskEndTime} {data.taskEndTimeAMPM}
                    </td>
                    <td>
                      <span
                        className={`task-status ${data.taskStatus.toLowerCase()}`}
                      >
                        {data.taskStatus}
                      </span>
                    </td>
                    <td>{data.taskUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="download-button" onClick={handleExport}>
              Download Excel
            </button>
            <button className="share-button" onClick={handleShare}>
              Share
            </button>
            <button className="pdf-button" onClick={generatePDF}>
              Generate PDF
            </button>
          </div>
        )}
      </div>
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Share </h3>
            <p>Choose Your Share Option</p>
            <button className="close-buttonnn" onClick={closePopup}>
              <FiX />
            </button>
            <div className="share-options">
              <button className="whatsapp-button" onClick={handleWhatsAppShare}>
                <BsWhatsapp />

                <span>WhatsApp</span>
              </button>
              <button className="email-button" onClick={handleEmailShare}>
                <BsEnvelope />
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </React.Fragment>
  );
}

export default Exel;
