import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);

  console.log("user", students);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`/api/student/getAllstudents`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setStudents(data.students);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
      fetchStudents();
    
  }, []);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {students && students.length > 0 ? (
        <>
           <table className="w-full divide-y divide-gray-200 shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
               
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr
                  key={student._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{student.Id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      
                      
                    >
                      {student.status}
                    </button>
                  </td>
                 
                 
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
    </div>
  );
}
