import {useHistory} from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home(){
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');


  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle()
    }else{
    history.push('/rooms/new')
  }
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if(roomCode.trim() == ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if(!roomRef.exists()){
      alert('Essa sala não existe mano, tenta um outro número')
      return;
    }else {
      history.push(`/rooms/${roomCode}`)
    }
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração inicial" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo do site" />
          <button className="create-room" onClick={handleCreateRoom
          }> 
            <img src={googleIconImg} alt="logo google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input value={roomCode} onChange={e => setRoomCode(e.target.value)} type="text" placeholder="Digite o código da sala" />
           <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}