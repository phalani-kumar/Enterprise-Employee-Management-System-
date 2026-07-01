import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  getCurrentEmployee,
  updateProfile,
} from "../services/employeeService";

function Profile() {

  const [employee, setEmployee] = useState(null);

  const [profile, setProfile] = useState({

    first_name: "",

    last_name: "",

    phone_number: "",

    department: "",

    designation: "",

    profile_picture: "",

    address: "",

    date_of_joining: "",

    employee_id: "",

  });

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    const data = await getCurrentEmployee();

    setEmployee(data);

    setProfile({

      first_name: data.first_name || "",

      last_name: data.last_name || "",

      phone_number: data.phone_number || "",

      department: data.department || "",

      designation: data.designation || "",

      profile_picture: data.profile_picture || "",

      address: data.address || "",

      date_of_joining: data.date_of_joining || "",

      employee_id: data.employee_id || "",

    });

  };

  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]: e.target.value,

    });

  };

  const handleImageUpload = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {

    setProfile({

      ...profile,

      profile_picture: reader.result,

    });

  };

  reader.readAsDataURL(file);

};

  const handleSave = async () => {

    try {

      const response = await updateProfile(profile);

      setEmployee(response.user);

      localStorage.setItem(

        "authUser",

        JSON.stringify(response.user)

      );

      alert("Profile Updated Successfully");

      loadProfile();

    }

    catch (error) {

      console.log(error);

      alert("Profile Update Failed");

    }

  };

  if (!employee)

    return (

      <DashboardLayout>

        Loading...

      </DashboardLayout>

    );

  return (

    <DashboardLayout>

      <div className="profile-page">

        <h1>

          My Profile

        </h1>

        <div className="profile-card">

          <h2>

            {employee.name}

          </h2>

          <p>

            Email : {employee.email}

          </p>

          <hr />

          <div className="profile-form">
          <div>

            <label>

              First Name

            </label>

            <input

              type="text"

              name="first_name"

              value={profile.first_name}

              onChange={handleChange}

            />
          </div>

          <div>

            <label>

              Last Name

            </label>

            <input

              type="text"

              name="last_name"

              value={profile.last_name}

              onChange={handleChange}

            />
          </div>

          <div>

            <label>

              Phone Number

            </label>

            <input

              type="text"

              name="phone_number"

              value={profile.phone_number}

              onChange={handleChange}

            />

          </div>

          <div>
            <label>

              Department

            </label>

            <input

              type="text"

              name="department"

              value={profile.department}

              onChange={handleChange}

            />

          </div>

          <div>

            <label>

              Designation

            </label>

            <input

              type="text"

              name="designation"

              value={profile.designation}

              onChange={handleChange}

            />

          </div>

          <div>
            <label>

              Address

            </label>

            <textarea

              rows="3"

              name="address"

              value={profile.address}

              onChange={handleChange}

            />

          </div>

          <div>
          
            <label>

              Employee ID

            </label>

            <input

              type="text"

              name="employee_id"

              value={profile.employee_id}

              onChange={handleChange}

            />

           </div>

           <div> 

            <label>

              Date Of Joining

            </label>

            <input

              type="date"

              name="date_of_joining"

              value={profile.date_of_joining}

              onChange={handleChange}

            />

           </div>

           <div className="profile-image-section">

             <label>
           
               Profile Picture
           
             </label>
           
             <div className="profile-image-preview">
           
               {
           
                 profile.profile_picture
           
                 ?
           
                 <img
           
                   src={profile.profile_picture}
           
                   alt="Profile"
           
                 />
           
                 :
           
                 <div className="image-placeholder">
           
                   No Image
           
                 </div>
           
               }
           
             </div>
           
             <input
           
               type="file"
           
               accept="image/*"
           
               onChange={handleImageUpload}
           
             />
           
           </div>
   
            <button

              className="save-profile-btn"

              onClick={handleSave}

            >

              Save Profile

            </button>

          </div>

          <hr />

          <h3>

            Profile Completion

          </h3>

          <h2>

            {employee.profile_completion}%

          </h2>

          <div className="progress">

            <div

              className="progress-bar"

              style={{

                width: `${employee.profile_completion}%`,

              }}

            ></div>

          </div>

          <h3>

            Missing Fields

          </h3>

          {

            employee.missing_fields.length === 0

            ?

            <p>

              🎉 Profile Completed Successfully

            </p>

            :

            <ul>

              {

                employee.missing_fields.map(

                  (field, index) => (

                    <li key={index}>

                      {field}

                    </li>

                  )

                )

              }

            </ul>

          }

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Profile;