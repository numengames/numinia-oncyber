import * as React from 'react';

interface ImplementationGuideOverlayProps {}

interface ImplementationGuideOverlayState {
  isHelpVisible: boolean;
}

export default class ImplementationGuideOverlay extends React.Component<
  ImplementationGuideOverlayProps,
  ImplementationGuideOverlayState
> {
  constructor(props: ImplementationGuideOverlayProps) {
    super(props);
    this.state = { isHelpVisible: false };
  }

  handleClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({ isHelpVisible: false });
  };

  handleOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({ isHelpVisible: true });
  };

  render() {
    const styles = `
      body {
          font-family: Arial, sans-serif;
          background-color: #000;
          color: #fff;
          padding: 20px;
      }
      .folder-structure {
          list-style-type: none;
          padding-left: 20px;
      }
      .folder-structure li {
          margin: 5px 0;
          padding-left: 20px;
          position: relative;
      }
      .folder-structure li::before {
          content: ' ';
          position: absolute;
          top: 10px;
          left: -20px;
          width: 15px;
          height: 2px;
          background-color: #fff;
      }
      .folder-structure li::after {
          content: ' ';
          position: absolute;
          top: 0;
          left: -20px;
          width: 2px;
          height: 100%;
          background-color: #fff;
      }
      .folder-structure li:last-child::after {
          height: 10px;
      }
      .folder-icon, .file-icon {
          margin-right: 5px;
      }
      .folder-icon::before {
          content: '📁';
      }
      .file-icon::before {
          content: '📄';
      }
      .image-button {
          position: fixed;
          top: 5%;
          right: 3%;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
      }
      .image-button img {
          display: block;
          width: 50px;
          height: auto;
      }
      .wrapper {
          position: fixed;
          width: 100vw;
          height: 100vh;
          background-color: #000;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding: 40px;
          box-sizing: border-box;
          overflow-y: auto;
      }
      .wrapper > button {
          cursor: pointer;
          color: #fff;
          background: none;
          border: 1px solid #fff;
          padding: 10px;
          margin-bottom: 20px;
          font-size: 16px;
          align-self: flex-end;
      }
      .section {
          text-align: left;
          margin-bottom: 20px;
          width: 80%;
      }
      .section h2 {
          margin-bottom: 10px;
          font-size: 1.5em;
      }
      .section p {
          margin-bottom: 10px;
          font-size: 1em;
      }
      .m10 {
          margin-left: 5px;
      }
      .sub-section {
          margin: 15px 0;
      }
      .section ul {
          list-style-type: none;
      }
      .section ul li {
          margin-bottom: 10px;
      }
  `;

    return (
      <>
        <button className="image-button" onClick={this.handleOpen}>
          <img
            src="https://cdn.pixabay.com/photo/2016/10/18/18/19/question-mark-1750942_1280.png"
            alt="Help"
          />
        </button>
        {this.state.isHelpVisible && (
          <div className="wrapper">
            <button onClick={this.handleClose}> x </button>
            <div className="section">
              <h2>Component - Discord Notifier</h2>
              <p>
                The Discord Notifier component allows integration with Discord to send notifications
                directly from the Oncyber platform to a specified Discord channel. This can be used
                to announce in-game events, player achievements, or other important updates.
              </p>
            </div>
            <div className="section">
              <h2>Project Structure</h2>
              <ul className="folder-structure">
                <li>
                  <span className="folder-icon"> </span>components
                  <ul className="folder-structure">
                    <li>
                      <span className="file-icon"> </span>DiscordLoginNotifierComponent.ts: Handles
                      the component
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="folder-icon"> </span>common
                  <ul className="folder-structure">
                    <li>
                      <span className="file-icon"> </span>DiscordNotification.ts: Handles the
                      Discord notifications
                    </li>
                    <li>
                      <span className="file-icon"> </span>network.ts: Utility for handling network
                      requests
                    </li>
                    <li>
                      <span className="file-icon"> </span>isValidUrl.ts: Validates the webhook URL
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="section">
              <h2>How to Use</h2>
              <p>To set up the Discord Notifier component, configure the following parameters:</p>
              <div className="sub-section">
                <p>1. Webhook URL (Required): </p>
                <p className="m10">
                  - Specify the URL of the Discord webhook that will receive the notifications.
                </p>
              </div>
              <div className="sub-section">
                <p>2. Default Message (Optional): </p>
                <p className="m10">
                  - Enter the default message to be sent to the Discord channel.
                </p>
              </div>
              <div className="sub-section">
                <p>3. Space Name (Optional): </p>
                <p className="m10">
                  - Provide the name of the virtual space where the event occurs, if applicable.
                </p>
              </div>
              <div className="sub-section">
                <p>4. Does message contain walletId (Optional): </p>
                <p className="m10">
                  - Set to true to include the wallet ID of the user in the message; otherwise, set
                  to false.
                </p>
              </div>
              <div className="sub-section">
                <p>5. Backend Setup (Required): </p>
                <p className="m10">
                  - Since third-party requests (like sending notifications to Discord) are
                  restricted, this component relies on a backend worker. You need to configure this
                  worker to handle network requests. We have provided a backend solution on
                  <a href="https://github.com/numengames/numinia-oncyber/tree/main/backend/worker">
                    GitHub
                  </a>
                  . Follow the instructions below to set this up.
                </p>
              </div>
              <div className="sub-section">
                <h3>Backend Setup Instructions:</h3>
                <p className="m10">
                  1. Create an account in <a href="https://cloudflare.com">Cloudflare</a> if you
                  don't have one.
                </p>
                <p className="m10">2. Navigate to the "Workers" section in Cloudflare Dashboard.</p>
                <p className="m10">
                  3. Deploy the code from our{' '}
                  <a href="https://github.com/numengames/numinia-oncyber/tree/main/backend/worker">
                    GitHub repository
                  </a>{' '}
                  to a new Cloudflare Worker.
                </p>
                <p className="m10">
                  4. Set the required environment variables in Cloudflare for your webhook URL and
                  other configurations.
                </p>
                <p className="m10">
                  5. Update your front-end component to use this backend endpoint for sending
                  Discord notifications.
                </p>
              </div>
              <p>
                * Ensure that the required parameters and backend are properly configured for the
                component to function as expected.
              </p>
            </div>
            <div className="section">
              <h2>Changelog</h2>
              <ul>
                <li>
                  Sept 3, 2024 - v1.0.0: Initial release of the component with discord login
                  notifier functionality.
                </li>
              </ul>
            </div>
            <div className="section">
              <p>Made with ❤️ by the NumenGames team</p>
            </div>
          </div>
        )}
        <style>{styles} </style>
      </>
    );
  }
}
