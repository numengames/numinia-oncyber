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
              <h2>Behavioral Component - Teleport</h2>
              <p>
                The Teleport behavioral component allows users or entities within a virtual
                environment to instantly move from one location to another, either by pressing a key
                or automatically interacting with an element.
              </p>
            </div>
            <div className="section">
              <h2>Project Structure</h2>
              <ul className="folder-structure">
                <li>
                  <span className="folder-icon"> </span>Local Scripts
                  <ul className="folder-structure">
                    <li>
                      <span className="file-icon"> </span>TeleportBehavior.ts: Handles the
                      teleportation behavior
                    </li>
                    <li>
                      <span className="file-icon"> </span>TeleportAction.ts: Executes the
                      teleportation logic
                    </li>
                    <li>
                      <span className="file-icon"> </span>FadeIn.ts: Optional fade-in effect used
                      during teleportation
                    </li>
                    <li>
                      <span className="file-icon"> </span>FadeOut.ts: Optional fade-out effect used
                      during teleportation
                    </li>
                    <li>
                      <span className="file-icon"> </span>InteractionDirector.ts: Manages
                      interactions (Key or Auto)
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="section">
              <h2>How to Use</h2>
              <p> To set up the Teleport component, configure the following parameters:</p>
              <div className="sub-section">
                <p>1. Component Target (Required): </p>
                <p className="m10">- Specify the component that the user will be teleported to.</p>
              </div>
              <div className="sub-section">
                <p>2. Interaction Mode (Required): </p>
                <p className="m10">
                  - Choose how the teleportation is triggered: either by pressing a key ("Key") or
                  automatically when in proximity ("Auto").
                </p>
              </div>
              <div className="sub-section">
                <p>3. Trigger Key (Depends on Interaction Mode): </p>
                <p className="m10">
                  - If "Key" is selected, specify the key that will trigger the teleportation.
                </p>
              </div>
              <div className="sub-section">
                <p>4. Trigger Distance (Depends on Interaction Mode): </p>
                <p className="m10">
                  - Adjust the distance within which the user can activate the teleportation.
                </p>
              </div>
              <div className="sub-section">
                <p>5. Enable FadeIn - FadeOut (Optional): </p>
                <p className="m10">
                  - Enable and set the duration for fade-in and fade-out effects during
                  teleportation.
                </p>
              </div>
              <div className="sub-section">
                <p>6. Teleport Delay (Optional): </p>
                <p className="m10">
                  - Set the delay in seconds before the teleportation occurs after interaction.
                </p>
              </div>
              <p>
                * Ensure that the required parameters are properly configured for the component to
                function as expected.
              </p>
            </div>
            <div className="section">
              <h2>Changelog</h2>
              <ul>
                <li>
                  Sep 02, 2024 - v2.0.1: Fixed an issue where the delay could be undefined in
                  certain scenarios.
                </li>
                <li>
                  Aug 25, 2024 - v2.0.0: Restructured the component to support all-in-one or modular
                  usages.
                </li>
                <li>
                  Aug 5, 2024 - v1.0.0: Initial release of the component with teleportation
                  functionality.
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
