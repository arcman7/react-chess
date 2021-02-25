import { canMove } from './gameLogic'

const rowEdge = canMove.dimensions.x
const colEdge = canMove.dimensions.y

describe('canMove', () => {
  let board
  beforeEach(() => {
    board = []
    for (let i = 0; i < 8; i++) {
      board.push(Array(8).fill(null))
    }
  })
  describe('pawn', () => {
    let pos
    let positions
    beforeEach(() => {
      pos = { x: rowEdge - 1, y: 4 }

    })
    test('can move forward', () => {
      positions = canMove.pawn(pos, board)
      expect(positions.length).toBe(1)
      expect(positions[0].row).toBe(rowEdge - 2)
      expect(positions[0].col).toBe(pos.y)
    })
    test('can not move straight through enemy or ally', () => {
      board[pos.x - 1][pos.y] = { enemy: true }
      positions = canMove.pawn(pos, board)
      expect(positions.length).toBe(0)
      board[pos.x - 1][pos.y] = { enemy: false }
      positions = canMove.pawn(pos, board)
      expect(positions.length).toBe(0)
    })
    test('can attack enemy to diagonal left and right', () => {
      // block path directly forward
      board[pos.x - 1][pos.y] = { enemy: true }
      // add enemy to left
      board[pos.x - 1][pos.y - 1] = { enemy: true }
      positions = canMove.pawn(pos, board)
      expect(positions.length).toBe(1)
      expect(positions[0].row).toBe(pos.x - 1)
      expect(positions[0].col).toBe(pos.y - 1)
      // block path to left
      board[pos.x - 1][pos.y - 1] = { enemy: false }
      // add enemy to right
      board[pos.x - 1][pos.y + 1] = { enemy: true }
      positions = canMove.pawn(pos, board)
      expect(positions.length).toBe(1)
      expect(positions[0].row).toBe(pos.x - 1)
      expect(positions[0].col).toBe(pos.y + 1)
      // should be able to attack both
      board[pos.x - 1][pos.y - 1] = { enemy: true }
      positions = canMove.pawn(pos, board)
      expect(positions.length).toBe(2)
    })
  })
  describe('rook', () => {
    test('can freely move in cardinal directions', () => {
      let pos = { x: 3, y: 4 }
      let positions
      // 4 up, 3 down, 3 right, 4 left
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(14)
    })
    test('can move in straight lines', () => {
      let pos
      let positions

      // bottom left
      pos = { x: rowEdge - 1, y: 0 }
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(14)
      
      // bottom right
      pos = { x: rowEdge - 1, y: colEdge - 1 }
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(14)
      
      // top left
      pos = { x: 0, y: 0 }
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(14)
      
      // top right
      pos = { x: 0, y: colEdge - 1 }
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(14)
    })
    test('can not move through allies', () => {
      let pos
      let fill
      let positions

      pos = { x: 4, y: 3 }
      fill = [
        { row: pos.x + 1, col: pos.y },
        { row: pos.x - 1, col: pos.y },
        { row: pos.x, col: pos.y - 1},
        { row: pos.x, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(0)

      pos = { x: 4, y: 4 }
      fill = [
        { row: pos.x + 1, col: pos.y },
        { row: pos.x - 1, col: pos.y },
        { row: pos.x, col: pos.y - 1},
        { row: pos.x, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(0)

      pos = { x: 3, y: 4 }
      fill = [
        { row: pos.x + 1, col: pos.y },
        { row: pos.x - 1, col: pos.y },
        { row: pos.x, col: pos.y - 1},
        { row: pos.x, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(0)

      pos = { x: 3, y: 3 }
      fill = [
        { row: pos.x + 1, col: pos.y },
        { row: pos.x - 1, col: pos.y },
        { row: pos.x, col: pos.y - 1},
        { row: pos.x, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(0)
    })
    test('can not move past enemies', () => {
      let pos
      let fill
      let positions

      pos = { x: 4, y: 3 }
      fill = [
        { row: pos.x + 1, col: pos.y },
        { row: pos.x - 1, col: pos.y },
        { row: pos.x, col: pos.y - 1},
        { row: pos.x, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(4)

      pos = { x: 4, y: 4 }
      fill = [
        { row: pos.x + 1, col: pos.y },
        { row: pos.x - 1, col: pos.y },
        { row: pos.x, col: pos.y - 1},
        { row: pos.x, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(4)

      pos = { x: 3, y: 4 }
      fill = [
        { row: pos.x + 1, col: pos.y },
        { row: pos.x - 1, col: pos.y },
        { row: pos.x, col: pos.y - 1},
        { row: pos.x, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(4)

      pos = { x: 3, y: 3 }
      fill = [
        { row: pos.x + 1, col: pos.y },
        { row: pos.x - 1, col: pos.y },
        { row: pos.x, col: pos.y - 1},
        { row: pos.x, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.rook(pos, board)
      expect(positions.length).toBe(4)
    })
  })
  describe('knight', () => {
    let pos
    let positions
    beforeEach(() => {
      pos = { x: rowEdge - 4, y: 4}
    })
    test('it can move to eight different L-positions', () =>{
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(8)
      function getDist(a, b) {
        return Math.sqrt((a.x - b.row)**2 + (a.y - b.col)**2)
      }
      const sqrt5 = Math.sqrt(5)
      for (let i = 0; i < positions.length; i++) {
        expect(getDist(pos, positions[i])).toBe(sqrt5)
      }
    })
    test('it can move to only two locations from a map corner', () => {
      // bottom left
      pos = { x: rowEdge - 1, y: 0 }
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      
      // bottom right
      pos = { x: rowEdge - 1, y: colEdge - 1 }
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      
      // top left
      pos = { x: 0, y: 0 }
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      
      // top right
      pos = { x: 0, y: colEdge - 1 }
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
    })
    test('it can attack to only two locations from a map corner', () => {
      // bottom left
      pos = { x: rowEdge - 1, y: 0 }
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      positions.forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      
      // bottom right
      pos = { x: rowEdge - 1, y: colEdge - 1 }
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      positions.forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      
      // top left
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      positions.forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      
      // top right
      pos = { x: 0, y: colEdge - 1 }
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      positions.forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
    })
    test('it can not attack allies', () => {
      // bottom left 
      pos = { x: rowEdge - 1, y: 0 }
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      positions.forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(0)
      
      // bottom right
      pos = { x: rowEdge - 1, y: colEdge - 1 }
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      positions.forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(0)
      
      // top left
      pos = { x: 0, y: 0 }
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      positions.forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(0)
      
      // top right
      pos = { x: 0, y: colEdge - 1 }
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(2)
      positions.forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.knight(pos, board)
      expect(positions.length).toBe(0)
    })
  })
  describe('bishop', () => {
    test('it can move in four diagonal cardinal directions', () => {
      let pos
      let positions

      // bottom left 
      pos = { x: rowEdge - 1, y: 0 }
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(7)

      // bottom right
      pos = { x: rowEdge - 1, y: colEdge - 1 }
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(7)

      // top left
      pos = { x: 0, y: 0 }
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(7)

      // top right
      pos = { x: 0, y: colEdge - 1 }
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(7)
    })
    test('it can move in X from board center', () => {
      let pos
      let positions

      pos = { x: 4, y: 3 }
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(13)

      pos = { x: 4, y: 4}
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(13)

      pos = { x: 3, y: 4 }
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(13)

      pos = { x: 3, y: 3 }
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(13)
    })
    test('it can not move past enemies', () => {
      let pos
      let fill
      let positions

      pos = { x: 4, y: 3 }
      fill = [
        { row: pos.x + 1, col: pos.y + 1},
        { row: pos.x - 1, col: pos.y - 1},
        { row: pos.x + 1, col: pos.y - 1},
        { row: pos.x - 1, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(4)

      pos = { x: 4, y: 4 }
      fill = [
        { row: pos.x + 1, col: pos.y + 1},
        { row: pos.x - 1, col: pos.y - 1},
        { row: pos.x + 1, col: pos.y - 1},
        { row: pos.x - 1, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(4)

      pos = { x: 3, y: 4 }
      fill = [
        { row: pos.x + 1, col: pos.y + 1},
        { row: pos.x - 1, col: pos.y - 1},
        { row: pos.x + 1, col: pos.y - 1},
        { row: pos.x - 1, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(4)

      pos = { x: 3, y: 3 }
      fill = [
        { row: pos.x + 1, col: pos.y + 1},
        { row: pos.x - 1, col: pos.y - 1},
        { row: pos.x + 1, col: pos.y - 1},
        { row: pos.x - 1, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: true }
      })
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(4)
    })
    test('it can not move through allies', () => {
      let pos
      let fill
      let positions

      pos = { x: 4, y: 3 }
      fill = [
        { row: pos.x + 1, col: pos.y + 1},
        { row: pos.x - 1, col: pos.y - 1},
        { row: pos.x + 1, col: pos.y - 1},
        { row: pos.x - 1, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(0)

      pos = { x: 4, y: 4}
      fill = [
        { row: pos.x + 1, col: pos.y + 1},
        { row: pos.x - 1, col: pos.y - 1},
        { row: pos.x + 1, col: pos.y - 1},
        { row: pos.x - 1, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(0)

      pos = { x: 3, y: 4 }
      fill = [
        { row: pos.x + 1, col: pos.y + 1},
        { row: pos.x - 1, col: pos.y - 1},
        { row: pos.x + 1, col: pos.y - 1},
        { row: pos.x - 1, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(0)

      pos = { x: 3, y: 3 }
      fill = [
        { row: pos.x + 1, col: pos.y + 1},
        { row: pos.x - 1, col: pos.y - 1},
        { row: pos.x + 1, col: pos.y - 1},
        { row: pos.x - 1, col: pos.y + 1},
      ].forEach(({ row, col }) => {
        board[row][col] = { enemy: false }
      })
      positions = canMove.bishop(pos, board)
      expect(positions.length).toBe(0)
    })
  })
  describe('queen', () => {
    test('is bad ass', () => {
      let pos
      let positions
      let bishopPos
      let rookPos

      pos = { x: 4, y: 3 }
      bishopPos = canMove.bishop(pos, board)
      rookPos = canMove.rook(pos, board)
      positions = canMove.queen(pos, board)
      expect(positions.length).toBe(rookPos.length + bishopPos.length)
      
      pos = { x: 4, y: 4 }
      bishopPos = canMove.bishop(pos, board)
      positions = canMove.queen(pos, board)
      expect(positions.length).toBe(rookPos.length + bishopPos.length)

      pos = { x: 3, y: 4 }
      bishopPos = canMove.bishop(pos, board)
      rookPos = canMove.rook(pos, board)
      positions = canMove.queen(pos, board)
      expect(positions.length).toBe(rookPos.length + bishopPos.length)

      pos = { x: 3, y: 3}
      bishopPos = canMove.bishop(pos, board)
      rookPos = canMove.rook(pos, board)
      positions = canMove.queen(pos, board)
      expect(positions.length).toBe(rookPos.length + bishopPos.length)
    })
  })
  describe('king', () => {
    test('can only move within board bounds', () => {
      let pos
      let positions

      // bottom left 
      pos = { x: rowEdge - 1, y: 0 }
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(3)

      // bottom right
      pos = { x: rowEdge - 1, y: colEdge - 1 }
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(3)

      // top left
      pos = { x: 0, y: 0 }
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(3)

      // top right
      pos = { x: 0, y: colEdge - 1 }
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(3)
    })
    test('can move in square pattern', () => {
      let pos
      let positions

      pos = { x: 4, y: 3 }
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(8)

      pos = { x: 4, y: 4}
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(8)

      pos = { x: 3, y: 4 }
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(8)

      pos = { x: 3, y: 3 }
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(8)
    })
    test('can attack in square pattern', () => {
      let pos
      let fill
      let positions
      const boardCopy = JSON.stringify(board)
      const surround = (pos) => {
        for (let i = pos.x - 1; i <= pos.x + 1; i++) {
          for (let j = pos.y - 1; j <= pos.y + 1; j++) {
            board[i][j] = { enemy: true }
          }
        }
      }

      pos = { x: 3, y: 3 }
      surround(pos)
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(8)

      pos = { x: 4, y: 4}
      board = JSON.parse(boardCopy)
      surround(pos)
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(8)
    })
    test('can not attack allies', () => {
      let pos
      let fill
      let positions
      const boardCopy = JSON.stringify(board)
      const surround = (pos) => {
        for (let i = pos.x - 1; i <= pos.x + 1; i++) {
          for (let j = pos.y - 1; j <= pos.y + 1; j++) {
            board[i][j] = { enemy: false }
          }
        }
      }

      pos = { x: 3, y: 3 }
      surround(pos)
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(0)

      pos = { x: 4, y: 4}
      board = JSON.parse(boardCopy)
      surround(pos)
      positions = canMove.king(pos, board)
      expect(positions.length).toBe(0)
    })
  })
})