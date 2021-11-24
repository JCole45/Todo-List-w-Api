import React from "react"
import Todo from "../Components/Todo"
import {render} from "@testing-library/react"
import { shallow, mount } from "enzyme"
import toJSON from "enzyme-to-json"
import { Provider } from 'react-redux'
import store from "../store"
//  @@ shallow renders the component without the child Components
//  @@ mount renders the componet along with the child components



describe("This suit tests the Login component", () => {

    it("renders without crashing", () => {
        mount(<Provider store={store}> <Todo/>  </Provider>);
    })

    it("Has Todo in Header", () => {
        const wrapper = mount(<Provider store={store}> <Todo/>  </Provider>)
        expect(wrapper.contains("Todo")).toEqual(true)
        console.log(wrapper)
    })
})
