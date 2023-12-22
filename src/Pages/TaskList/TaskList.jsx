import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TaskList = () => {
  const { user, loading } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["taskslist", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks?email=${user?.email}`);

      return res.data;
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/tasks/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          refetch();
        }
      }
    });
  };
  const handleTodo = async (id) => {
    console.log(id);
    const task = { status: "todo" };
    const res = await axiosPublic.put(`/tasktodo/${id}`, task);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };
  const handlecomplete = async (id) => {
    console.log(id);
    const task = { status: "complete" };
    const res = await axiosPublic.put(`/tasktodo/${id}`, task);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };
  const handleongoing = async (id) => {
    console.log(id);
    const task = { status: "ongoing" };
    const res = await axiosPublic.put(`/tasktodo/${id}`, task);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };
  console.log(tasks);

  return (
    <div className="min-h-screen bg-green-fade">
      <h2 className=" text-4xl font-bold text-gray60 text-center py-10">
        Task Lists
      </h2>
      <div className="max-w-7xl mx-auto grid xl:grid-cols-3 gap-6 grid-cols-1 md:grid-cols-2 pb-10">
        {/* todo status  */}
        <div className="space-y-5 border-2 w-full border-dashed p-3 border-gray60">
          <h2 className="text-2xl font-bold text-gray60 text-center">
            To-Do Lists
          </h2>
          {tasks &&
            tasks
              .filter((item) => item.status === "todo")
              .map((item, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={`${(index + 1) * 100}`}
                  data-aos-anchor-placement="top-bottom"
                  key={index}
                  className="card w-96 mx-auto bg-green-medium shadow-xl"
                >
                  <div
                    data-aos="fade-up"
                    data-aos-delay={`${(index + 1) * 25}`}
                    data-aos-anchor-placement="top-bottom"
                    className="card-body"
                  >
                    <h2 className="card-title text-gray60">{item.title}</h2>
                    <p className="text-white">{item.description}</p>
                    <p>Deadline: {item.deadline}</p>
                    <div className="card-actions text-white">
                      <div className="inline-block">
                        <p className="px-4  bg-green-dark rounded-full">
                          {item.priority}
                        </p>
                      </div>
                    </div>
                    <div className=" space-x-2 text-white ">
                      <button
                        onClick={() => handleongoing(item._id)}
                        className="py-2 rounded-lg px-4 bg-green-fade"
                      >
                        On Going
                      </button>
                      <button
                        onClick={() => handlecomplete(item._id)}
                        className="py-2 rounded-lg px-4 bg-green-fade"
                      >
                        Complete
                      </button>
                    </div>
                    <div className=" space-x-2 flex text-white ">
                      <Link
                        to={`/dashboard/edittask/${item._id}`}
                        className="py-2 flex gap-2 text-black rounded-lg px-4 bg-gray60"
                      >
                        <FaPencil />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="py-2 flex gap-2 rounded-lg px-4 bg-green-dark"
                      >
                        <FaTrashCan />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {/* Ongoing status */}
        <div className="space-y-5 border-2 w-full border-dashed p-3 border-gray60">
          <h2 className="text-2xl font-bold text-gray60 text-center">
            On Going
          </h2>
          {tasks &&
            tasks
              .filter((item) => item.status === "ongoing")
              .map((item, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={`${(index + 1) * 100}`}
                  data-aos-anchor-placement="top-bottom"
                  key={index}
                  className="card w-96 bg-green-medium mx-auto shadow-xl"
                >
                  <div
                    data-aos="fade-up"
                    data-aos-delay={`${(index + 1) * 25}`}
                    data-aos-anchor-placement="top-bottom"
                    className="card-body"
                  >
                    <h2 className="card-title text-gray60">{item.title}</h2>
                    <p className="text-white">{item.description}</p>
                    <p>Deadline: {item.deadline}</p>
                    <div className="card-actions text-white">
                      <div className="inline-block">
                        <p className="px-4  bg-green-dark rounded-full">
                          {item.priority}
                        </p>
                      </div>
                    </div>
                    <div className=" space-x-2 text-white ">
                      <button
                        onClick={() => handleTodo(item._id)}
                        className="py-2 rounded-lg px-4 bg-green-fade"
                      >
                        To Do
                      </button>
                      <button
                        onClick={() => handlecomplete(item._id)}
                        className="py-2 rounded-lg px-4 bg-green-fade"
                      >
                        Complete
                      </button>
                    </div>
                    <div className=" space-x-2 flex text-white ">
                      <Link
                        to={`/dashboard/edittask/${item._id}`}
                        className="py-2 flex gap-2 text-black rounded-lg px-4 bg-gray60"
                      >
                        <FaPencil />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="py-2 flex gap-2 rounded-lg px-4 bg-green-dark"
                      >
                        <FaTrashCan />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {/* complete status */}
        <div className="space-y-5 border-2 w-full border-dashed p-3 border-gray60">
          <h2 className="text-2xl font-bold text-center text-gray60">
            Complete
          </h2>
          {tasks &&
            tasks
              .filter((item) => item.status === "complete")
              .map((item, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={`${(index + 1) * 100}`}
                  data-aos-anchor-placement="top-bottom"
                  key={index}
                  className="card w-96 mx-auto bg-green-medium shadow-xl"
                >
                  <div
                    data-aos="fade-up"
                    data-aos-delay={`${(index + 1) * 25}`}
                    data-aos-anchor-placement="top-bottom"
                    className="card-body"
                  >
                    <h2 className="card-title text-gray60">{item.title}</h2>
                    <p className="text-white">{item.description}</p>
                    <p>Deadline: {item.deadline}</p>
                    <div className="card-actions text-white">
                      <div className="inline-block">
                        <p className="px-4  bg-green-dark rounded-full">
                          {item.priority}
                        </p>
                      </div>
                    </div>
                    <div className=" space-x-2 text-white ">
                      <button
                        onClick={() => handleongoing(item._id)}
                        className="py-2 rounded-lg px-4 bg-green-fade"
                      >
                        On Going
                      </button>
                      <button
                        onClick={() => handleTodo(item._id)}
                        className="py-2 rounded-lg px-4 bg-green-fade"
                      >
                        To Do
                      </button>
                    </div>
                    <div className=" space-x-2 flex text-white ">
                      <Link
                        to={`/dashboard/edittask/${item._id}`}
                        className="py-2 flex gap-2 text-black rounded-lg px-4 bg-gray60"
                      >
                        <FaPencil />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="py-2 flex gap-2 rounded-lg px-4 bg-green-dark"
                      >
                        <FaTrashCan />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>

    // Wrap your current JSX structure with DragDropContext
  );
};

export default TaskList;
