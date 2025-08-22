import { useState } from "react";
import videoSrc from "./assets/I wish you love.mp4";
import "./App.css";

function App() {
  let count = 0;
  const [name, setName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isShow, setIsShow] = useState(false);

  function rain() {
    count++;
    let heart = document.querySelector(".heart");

    // Remove animation class first to reset the animation
    heart?.classList.remove("animate");

    // Force reflow to ensure the class removal takes effect
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (heart as HTMLElement)?.offsetHeight;

    // Add animation class to trigger heart animation
    heart?.classList.add("animate");

    // Remove animation class after animation completes
    setTimeout(() => {
      heart?.classList.remove("animate");
    }, 1500);

    let body = document.body;
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        let e = document.createElement("div");
        e.classList.add("drop");
        e.style.zIndex = "9999";
        body.appendChild(e);
        let left = Math.random() * 100;
        let duration = Math.random() * 2 + 2;
        e.style.left = left + "vw";
        e.style.animationDuration = duration + "s";

        setTimeout(() => {
          if (body && body.contains(e)) {
            body.removeChild(e);
          }
        }, duration * 1000 + 500);
      }, i * 100);

      if (count == 10) {
        const k = document.createElement("div");
        k.classList.add("sentence");
        k.innerHTML = `I wish you love`;
        body.appendChild(k);
        setTimeout(() => {
          if (body && body.contains(k)) {
            body.removeChild(k);
          }
        }, 5000);
        setIsShow(true);
      }
    }
  }
  return (
    <>
      {isAuthenticated ? (
        <div className="container">
          <div
            className="heart"
            onClick={() => {
              rain();
            }}
          ></div>
        </div>
      ) : (
        <div className="login-container">
          <div className="login">
            <h1>Welcome to the Tin's secret</h1>
            <p>Please enter your name to start:</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <button
              onClick={() => {
                if (name == "fer" || name == "Fer") {
                  setIsAuthenticated(true);
                } else {
                  alert("Please enter a valid name.");
                }
              }}
            >
              Start
            </button>
          </div>
        </div>
      )}
      {isAuthenticated && isShow && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setIsShow(false)}>
              ×
            </button>
            <video width="500" height="280" controls autoPlay>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
