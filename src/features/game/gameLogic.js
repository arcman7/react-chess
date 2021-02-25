const dimensions = { x: 8, y : 8 }

export const canMove = {
  dimensions,
  pawn({ x, y }, board, dir = -1) {
    const rowEdge = this.dimensions.x
    const colEdge = this.dimensions.y
    const canMove = []
    if ((x + dir) >= 0 && (x + dir) < rowEdge) {
      // move forward
      if (board[x + dir][y] === null) {
        canMove.push({ row: x + dir, col: y })
      }
      // attack right
      let occupied = board[x + dir][y + 1]
      if (y + 1 < colEdge && occupied && occupied.enemy === true) {
        canMove.push({ row: x + dir, col: y + 1 })
      }
      occupied = board[x + dir][y - 1]
      if (y - 1 >= 0 && occupied && occupied.enemy === true) {
        canMove.push({ row: x + dir, col: y -1 })
      }
    }
    return canMove
  },
  rook({ x, y }, board) {
    const rowEdge = this.dimensions.x
    const colEdge = this.dimensions.y
    const canMove = []
    // straight down
    for (let i = x + 1; i < rowEdge; i++) {
      let occupied = board[i][y]
      if (occupied) {
        if (occupied.enemy) {
          canMove.push({ row: i, col: y })
        }
        break;
      }
      canMove.push({ row: i, col: y })
    }
    // straight up
    for (let i = x - 1; i >= 0; i--) {
      let occupied = board[i][y]
      if (occupied) {
        if (occupied.enemy) {
          canMove.push({ row: i, col: y })
        }
        break;
      }
      canMove.push({ row: i, col: y })
    }
    // straight left
    for (let j = y - 1; j >= 0; j--) {
      let occupied = board[x][j]
      if (occupied) {
        if (occupied.enemy) {
          canMove.push({ row: x, col: j })
        }
        break;
      }
      canMove.push({ row: x, col: j })
    }
    // straight right
    for (let j = y + 1; j < colEdge; j++) {
      let occupied = board[x][j]
      if (occupied) {
        if (occupied.enemy) {
          canMove.push({ row: x, col: j })
        }
        break;
      }
      canMove.push({ row: x, col: j })
    }
    return canMove
  },
  knight({ x, y }, board) {
    const rowEdge = this.dimensions.x
    const colEdge = this.dimensions.y
    const canMove = [
      // bot-left 
      { row: x - 1, col: y + 2 },
      { row: x - 2, col: y + 1 },
      // bot-right
      { row: x + 1, col: y + 2 },
      { row: x + 2, col: y + 1 },
      // up-left
      { row: x - 1, col: y - 2 },
      { row: x - 2, col: y - 1 },
      // up-right
      { row: x + 1, col: y - 2 },
      { row: x + 2, col: y - 1 },
    ]
    
    return canMove.filter(({ row, col }) => 
      ((row >= 0 && row < rowEdge) &&
      (col >= 0 && col < colEdge) &&
      (board[row][col] === null || board[row][col].enemy === true))
    )
  },
  bishop({ x, y }, board) {
    const rowEdge = this.dimensions.x
    const colEdge = this.dimensions.y
    const canMove = []
    const outOfBounds = (i, j) => {
      return !((i >= 0 && i < rowEdge) &&
      (j >= 0 && j < colEdge))
    }

    // down-left
    for (let j = y + 1, i = x - 1; j < colEdge, i >= 0; j++, i--) {
      if (outOfBounds(i, j)) {
        break
      }
      let occupied = board[i][j]
      if (occupied) {
        if (occupied.enemy) {
          canMove.push({ row: i, col: j })
        }
        break;
      }
      canMove.push({ row: i, col: j })
    }

    // down-right
    for (let j = y + 1, i = x + 1; j < colEdge, i < rowEdge; j++, i++) {
      if (outOfBounds(i, j)) {
        break
      }
      let occupied = board[i][j]
      if (occupied) {
        if (occupied.enemy) {
          canMove.push({ row: i, col: j })
        }
        break;
      }
      canMove.push({ row: i, col: j })
    }

    // up-left
    for (let j = y - 1, i = x - 1; j >= 0, i >= 0; j--, i--) {
      if (outOfBounds(i, j)) {
        break
      }
      let occupied = board[i][j]
      if (occupied) {
        if (occupied.enemy) {
          canMove.push({ row: i, col: j })
        }
        break;
      }
      canMove.push({ row: i, col: j })
    }

    // up-right
    for (let j = y - 1, i = x + 1; j >= 0, i < rowEdge; j--, i++) {
      if (outOfBounds(i, j)) {
        break
      }
      let occupied = board[i][j]
      if (occupied) {
        if (occupied.enemy) {
          canMove.push({ row: i, col: j })
        }
        break;
      }
      canMove.push({ row: i, col: j })
    }
    return canMove
  },
  queen({ x, y }, board) {
    return this.rook({ x, y }, board).concat(
      this.bishop({ x, y }, board)
    )
  },
  king({ x, y }, board) {
    const rowEdge = this.dimensions.x
    const colEdge = this.dimensions.y
    const canMove = []
    const outOfBounds = (i, j) => {
      return !((i >= 0 && i < rowEdge) &&
      (j >= 0 && j < colEdge))
    }
    // square pattern
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (outOfBounds(i, j)) {
          continue
        }
        let occupied = board[i][j]
        let ally = occupied && occupied.enemy !== true
        if ((i === x && j === y) || ally) {
          continue
        }
        canMove.push({ row: i, col: j })
      }
    }
    return canMove
  },
}

export const pieceTypes = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king']

const pawns = []
for (let i = 0; i < dimensions.x; i++) {
  pawns.push({ type: 'pawn', pos: { row: 1, col: i } })
}
const player2Pawns = pawns
const player1Pawns = pawns.map((pawn, ind) => {
  const newPawn = { type: pawn.type }
  newPawn.pos= { row: dimensions.y - 2, col: ind };
  return newPawn
})
const player2Royals = [
  { type: 'rook', pos: { col: 0, row: 0 }},
  { type: 'knight', pos: { col: 1, row: 0 }},
  { type: 'bishop', pos: { col: 2, row: 0 }},
  { type: 'queen', pos: { col: 3, row: 0 }},
  { type: 'king', pos: { col: 4, row: 0 }},
  { type: 'bishop', pos: { col: 5, row: 0 }},
  { type: 'knight', pos: { col: 6, row: 0 }},
  { type: 'rook', pos: { col: 7, row: 0 }},
]
const player1Royals = player2Royals.reverse().map((piece, ind) => {
  const newPiece = { type: piece.type }
  newPiece.pos = { row: dimensions.y - 1, col: ind };
  return newPiece
})

export const startingPositions = {
  player1: player1Pawns.concat(player1Royals),
  player2: player2Pawns.concat(player2Royals)
}