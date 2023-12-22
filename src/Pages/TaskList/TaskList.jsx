import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaPencil, FaTrashCan } from "react-icons/fa6";

const TaskList = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: tasks = [] } = useQuery({
    queryKey: ["taskslist", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(tasks);
  return (
    <div className="min-h-screen bg-green-fade">
      <h2 className=" text-4xl font-bold text-gray60 text-center py-10">
        Task Lists
      </h2>
      <div className="max-w-7xl mx-auto">
        <h2>her is task</h2>
        {/* todo status  */}
        <div className="space-y-5">
          {tasks &&
            tasks
              .filter((item) => item.status === "todo")
              .map((item, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={`${(index + 1) * 100}`}
                  data-aos-anchor-placement="top-bottom"
                  key={index}
                  className="card w-96 bg-green-medium shadow-xl"
                >
                  <div
                    data-aos="fade-up"
                    data-aos-delay={`${(index + 1) * 25}`}
                    data-aos-anchor-placement="top-bottom"
                    className="card-body"
                  >
                    <h2 className="card-title text-gray60">{item.title}</h2>
                    <p className="text-white">{item.description}</p>
                    <div className="card-actions text-white">
                      <div className="inline-block">
                        <p className="px-4  bg-green-dark rounded-full">
                          {item.priority}
                        </p>
                      </div>
                    </div>
                    <div className=" space-x-2 text-white ">
                      <button className="py-2 rounded-lg px-4 bg-green-fade">
                        On Going
                      </button>
                      <button className="py-2 rounded-lg px-4 bg-green-fade">
                        Complete
                      </button>
                    </div>
                    <div className=" space-x-2 flex text-white ">
                      <button className="py-2 flex gap-2 text-black rounded-lg px-4 bg-gray60">
                        <FaPencil />
                        Edit
                      </button>
                      <button className="py-2 flex gap-2 rounded-lg px-4 bg-green-dark">
                        <FaTrashCan />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {/* Ongoing status */}
        <div></div>
        {/* complete status */}
        <div></div>
      </div>
    </div>
  );
};

export default TaskList;
