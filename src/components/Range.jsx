import styles from './Range.module.css';

const Range = (props) => {
  const { value, min, max, step = '1', onChange } = props;
  const onRangeChange = (event) => {
    onChange(parseInt(event.target.value));
  };
  return (
    <input type="range"
           value={value} min={min} max={max} step={step}
           onChange={onRangeChange} className={styles.range} />
  );
};

export default Range;
