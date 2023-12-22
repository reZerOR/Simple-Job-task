import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Edittask = () => {
  const { id } = useParams();

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { data: task = {} } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axiosPublic(`/tasks/${id}`);
      return res.data;
    },
  });
  const onSubmit = async (data) => {
    console.log(data);

    const res = await axiosPublic.put(`/tasks/${id}`, data);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task Edited Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/preavioustasks");
    }
  };
  return (
    <div className="min-h-screen bg-green-fade flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray60 space-y-3 w-full shadow-2xl md:w-2/3 lg:w-2/3  2xl:w-1/3 mx-auto my-auto p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold">Edit Task</h2>
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
            {...register("title")}
            defaultValue={task?.title}
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
            {...register("description")}
            defaultValue={task?.description}
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
            {...register("deadline")}
            defaultValue={task?.deadline}
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
            defaultValue={task?.priority}
            {...register("priority")}
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

export default Edittask;
