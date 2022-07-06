import React, { useEffect, useState } from 'react'
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
const DropDownHeaderTitle = styled('div')`
  border-bottom: 1px solid #e5e5e5;
  width: 100%
`
const DropDownListContainer = styled('div')`
  position: absolute;
  z-index: 1;
`

const DropDownList = styled('ul')`
  margin: 0;
  padding: 0;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
  display: flex;
  flex-direction: column;
`
const DropDownListItem = styled('li')`
  padding-left: 0.5em;
  padding-right: 0.5em;
  list-style: none;
  margin-bottom: 0.8em;
  :hover {
    background-color: rgba(0, 0, 0, 0.15)
  }
  cursor: pointer;
`
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

  const [isFocused, setIsFocused] = useState(false)
  const [hasSet, setHasSet] = useState(false)
  const [id, _] = useState('' + Math.random())
  if (!hasSet) {
    window.addEventListener('click', (e) => {
      const par = document.getElementById(id)
      if (!par) { return }
      if (e.target !== window && par.contains(e.target)) {
        setIsFocused(true)
      } else {
        setIsFocused(false)
        setIsOpen(false)
      }
    })
    setHasSet(true)
  }
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
    <DropDownContainer id={id} onClick={(e) => {
      toggle()
      setIsFocused(true)
    }}>
      <DropDownHeader>
        <DropDownHeaderTitle>
          Select {title}: 
        </DropDownHeaderTitle>
        {
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