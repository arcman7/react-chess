import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const DropDownContainer = styled('div')`
  width: 16em;
  margin: 0 auto;
  background: #f0f0f0;
`
const DropDownHeader = styled('div')`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
  cursor: pointer;
`
const DropDownListContainer = styled('div')`
  position: absolute;
  z-index: 1;
`

const DropDownList = styled('ul')`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`
const DropDownListItem = styled('li')`
  width: 100%;
  list-style: none;
  margin-bottom: 0.8em;
  :hover {
    background-color: rgba(0, 0, 0, 0.15)
  }
  cursor: pointer;
`
const refHolder = {}
export const LRDropDown = ({ listItems, title, selectCB, selectMultiple  = false }) => {
  const [list, setList] = useState(listItems.map((item) => {
    if (title) {
      return {
        title: item, seleceted: false,   
      }
    }
  }))
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const uniqueId = '' + Math.random()
  let myRef
  const [isFocused, setIsFocused] = useState(false)
  let myBool
  const [hasSet, setHasSet] = useState(false)
  const [id, _] = useState('' + Math.random())
  if (!hasSet) {
    window.addEventListener('click', (e) => {
      console.log('\n\n========')
      // console.log('WINDOW click here 0')
      const par = document.getElementById(id)
      if(!par) { return }
      if (e.target !== window && par.contains(e.target)) {
        console.log('WINDOW click - setting true for ', id)
        // if (isOpen && isFocused) {
        //   setIsOpen(false)
        //   setIsFocused(false)
        //   return
        // }
        setIsFocused(true)
      } else {
        console.log('WINDOW click - setting false for ', id)
        setIsFocused(false)
        setIsOpen(false)
      }
    })
    setHasSet(true)
  }
  // useEffect(() => {
  //   if (isFocused) {

  //   }
  //   setIsOpen(isFocused)
  // }, [isFocused])
  // window.addEventListener('click', windowOnClick)
  // let windowOnClick
  // useEffect(() => {
  //   console.log(myRef)
  //   if (!hasSet) {
  //     refHolder[uniqueId] = myRef
  //      windowOnClick = (e) => {
  //       // console.log(document.activeElement)
  //       // setIsFocused(node === document.activeElement)
  //       // node = ReactDOM.findDOMNode(this)
  //       // node = myRef
  //       const n = refHolder[uniqueId]
  //       setIsFocused(n.contains(e.target))
  //     }
  //     window.addEventListener('click', windowOnClick)
  //     setHasSet(true)
  //   }
  //   return () => {
  //     window.removeEventListener('click', windowOnClick)
  //   }
  // }, [])

  const [selected, setSelected] = useState([list[0].title])
  const onSelect = (itemClicked) => {
    if (selectMultiple) {
      itemClicked.seleceted = !itemClicked.seleceted
      setSelected(
        list.filter(item => item.seleceted).map(item => item.title)
      )
    } else {
      itemClicked.seleceted = true
      setSelected([itemClicked.title])
    }
    selectCB(selected)
    setIsOpen(false)
  }

  const renderedItems = list.map((item) => (
    <DropDownListItem key={item.title}
      onClick={() => onSelect(item)}>
      {item.title}
    </DropDownListItem>
  ))



  return (
    <DropDownContainer id={id} ref={(me) => { myRef = me }} onClick={(e) => {
      // myBool = false
      // console.log('isFocused: ', myBool)
      
      // e.stopPropagation()
      toggle()
      setIsFocused(true)
      console.log('COMPONENT on click for :' + id + '\n', { isFocused, isOpen})
    }}>
      <DropDownHeader onClick={() => {}}>
        Select {title}: {
          selected.length > 1 ? selected.length : selected[0]
        }
      </DropDownHeader>
      {isOpen && isFocused && (
        <DropDownListContainer>
          <DropDownList>
            {renderedItems}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  )
}