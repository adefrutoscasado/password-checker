// import './style.css';

import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';
import PropTypes from 'prop-types';

const isTooShort = (password, minLength) => password.length < minLength;

export default class ReactPasswordStrength extends Component {
  constructor(props) {
    super(props);
    this.scoreRef = React.createRef();
  }
  // static propTypes = {
  //   changeCallback: PropTypes.func,
  //   className: PropTypes.string,
  //   defaultValue: PropTypes.string,
  //   inputProps: PropTypes.object,
  //   minLength: PropTypes.number,
  //   minScore: PropTypes.number,
  //   namespaceClassName: PropTypes.string,
  //   scoreWords: PropTypes.array,
  //   style: PropTypes.object,
  //   tooShortWord: PropTypes.string,
  //   userInputs: PropTypes.array,
  // }

  static defaultProps = {
    changeCallback: null,
    className: '',
    defaultValue: '',
    minLength: 5,
    minScore: 2,
    namespaceClassName: 'ReactPasswordStrength',
    scoreWords: ['very weak', 'weak', 'okay', 'good', 'strong'],
    tooShortWord: 'too short',
    userInputs: [],
  }

  state = {
    score: 0,
    isValid: false,
    password: '',
  }

  componentDidMount() {
    const { defaultValue } = this.props;

    if (defaultValue.length > 0) {
      this.setState({ password: defaultValue }, this.handleChange);
    }
  }

  clear = () => {
    const { changeCallback } = this.props;

    this.setState({
      score: 0,
      isValid: false,
      password: '',
    }, () => {
      this.reactPasswordStrengthInput.value = '';

      if (changeCallback !== null) {
        changeCallback(this.state);
      }
    });
  }

  scoreChanged() {
    console.log('score chnaged')
  }

  // TODO: Review this, please
  virtualScoreInput() {
    return this.scoreRef.current
  }

  handleChange = ({target}) => {
    console.log(target)
    const { changeCallback, minScore, userInputs, minLength } = this.props;
    const password = this.reactPasswordStrengthInput.value;

    let score = 0;
    let result = null;

    // always sets a zero score when min length requirement is not met
    // avoids unnecessary zxcvbn computations (CPU intensive)
    if (isTooShort(password, minLength) === false) {
      result = zxcvbn(password, userInputs);
      score = result.score;
    }

    this.setState({
      isValid: score >= minScore,
      password,
      score,
    }, () => {
      if (changeCallback !== null) {
        changeCallback(this.state, result);
      }
    });
    
    this.props.fireChange(target)
    this.props.fireChange(this.virtualScoreInput())
  }

  render() {
    const { score, password, isValid } = this.state;
    const {
      className,
      inputProps,
      minLength,
      namespaceClassName,
      scoreWords,
      style,
      tooShortWord,
    } = this.props;

    const inputClasses = [ `${namespaceClassName}-input` ];
    const wrapperClasses = [
      namespaceClassName,
      className ? className : '',
      password.length > 0 ? `is-strength-${score}` : '',
    ];
    const strengthDesc = (
      isTooShort(password, minLength)
      ? tooShortWord
      : scoreWords[score]
    );

    if (isValid === true) {
      inputClasses.push('is-password-valid');
    } else if (password.length > 0) {
      inputClasses.push('is-password-invalid');
    }

    if (inputProps && inputProps.className) {
      inputClasses.push(inputProps.className);
    }

    return (
      <div className={wrapperClasses.join(' ')} style={style}>
        <input
          name="password"
          type="password"
          {...inputProps}
          className={inputClasses.join(' ')}
          onChange={this.handleChange}
          ref={ref => this.reactPasswordStrengthInput = ref}
          value={password}
        />
        <input
          name="score"
          type="hidden"
          ref={this.scoreRef}
          value={score}
        />
        <div className={`${namespaceClassName}-strength-bar`} />
        <span name="score" className={`${namespaceClassName}-strength-desc`} onChange={this.handleChange}>{strengthDesc}</span>
      </div>
    );
  }
}
