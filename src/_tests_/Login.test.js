import React from "react"
import Login from "../Components/Login"
import {render, fireEvent, waitFor, screen} from "@testing-library/react"
import { shallow, mount } from "enzyme"
import toJSON from "enzyme-to-json"
import { Provider } from 'react-redux'
import store from "../store"
import {userLoginReducer} from "../Reducer/userReducer"


//  @@ shallow renders the component without the child Components
//  @@ mount renders the componet along with the child components

describe("This suit tests the Login component", () => {

    it("renders without crashing", () => {
        mount(<Provider store={store}> <Login/>  </Provider>);
    })

    it("Has Email and Password fields", async () => {

        const wrapper = render(<Provider store={store}> <Login/>  </Provider>)

        console.log(userLoginReducer)

        const emailField = wrapper.getByTestId("email")
        const passwordField = wrapper.getByTestId("password")
        const submitButton = wrapper.getByTestId("submit-button")

        fireEvent.change(emailField, {target: {value:"johncoleman951@gmail.com" }})
        fireEvent.change(passwordField, {target: {value:"Test@1234" }})
        fireEvent.click(submitButton)

        const successMessage = await waitFor(() => wrapper.getByTestId('success_message'));
        expect(successMessage).toBeTruthy()

    })    

    // it("Has Login in Header", () => {
    //     const wrapper = mount(<Provider store={store}> <Login/>  </Provider>)
    //     expect(wrapper.contains("Login")).toEqual(true)
    // })
})
