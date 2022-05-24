import '../App.css'

const Display = ({input, output}) => {
  return(
		<div className="output">
			<span className="result">{output}</span>
			<span id="display" className="input">{input}</span>
		</div>
	)
}

export default Display