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
            alt="Ayuda"
          />
        </button>
        {this.state.isHelpVisible && (
          <div className="wrapper">
            <button onClick={this.handleClose}> x </button>
            <div className="section">
              <h2>Behavioral Component - Teleport </h2>
              <p>
                {' '}
                This component is used for teleportation, either by pressing a key or automatically
                interacting with an element.
              </p>
            </div>
            <div className="section">
              <h2>Project Structure </h2>
              <ul className="folder-structure">
                <li>
                  <span className="folder-icon"> </span>Local Scripts
                  <ul className="folder-structure">
                    <li>
                      <span className="file-icon"> </span>ImplementationGuideOverlay: 📝
                    </li>
                    <li>
                      <span className="file-icon"> </span>main: The entrypoint of the space.
                    </li>
                    <li>
                      <span className="file-icon"> </span>Teleport: The code functionality
                    </li>
                    <li>
                      <span className="file-icon"> </span>Utils
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="section">
              <h2>How to Use </h2>
              <p> Specify the ID of the object to teleport to</p>
              <p>
                {' '}
                Attach the behavioral component to the element.It has 2 possible setup interaction
                options:{' '}
              </p>
              <div className="sub-section">
                <p>1. Trigger event by key: </p>
                <p className="m10">
                  {' '}
                  - Select the interaction method Key. (a couple of fields will appear){' '}
                </p>
                <p className="m10"> - Set the key param(default is E).</p>
                <p className="m10"> - Set the action radius param(default is 5).</p>
              </div>
              <div className="sub-section">
                <p>
                  2. Trigger event by proximity(this action requires to enable to enable the sensor
                  in the component that triggers the teleport event when the avatar is near):{' '}
                </p>
                <p className="m10"> - Select the interaction method Auto </p>
              </div>
              <p> * This component requires at least an element to teleport and a teleporter </p>
            </div>
            <div className="section">
              <h2>Changelog </h2>
              <ul>
                <li>
                  Aug 25, 2024 - v2.0.0: Restructure the component to support all-in-one or modular
                  usages
                </li>
                <li>
                  Aug 5, 2024 - v1.0.0: Initial release of the component with teleportation
                  functionality.
                </li>
              </ul>
            </div>
            <div className="section">
              <p>Made with ❤️ by the NumenGames team </p>
            </div>
          </div>
        )}
        <style>{styles} </style>
      </>
    );
  }
}
