import {type FormEvent, useState} from 'react';
import {useNavigate} from 'react-router';
import {logIn} from "./service";



export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('bastien@example.com');
  const [password, setPassword] = useState('tacostacos');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try{
      await logIn(username, password);
      navigate('/todos');

    }catch (error){
      console.error("Login failed:", error);
      alert("Login failed. Please check your username and password.");
      return;
    }



  }

  return (
    <>
      <h2>Sign in</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Email: </span>
          <input
            type="email"
            autoComplete="username"
            placeholder="email@example.com"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>

        <label>
          <span>Password: </span>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="**********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button type="submit">Send</button>
      </form>
    </>
  );
}
