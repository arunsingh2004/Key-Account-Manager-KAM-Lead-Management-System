"use client";
import React, { useEffect, useState } from "react";
import LeftSidebar from "@/Components/LeftSidebar";

interface PerformanceMetric {
  id: string;
  leadId: string;
  interactionType: string;
  date: string;
  details: string;
}

const PerformanceTrackingPage: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      // Hardcoded data as per the provided example
      const hardcodedData = [
        {
          id: "677639efb4acf88fe9c055f0",
          leadId: "aruns ingh",
          interactionType: "Call",
          date: "2025-01-02T07:02:07.217Z",
          details: "4-12-2025",
        },
      ];

      try {
        setMetrics(hardcodedData);
      } catch (err) {
        setError("Failed to load performance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  return (
    <div className="flex flex-1">
      <LeftSidebar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Performance Tracking</h1>
        {loading && <p>Loading performance data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Lead ID</th>
                <th className="py-2 px-4 border-b">Interaction Type</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.id}>
                  <td className="py-2 px-4 border-b">{metric.leadId}</td>
                  <td className="py-2 px-4 border-b">
                    {metric.interactionType}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(metric.date).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{metric.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PerformanceTrackingPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import LeftSidebar from "@/Components/LeftSidebar";
// interface PerformanceMetric {
//   id: string;
//   leadId: string;
//   interactionType: string;
//   date: string;
//   details: string;
// }

// const PerformanceTrackingPage: React.FC = () => {
//   const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPerformanceData = async () => {
//       try {
//         const response = await axios.get("/api/Admin/Interaction");
//         setMetrics(response.data);
//       } catch (err) {
//         setError("Failed to load performance data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPerformanceData();
//   }, []);

//   return (
//     <div className="flex flex-1">
//       <LeftSidebar />
//       <>
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-2xl font-bold mb-6">Performance Tracking</h1>
//           {loading || <p>Loading performance data...</p>}
//           {error && <p className="text-red-500">{error}</p>}
//           {!loading && !error && (
//             <table className="min-w-full bg-white border border-gray-200">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border-b">Lead ID</th>
//                   <th className="py-2 px-4 border-b">Interaction Type</th>
//                   <th className="py-2 px-4 border-b">Date</th>
//                   <th className="py-2 px-4 border-b">Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {metrics.map((metric) => (
//                   <tr key={metric.id}>
//                     <td className="py-2 px-4 border-b">{metric.leadId}</td>
//                     <td className="py-2 px-4 border-b">
//                       {metric.interactionType}
//                     </td>
//                     <td className="py-2 px-4 border-b">
//                       {new Date(metric.date).toLocaleString()}
//                     </td>
//                     <td className="py-2 px-4 border-b">{metric.details}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </>
//     </div>
//   );
// };

// export default PerformanceTrackingPage;
