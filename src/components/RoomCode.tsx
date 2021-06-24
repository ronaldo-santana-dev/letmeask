import React from 'react'
import copyImg from '../assets/images/copy.svg'
import '../styles/roomCode.scss'

type RoomCodeProps = {
  code: string;
}
export const RoomCode = (props: RoomCodeProps) => {
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
    alert('Código copiado :)')
  }
  return (
    <div>
      <button onClick={copyRoomCodeToClipboard} className="room-code">
        <div>
          <img src={copyImg} alt="Copiar o código" />
        </div>
        <span>Sala {props.code}</span>
      </button>
    </div>
  )
}
