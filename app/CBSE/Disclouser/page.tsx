import React from "react";

const SchoolInfo: React.FC = () => {
  const schoolDetails = [
    { label: "NAME OF SCHOOL", value: "SHEMORD FUTURISTIC SCHOOL PATNA" },
    { label: "AFFILIATION NUMBER", value: "330701" },
    { label: "SCHOOL CODE", value: "65698" },
    { label: "COMPLETE ADDRESS", value: "SHEMFORD FUTURISTIC SCHOOL, UDAINI, NEW JAGANPURA ROAD, PO – MITTANCHAK, PS – GOPALPUR, PATNA – 804453" },
    { label: "PRINCIPAL NAME", value: "Jaisa P.J" },
    { label: "PRINCIPAL QUALIFICATION", value: "M.Sc. , M.Ed. , NET" },
    { label: "SCHOOL EMAIL ID", value: "admissions@pat.shemford.com, principal@pat.shemford.com, director@pat.shemford.com" },
    { label: "CONTACT DETAILS", value: "+91 9534098666 , +919431201060, +91 7061928947" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center dark:text-neutral-200 text-gray-800 mb-6">School&apos;s Information</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-center">S.No.</th>
              <th className="px-6 py-3 text-center">Information</th>
              <th className="px-6 py-3 text-center">Details</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {schoolDetails.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3 text-left font-medium">{item.label}</td>
                <td className="px-6 py-3">
                  {item.label === "SCHOOL EMAIL ID" ? (
                    <div>
                      {item.value.split(", ").map((email, idx) => (
                        <a
                          key={idx}
                          href={`mailto:${email}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          {email}
                          {idx < item.value.split(", ").length - 1 && ", "}
                        </a>
                      ))}
                    </div>
                  ) : item.label === "CONTACT DETAILS" ? (
                    <div>
                      {item.value.split(", ").map((phone, idx) => (
                        <a
                          key={idx}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="text-green-500 hover:text-green-700"
                        >
                          {phone}
                          {idx < item.value.split(", ").length - 1 && ", "}
                        </a>
                      ))}
                    </div>
                  ) : (
                    item.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolInfo;
