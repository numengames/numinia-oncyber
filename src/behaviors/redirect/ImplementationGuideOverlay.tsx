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
              <h2>Behavioral Component - Redirect</h2>
              <p>
                The Redirect behavioral component allows users or entities within a virtual
                environment to be seamlessly redirected to another URL or space, either in the same
                window or in a new tab.
              </p>
            </div>
            <div className="section">
              <h2>Project Structure</h2>
              <ul className="folder-structure">
                <li>
                  <span className="folder-icon"> </span>Local Scripts
                  <ul className="folder-structure">
                    <li>
                      <span className="file-icon"> </span>RedirectBehavior.ts: Handles the behavior
                    </li>
                    <li>
                      <span className="file-icon"> </span>RedirectAction.ts: Handles the redirect
                    </li>
                    <li>
                      <span className="file-icon"> </span>FadeOut.ts: Optional fade-out effect for
                      redirection
                    </li>
                    <li>
                      <span className="file-icon"> </span>InteractionDirector.ts: Utility for
                      managing interactions (By Key or Auto)
                    </li>
                    <li>
                      <span className="file-icon"> </span>isValidUrl.ts: Checks that the URL is
                      valid
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="section">
              <h2>How to Use</h2>
              <p> To set up the Redirect component, configure the following parameters:</p>
              <div className="sub-section">
                <p>1. Web URL (Required): </p>
                <p className="m10">
                  - Input the desired URL or the address of the space within your virtual
                  environment.
                </p>
              </div>
              <div className="sub-section">
                <p>2. Redirect Mode (Required): </p>
                <p className="m10">
                  - Choose between redirecting in the same tab ("Existing") or opening in a new tab
                  ("New tab").
                </p>
              </div>
              <div className="sub-section">
                <p>3. Interaction Mode (Required): </p>
                <p className="m10">
                  - Select how the redirection is triggered: either by pressing a key ("Key") or
                  automatically when in proximity ("Auto").
                </p>
              </div>
              <div className="sub-section">
                <p>4. Trigger Key (Depends on Interaction Mode): </p>
                <p className="m10">
                  - If "Key" is selected, specify which key will trigger the redirect.
                </p>
              </div>
              <div className="sub-section">
                <p>5. Trigger Distance (Depends on Interaction Mode): </p>
                <p className="m10">
                  - Adjust the distance within which the user can activate the redirect component.
                </p>
              </div>
              <div className="sub-section">
                <p>6. FadeOut Duration (Optional): </p>
                <p className="m10">
                  - Set the duration of the fade-out effect before the redirection occurs.
                </p>
              </div>
              <div className="sub-section">
                <p>7. Interaction Hold Time (Optional): </p>
                <p className="m10">
                  - Specify the delay time in seconds before the redirection is executed after
                  interaction.
                </p>
              </div>
              <p>
                {' '}
                * Ensure that the required parameters are properly configured for the component to
                function as expected.
              </p>
            </div>
            <div className="section">
              <h2>Changelog</h2>
              <ul>
                <li>Sept 02, 2024 - v1.0.0: Initial release of the Redirect component.</li>
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
