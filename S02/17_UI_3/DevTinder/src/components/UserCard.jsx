import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  console.log(user);
  return (
    <div className="card bg-base-300 w-150  shadow-sm">
      <figure className="flex justify-center my-6">
        <img
          src={photoUrl}
          alt={firstName + " "+ lastName}
          className="w-3/4 h-2/3"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <p>{skills}</p>
        <div className="card-actions justify-between p-2 ">
          <button className="btn btn-primary hover:bg-blue-950">Ignored</button>
          <button className="btn btn-secondary ">Intrested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
