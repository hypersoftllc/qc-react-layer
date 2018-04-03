/* eslint-env jest */
/* eslint padded-blocks: "off" */

import React from 'react'
import TestRenderer from 'react-test-renderer'

import Layer from '../Layer'


describe('Layer', () => {

  it('should be a function', () => {
    expect(typeof Layer).toBe('function')
  })

  it('should be a functional component', () => {
    let comp

    comp = TestRenderer.create(
      <Layer/>
    )

    // Functional components don't have instances.
    expect(comp.getInstance()).toBe(null)
  })

  describe('rendered', () => {

    describe('with no props', () => {

      it('should use default props', () => {
        let comp, tree

        comp = TestRenderer.create(
          <Layer/>
        )

        tree = comp.toJSON()
        expect(tree).toMatchSnapshot()
      })

    })

    describe('with children', () => {

      it('should render children', () => {
        let comp, tree

        comp = TestRenderer.create(
          <Layer>
            <span>Child</span>
          </Layer>
        )

        tree = comp.toJSON()
        expect(tree).toMatchSnapshot()
      })

    })

    describe('with className', () => {

      it('should render with expected class attribute', () => {
        let comp, tree

        comp = TestRenderer.create(
          <Layer className="Foo"/>
        )

        tree = comp.toJSON()
        expect(tree).toMatchSnapshot()
      })

    })

    describe('with compClassName', () => {

      it('should render with expected class attribute', () => {
        let comp, tree

        comp = TestRenderer.create(
          <Layer compClassName=""/>
        )

        tree = comp.toJSON()
        expect(tree).toMatchSnapshot()

        comp = TestRenderer.create(
          <Layer className="foo" compClassName=""/>
        )

        tree = comp.toJSON()
        expect(tree).toMatchSnapshot()

        comp = TestRenderer.create(
          <Layer className="foo" compClassName="layer"/>
        )

        tree = comp.toJSON()
        expect(tree).toMatchSnapshot()
      })

    })

  })

})
