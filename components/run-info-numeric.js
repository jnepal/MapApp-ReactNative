import RunInfo from './run-info';

export default class RunInfoNumeric extends RunInfo {
    formatValue() {
        if (!isNaN(parseFloat(this.state.value))) {
            return [ parseFloat(this.state.value).toFixed(2), this.props.unit].join(' ');
        } else {
            return this.state.value;
        } 
        
    }
}