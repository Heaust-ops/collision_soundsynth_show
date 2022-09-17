import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import { baseFrequencies } from "./soundgen/defaults";
import { getWAVURL, playURL } from "./soundgen/synth";

function App() {
  const [metalness, setMetalness] = useState(50);
  const [loudness, setLoudness] = useState(50);
  const [octave, setOctave] = useState(4);
  const [note, setNote] = useState("e");
  const [url, setURL] = useState("");
  return (
    <div className="App">
      <h1>Metalness</h1>
      <div style={{ width: "60%", margin: "auto" }}>
        <Slider
          value={metalness}
          step={0.01}
          onChange={(_, val) => setMetalness(val as number)}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </div>
      <h1>Loudness</h1>
      <div style={{ width: "60%", margin: "auto" }}>
        <Slider
          min={1}
          max={75}
          value={loudness}
          onChange={(_, val) => setLoudness(val as number)}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </div>
      <h1>Octave</h1>
      <div style={{ width: "60%", margin: "auto" }}>
        <Slider
          value={octave}
          onChange={(_, val) => setOctave(val as number)}
          min={0}
          max={9}
          step={1}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </div>
      <RadioGroup
        style={{
          width: "80%",
          height: "5rem",
          margin: "auto",
          padding: "2rem",
          paddingBottom: "0",
          background: "#4E4E4E",
          borderRadius: "2rem",
        }}
        value={note}
        onChange={(_, val) => setNote(val)}
        defaultValue="e"
        name="radio-buttons-group"
      >
        {Object.keys(baseFrequencies).map((note) => (
          <FormControlLabel
            key={note}
            value={note}
            control={<Radio />}
            label={
              <span style={{ fontSize: "1.8rem", marginLeft: "1rem" }}>
                {note.toUpperCase()}
              </span>
            }
          />
        ))}
      </RadioGroup>
      <br />
      <Button
        onClick={() => {
          const uri = getWAVURL({
            metalness: metalness / 100,
            loudness: loudness / 100,
            frequency: `${note}${octave}`,
          });
          setURL(uri);
          playURL(uri);
        }}
        style={{ padding: "1rem", fontSize: "1.4rem", paddingBottom: "0.2rem" }}
        variant="contained"
      >
        Play Sound
      </Button>
      <br />
      <br />
      <div
        style={{
          width: "40%",
          margin: "auto",
          fontSize: "1.4rem",
          padding: "2rem",
          background: "#4E4E4E",
          borderRadius: "2rem",
        }}
      >
        URL: {url}
      </div>
    </div>
  );
}

export default App;
