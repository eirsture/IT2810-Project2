import React from 'react'
import renderer from 'react-test-renderer';
import { create, act } from "react-test-renderer";
import App from "../src/App.js";
import CustomSvg from '../src/components/CustomSvg.js';
import ButtonRow from '../src/components/ButtonRow.js';
import SidebarContent from '../src/components/sidebarContent.js';
import SidebarSection from '../src/components/sidebarSection.js';

describe("Button Row component", ()=> {
it('renders correctly', () => {
    const tree = renderer
      .create(<ButtonRow/>)
      .toJSON();
    console.log(tree)
    expect(tree).toMatchSnapshot();
  });
it('is correct type', ()=> {
    const tree = renderer
    .create(<ButtonRow/>)
    .toJSON();
    expect(tree.type).toBe('div'); 
    });
});

describe("Sidebar section", ()=> {
    it('renders correctly', () => {
        const tree = renderer
          .create(<SidebarSection categories={["Cat", "Dog", "Horse"]}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('is correct type', ()=> {
        const tree = renderer
        .create(<SidebarSection categories={["Cat", "Dog", "Horse"]}/>)
        .toJSON();
        expect(tree.type).toBe('div'); 
    });
});

describe("Sidebar content", ()=> {
    it('renders correctly', () => {
        const tree = renderer
            .create(<SidebarContent categories={["Cat", "Dog", "Horse"]}/>)
            .toJSON();
        console.log(tree)
        expect(tree).toMatchSnapshot();
        });
    it('contains sidebar content', ()=> {
        const tree = renderer
        .create(<SidebarContent categories={["Cat", "Dog", "Horse"]}/>)
        .toJSON();
        console.log(tree.children)
        expect(tree.children).toHaveLength(3)
    });
});