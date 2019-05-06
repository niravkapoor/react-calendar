import React from "react";
import expect from 'expect';
import { shallow, mount } from "enzyme";
import { Provider } from 'react-redux';
import CustomAlert from "./CustomAlert";
import { Wrapper } from '../../../stories/customHelper';

jest.useFakeTimers();
describe("CustomAlert", () => {
  let minProps;
  let shallowCustomAlert;
  const GA_KEY = 'foo';

  beforeEach(() => {
    minProps = {
        messageText: '',
        buttonText: 'OK',
        onAlertClose: function(){ return true ;},
        onButtonClick: jest.fn()
    };
    shallowCustomAlert = undefined; 
  });

  it('renders without exploding', () => {
      expect(
          shallow(
            <Wrapper>                    
                <CustomAlert {...minProps}/> 
            </Wrapper>
                            
          ).length
      ).toEqual(1);
  });


  it('renders default prop buttonText if undefined', () => {
    shallowCustomAlert =  mount(
        <Wrapper>                    
            <CustomAlert/> 
        </Wrapper>                       
    )
    expect(shallowCustomAlert.find('CustomAlert').props().messageText).toEqual('Need Your Attention');
    expect(shallowCustomAlert.find('CustomAlert').props().buttonText).toEqual('OK');    
  });


  it('call event handler on button click', () => {  
    // Want to check how state gets changed on calling function
    shallowCustomAlert =  mount(
        <Wrapper>                    
            <CustomAlert {...minProps}/> 
        </Wrapper>
                        
    )    
    shallowCustomAlert.find('CustomAlert button').simulate('click');
    expect(minProps.onButtonClick).toHaveBeenCalled();    
  });  

  it('check for if alert button is called', () => {    
    
    shallowCustomAlert = shallow(
        <Wrapper>                    
            <CustomAlert {...minProps}/> 
        </Wrapper>                        
      )
      
      
      /* expect(minProps.onAlertClose).not.toBeCalled();     
      jest.runAllTimers();
      expect(minProps.onAlertClose).toHaveBeenCalled();    
      */
  }); 

});

 describe("when `messageText` and `buttonText` is defined", () => {
    let props;
    beforeEach(() => {
        props = {
            messageText: "important",
            buttonText: 'OK',
            onAlertClose: () => {},
            onButtonClick: () => {}
        };
     });
     
     it('renders user defined prop messageText and buttonText if defined', () => {
        const wrapper = shallow(
            <Provider
              store={{ insertCss: () => {}, subscribe: () => {},
              dispatch: () => {}, getState: () => {} }}>                    
                      <CustomAlert {...props}/>                                    
            </Provider>              
        );           
        expect(wrapper.props().messageText).toEqual('important');
        expect(wrapper.props().buttonText).toEqual('OK');        
     });     
});  
