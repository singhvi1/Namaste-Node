import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

  return (
    <div className="card bg-base-200 shadow-xl w-[340px] mx-auto overflow-hidden rounded-2xl ">
      
      <figure className="relative">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-[380px] object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/70 to-transparent p-4 text-white">
          <h2 className="text-2xl font-semibold">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm opacity-90">{`${age}, ${gender}`}</p>
          )}
        </div>
      </figure>

    
      <div className="card-body p-5">
        {about && <p className="text-sm text-white-700 mb-2">{about}</p>}
        {skills && (
          <p className="text-sm text-white-600 mb-4">
            <span className="font-semibold">Skills:</span> {skills}
          </p>
        )}

        <div className="card-actions justify-between mt-4">
          <button className="btn btn-outline btn-error w-[48%]">
            Ignore
          </button>
          <button className="btn btn-primary w-[48%]">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
