import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const PreviousTasks = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: tasks = [] } = useQuery({
    queryKey: ["payments", user?.email],
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
        Previously Added Tasks
      </h2>
      {tasks ? (
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 pb-10 grid-cols-1 md:grid-cols-2 justify-items-center gap-6">
          {tasks.map((item, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={`${(index + 1) * 10}`}
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
                <h2
                  data-aos="fade-up"
                  data-aos-delay={`${(index + 1) * 50}`}
                  data-aos-anchor-placement="top-bottom"
                  className="card-title text-gray60"
                >
                  {item.title}
                </h2>
                <p
                  data-aos="fade-up"
                  data-aos-delay={`${(index + 1) * 75}`}
                  data-aos-anchor-placement="top-bottom"
                  className="text-white"
                >
                  {item.description}
                </p>
                <div
                  data-aos="fade-up"
                  data-aos-delay={`${(index + 1) * 100}`}
                  data-aos-anchor-placement="top-bottom"
                  className="card-actions text-white"
                >
                  <div className="inline-block">
                    <p className="py-1 px-4  bg-green-dark rounded-full">
                      {item.priority}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-7xl text-center my-20">No Previous Task</h2>
      )}
    </div>
  );
};

export default PreviousTasks;
