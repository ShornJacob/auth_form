//https://testing-library.com/docs/react-testing-library/example-intro#step-by-step
import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignUp from '../SignUp'
import MutationObserver from 'mutationobserver-shim'

test('loads and displays greeting', async () => {
//https://testing-library.com/docs/react-testing-library/example-intro#arrange
//Arrange
const { getByLabelText, getByRole, getByText} = render(
  <SignUp/>
)

//Act
//https://testing-library.com/docs/dom-testing-library/api-events

fireEvent.change(getByLabelText(/email/i), { target: { value: 'shorn' } })

fireEvent.click(getByRole('button'))


//Assert
const errorDisplayNode = await waitForElement(() => getByText(/email not valid./i))

})