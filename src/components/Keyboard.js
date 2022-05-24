import CalcData from '../data/Calc-data'
import '../App.css'

/*componente funcional que debi crarlo aparte para luego importarlo aqui
pero que de ese modo seria mas complicado que representa cada tecla y que posteriormente se usara un map en calc
data que contenga este componente para
lograr eso crear cada tecla de la calculadora*/ 
const Key= ({keyData: {id, value}, handleInput }) => (
	<button id={id} onClick={() => handleInput(value)} >
		{value}
	</button>
)

/*componente que tiene como hijo key ya definido y que correspode a todas las teclas de la calculadora*/ 
const Keyboard = ({handleInput}) => {
	return(
		<div className="keys">
			{CalcData.map((key) => (
				<Key key={key.id} keyData={key} handleInput={handleInput} />
			))}
		</div>
	)
}

export default Keyboard