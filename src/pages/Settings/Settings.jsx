import {
  useState
} from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

function Settings() {

  const [darkMode,
    setDarkMode] =
    useState(false);

  const [notifications,
    setNotifications] =
    useState(true);

  const [email,
    setEmail] =
    useState(
      "admin@gmail.com"
    );

  const [name,
    setName] =
    useState(
      "Admin User"
    );

  // SAVE SETTINGS

  const handleSave =
    () => {

      alert(
        "Settings Saved Successfully"
      );
    };

  // DARK MODE

  const handleDarkMode =
    () => {

      setDarkMode(
        !darkMode
      );

      document.body.classList.toggle(
        "dark-mode"
      );
    };

  return (

    <DashboardLayout>

      <div className="settings-page">

        {/* HEADER */}

        <div className="page-header">

          <h1>
            Settings
          </h1>

          <p>
            Manage your account settings
          </p>

        </div>

        {/* SETTINGS GRID */}

        <div className="settings-grid">

          {/* PROFILE SETTINGS */}

          <div className="settings-card">

            <h2>
              Profile Settings
            </h2>

            <div className="settings-form">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* APP SETTINGS */}

          <div className="settings-card">

            <h2>
              App Settings
            </h2>

            {/* DARK MODE */}

            <div className="setting-item">

              <div>

                <h4>
                  Dark Mode
                </h4>

                <p>
                  Enable dark theme
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={
                    handleDarkMode
                  }
                />

                <span className="slider">

                </span>

              </label>

            </div>

            {/* NOTIFICATIONS */}

            <div className="setting-item">

              <div>

                <h4>
                  Notifications
                </h4>

                <p>
                  Enable notifications
                </p>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={
                    notifications
                  }
                  onChange={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                />

                <span className="slider">

                </span>

              </label>

            </div>

          </div>

        </div>

        {/* SAVE BUTTON */}

        <button
          className="save-settings-btn"
          onClick={handleSave}
        >

          Save Settings

        </button>

      </div>

    </DashboardLayout>
  );
}

export default Settings;