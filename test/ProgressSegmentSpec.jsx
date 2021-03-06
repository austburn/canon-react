import ProgressSegment from '../transpiled/ProgressSegment';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe('ProgressSegment', () => {
  let progressSegment;

  beforeEach(() => {
    progressSegment = TestUtils.renderIntoDocument(
      <ProgressSegment/>
    );
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(progressSegment).parentNode);
  });

  it('renders the segment with the given width', () => {
    let progressSegment;

    progressSegment = TestUtils.renderIntoDocument(
      <ProgressSegment width={50} />
    );
    progressSegment = TestUtils.findRenderedDOMComponentWithClass(progressSegment, 'rs-segment');

    expect(progressSegment.props.style).toEqual({ 'width': '50%' });
  });

  it('does not render a caption if there are no children', () => {
    progressSegment = TestUtils.renderIntoDocument(
      <ProgressSegment width={100} />
    );
    const caption = TestUtils.scryRenderedDOMComponentsWithClass(progressSegment, 'rs-caption');

    expect(caption.length).toBe(0);
  });

  it('renders a caption of there are children', () => {
    progressSegment = TestUtils.renderIntoDocument(
      <ProgressSegment width={100}>
        caption
      </ProgressSegment>
    );
    const caption = TestUtils.findRenderedDOMComponentWithClass(progressSegment, 'rs-caption');

    expect(ReactDOM.findDOMNode(caption).textContent).toBe('caption');
  });

  describe('status bar', () => {
    let statusBar;

    const renderWithStatus = (status) => {
      progressSegment = TestUtils.renderIntoDocument(<ProgressSegment status={status} />);
      statusBar = TestUtils.findRenderedDOMComponentWithClass(progressSegment, 'rs-bar');
    };

    it('defaults to empty status', () => {
      statusBar = TestUtils.findRenderedDOMComponentWithClass(progressSegment, 'rs-bar');

      expect(ReactDOM.findDOMNode(statusBar)).toHaveClass('rs-bar');
    });

    it('renders with an ok status', () => {
      renderWithStatus('ok');

      expect(ReactDOM.findDOMNode(statusBar)).toHaveClass('rs-status-ok');
    });

    it('renders with an error status', () => {
      renderWithStatus('error');

      expect(ReactDOM.findDOMNode(statusBar)).toHaveClass('rs-status-error');
    });

    it('renders with a warning status', () => {
      renderWithStatus('warning');

      expect(ReactDOM.findDOMNode(statusBar)).toHaveClass('rs-status-warning');
    });

    it('renders with an info sttaus', () => {
      renderWithStatus('info');

      expect(ReactDOM.findDOMNode(statusBar)).toHaveClass('rs-status-info');
    });
  });

  describe('type', () => {
    let statusBar;

    const renderWithType = (type) => {
      progressSegment = TestUtils.renderIntoDocument(<ProgressSegment type={type} />);
      statusBar = TestUtils.findRenderedDOMComponentWithClass(progressSegment, 'rs-bar');
    };

    it('defaults to empty', () => {
      statusBar = TestUtils.findRenderedDOMComponentWithClass(progressSegment, 'rs-bar');

      expect(ReactDOM.findDOMNode(statusBar)).toHaveClass('rs-bar');
    });

    it('renders with a solid type', () => {
      renderWithType('solid');

      expect(ReactDOM.findDOMNode(statusBar)).toHaveClass('rs-bar-solid');
    });

    it('renders with a striped type', () => {
      renderWithType('striped');

      expect(ReactDOM.findDOMNode(statusBar)).toHaveClass('rs-bar-striped');
    });
  });
});
