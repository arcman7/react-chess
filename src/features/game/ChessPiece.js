
import { Pawn } from './pieces/Pawn'
import { Rook } from './pieces/Rook'
import { Knight } from './pieces/Knight'
import { Bishop } from './pieces/Bishop'
import { Queen } from './pieces/Queen'
import { King } from './pieces/King'

import { pieceTypes } from './gameLogic'

const [pawn, rook, knight, bishop, queen, king] = pieceTypes

export const ChessPiece = ({ pieceType, color, stroke, id }) => {
  switch(pieceType) {
    case pawn:
      return <Pawn
        id={id}
        className="chess-piece"
        fill={color}
        stroke={stroke} 
        />
    case rook:
      return <Rook
        id={id}
        className="chess-piece"
        fill={color}
        stroke={stroke} 
        />
    case knight:
      return <Knight
      id={id}
      className="chess-piece"
      fill={color}
      stroke={stroke} 
      />
    case bishop:
      return <Bishop
      id={id}
      className="chess-piece"
      fill={color}
      stroke={stroke} 
      />
    case queen:
      return <Queen
      id={id}
      className="chess-piece"
      fill={color}
      stroke={stroke} 
      />
    case king:
      return <King
      id={id}
      className="chess-piece"
      fill={color}
      stroke={stroke} 
      />
    default:
      return null
  }
}