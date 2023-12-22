import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
const AddTask = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const taskInfo = {
      email: user?.email,
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      priority: data.priority,
      status: "todo",
    };
    console.log(taskInfo);

    const res = await axiosPublic.post("/tasks", taskInfo);
    console.log(res.data);
    if (res.data.insertedId) {
      navigate("/dashboard/preavioustasks");
    }
  };
  return (
    <div className="min-h-screen bg-green-fade flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray60 space-y-3 w-full shadow-2xl md:w-2/3 lg:w-2/3  2xl:w-1/3 mx-auto my-auto p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold">Add Task</h2>
        {/* title */}
        <label
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-anchor-placement="top-bottom"
          className="form-control w-full"
        >
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </label>
        {/* description */}
        <label
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-anchor-placement="top-bottom"
          className="form-control"
        >
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Bio"
            {...register("description", { required: true })}
          ></textarea>
        </label>
        {/* deadline */}
        <label
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-anchor-placement="top-bottom"
          className="form-control w-full"
        >
          <div className="label">
            <span className="label-text">Deadline</span>
          </div>
          <input
            type="date"
            placeholder="Date"
            {...register("deadline", { required: true })}
            className="input input-bordered w-full"
          />
        </label>
        {/* priority */}
        <label
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-anchor-placement="top-bottom"
          className="form-control w-full"
        >
          <div className="label">
            <span className="label-text">Priority</span>
          </div>
          <select
            {...register("priority", { required: true })}
            className="select select-bordered"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </label>
        <button
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-anchor-placement="top-bottom"
          className="flex gap-2 items-center py-2 px-6 bg-green-fade rounded-lg text-white hover:bg-green-medium"
        >
          <FaPlus />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
