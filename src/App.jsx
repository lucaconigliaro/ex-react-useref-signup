import { useState, useMemo, useRef, useEffect } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\,.<>?/`~";

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const nameRef = useRef();
  const specializationRef = useRef();
  const experienceRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const specialization = specializationRef.current.value;
    const experience = experienceRef.current.value;

    if (!name.trim() || !username.trim() || !password.trim() || !specialization.trim() || !experience.trim() || !description.trim()) {
      alert("Compila tutti i campi");
      return;
    } else if (experience <= 0) {
      alert("Gli anni di esperienza devono essere un numero positivo");
      return;
    } else if (specialization === "") {
      alert("Seleziona una specializzazione");
      return;
    } else if (!isUsernameValid) {
      alert("Username non valido");
      return;
    } else if (!isPasswordValid) {
      alert("Password non valida");
      return;
    } else if (!isDescriptionValid) {
      alert("Descrizione non valida");
      return;
    }
    console.log({
      name,
      username,
      password,
      specialization,
      experience,
      description
    });
  };

  const isUsernameValid = useMemo(() => {
    const charsValid = username.split("").every(char =>
      letters.includes(char.toLowerCase()) ||
      numbers.includes(char)
    );
    return charsValid && username.trim().length >= 6;
  }, [username]);

  const isPasswordValid = useMemo(() => {
    return (
      password.trim().length >= 8 &&
      password.split("").some(char => letters.includes(char)) &&
      password.split("").some(char => numbers.includes(char)) &&
      password.split("").some(char => symbols.includes(char))
    )
  }, [password]);

  const isDescriptionValid = useMemo(() => {
    return description.trim().length >= 100 &&
      description.trim().length <= 1000;
  }, [description])

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const resetForm = e => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setDescription("");
    nameRef.current.value = "";
    specializationRef.current.value = "";
    experienceRef.current.value = "";
    nameRef.current.focus();
  }

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome completo</label>
          <input
            type="text"
            id="name"
            ref={nameRef}
          />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username.trim() && (
            <p style={{ color: isUsernameValid ? `green` : `red` }}>
              {isUsernameValid ? "Username valido" : "Deve contenere almeno 6 caratteri alfanumerici"}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.trim() && (
            <p style={{ color: isPasswordValid ? `green` : `red` }}>
              {isPasswordValid ? "Password valida" : "Deve contenere almeno 8 caratteri, 1 letta, 1 numero, 1 simbolo"}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="specialization">Specializzazione</label>
          <select
            id="specialization"
            ref={specializationRef}
          >
            <option value="">Seleziona una specializzazione</option>
            <option value="fullstack">Full Stack</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>

        <div>
          <label htmlFor="experience">Anni di esperienza</label>
          <input
            type="number"
            id="experience"
            ref={experienceRef}
          />
        </div>

        <div>
          <label htmlFor="description">Breve descrizione sullo sviluppatore</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {description.trim() && (
            <p style={{ color: isDescriptionValid ? `green` : `red` }}>
              {isDescriptionValid ? "Descrizione valida" : "Deve contenere almeno tra 100 e 1000 caratteri"}
            </p>
          )}
        </div>

        <button type="submit">Registrati</button>
        <button onClick={resetForm}>Reset</button>
      </form>
      <footer style={{ height: "100vh" }}></footer>
      <button id="scrolltop-arrow" onClick={() => { nameRef.current.scrollIntoView({ behavior: "smooth" }) }}>
        ⬆️
      </button>
    </div>
  )
};

export default App;