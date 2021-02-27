import { useState } from 'react'
import styled from 'styled-components'

const DropDownContainer = styled('div')`
  width: 15em;
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

export const AndelaDropDown = ({ listItems }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const [selectedOption, setSelectedOption] = useState(listItems[0])
  const onOptionClicked = value => {
    setSelectedOption(value)
    setIsOpen(false)
  }

  const renderedItems = listItems.map((item) => (
    <DropDownListItem key={item}
      onClick={() => onOptionClicked(item)}>
      {item}
    </DropDownListItem>
  ))
  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggle}>
        {selectedOption}
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {renderedItems}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  )
}