import React from 'react';
import { BookOpen } from 'lucide-react';

const schoolDetails = [
  { label: "Name of School",          value: "Shemford Futuristic School Patna" },
  { label: "Affiliation Number",      value: "330701" },
  { label: "School Code",             value: "65698" },
  { label: "Complete Address",        value: "Shemford Futuristic School, Udaini, New Jaganpura Road, PO – Mittanchak, PS – Gopalpur, Patna – 804453" },
  { label: "Principal Name",          value: "Jaisa P.J" },
  { label: "Principal Qualification", value: "M.Sc., M.Ed., NET" },
  { label: "School Email ID",         value: "admissions@pat.shemford.com, principal@pat.shemford.com, director@pat.shemford.com", isEmail: true },
  { label: "Contact Details",         value: "+91 9534098666, +91 9431201060, +91 7061928947", isPhone: true },
];

export default function MandatoryDisclosure() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero */}
      <div className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15
            rounded-2xl mb-5 border border-white/20">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-100 mb-3">
            CBSE Compliance
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mandatory Disclosure</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            All mandatory disclosures as required by the Central Board of Secondary Education.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white dark:bg-gray-900 border-2 border-orange-100 dark:border-orange-900/30
          rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-orange-600 to-amber-500 text-white">
                  <th className="px-6 py-4 text-center text-sm font-bold w-16">S.No.</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Information</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Details</th>
                </tr>
              </thead>
              <tbody>
                {schoolDetails.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-orange-100 dark:border-orange-900/20 transition-colors
                      ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-orange-50/40 dark:bg-orange-900/5'}
                      hover:bg-orange-50 dark:hover:bg-orange-900/10`}
                  >
                    <td className="px-6 py-4 text-center text-sm font-semibold text-orange-600">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {item.label}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {item.isEmail ? (
                        <div className="flex flex-col gap-1">
                          {item.value.split(', ').map((email, i) => (
                            <a key={i} href={`mailto:${email.trim()}`}
                              className="text-orange-600 hover:text-orange-700 hover:underline">
                              {email.trim()}
                            </a>
                          ))}
                        </div>
                      ) : item.isPhone ? (
                        <div className="flex flex-col gap-1">
                          {item.value.split(', ').map((phone, i) => (
                            <a key={i} href={`tel:${phone.trim().replace(/\s/g, '')}`}
                              className="text-orange-600 hover:text-orange-700 hover:underline">
                              {phone.trim()}
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
      </div>
    </div>
  );
}
