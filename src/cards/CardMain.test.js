import CardMain from './CardMain.js';
import axios from "axios";
import { shallow } from 'enzyme';


jest.mock('axios');


const data = [{
    name: "Test",
    response: true
}];

test("good response", ()=>{
    axios.get.mockImplementation(()=>{
        Promise.resolve({status:200, data})
        .then(response => {
            expect(response).toEqual(data);
        })
    })
});

test("bad response", ()=>{
    axios.get.mockImplementation(()=>{
        Promise.reject({status: "bad response"})
    });
});

test("Checking callback function", () => {
    Promise.resolve({status:200,data})
    .then(res => {
        const cardmain = shallow(<CardMain/>);
        const spy = jest.spyOn(cardmain.instance(), "searchTrigger");
        expect(spy).resolve.toHaveBeenCalled()
    })
})

it ("should render correctly with no props", () => {
    const component = shallow(<CardMain/>);
    expect (component).toMatchSnapshot();
    expect(component.find("#mainId").exists()).toBeTruthy()
  });









    


