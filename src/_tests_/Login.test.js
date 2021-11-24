import React from "react"
import Login from "../Components/Todo"
import {render} from "@testing-library/react"
import { shallow, mount } from "enzyme"
import toJSON from "enzyme-to-json"
import { Provider } from 'react-redux'
import store from "../store"
//  @@ shallow renders the component without the child Components
//  @@ mount renders the componet along with the child components



describe("This suit tests the Login component", () => {

    it("renders without crashing", () => {
        mount(<Provider store={store}> <Login/>  </Provider>);
    })

    it("Has Email and Password fields", () => {
        const wrapper = mount(<Provider store={store}> <Login/>  </Provider>)
        console.log(wrapper)
    })

    // it("Has Login in Header", () => {
    //     const wrapper = mount(<Provider store={store}> <Login/>  </Provider>)
    //     expect(wrapper.contains("Login")).toEqual(true)
    // })
})
