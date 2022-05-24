import React,{useState, useEffect} from 'react';
import Keyboard from './components/Keyboard'
import Display from './components/Display'
import reactJs from './images/React-js.png'
import './App.css';

function App() {

  /*las dos siguientes matrices tienen el objetivo de ser comprobadas mas adelante por em metodo
   find por otra funcion para saber si la tecla que se esta presionando en el teclado coincide o con operators
   osea si es un elemento de estos o si es un elemento de un numero en number matriz*/
  const operators= ["AC", "/", "*", "+", "-", "="]

  const numbers= [0,1,2,3,4,5,6,7,8,9]

  /* estos tres hooks son para representar los digitos que se teclean en el teclado y que seran renderizados en
  el comoponente display que corresponde a la pantalla de la calculadora, tenemos dos entradas en la pantalla como algunas calculadoras
  una corresponde a input y la otra a output mientras que calculator data al final sera pasado como valor a output*/ 
  const [input, setInput] = useState("0")
  const [output, setOutput] = useState("")
  const [calculatorData, setCalculatorData] = useState("")

  const handleSubmit = () => {
    console.log("handleSubmit", calculatorData)
    const total= eval(calculatorData)
      setInput(`${total}`)
      setOutput(`${total}`)
      setCalculatorData(`${total}`)
  }

  const handleClear = () => {
    setOutput("")
    setInput("0")
    setCalculatorData("")
  }

  const handleNumbers = value => {
    
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChat = calculatorData.charAt(calculatorData.length - 1);
        const isLastChatOperator =
          lastChat === "*" || operators.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  }
  
  /*handleOperator es la funcion que permite la entrada de operaciones
  en la calculadora tiene lineas decodigo que previenen que el signo de una 
  operacion de coloque sin almenos colocar un numero*/ 
  const handleOperator = (value) => {
    if (calculatorData.length) {
      setInput(`${value}`);
      const beforeLastChat = calculatorData.charAt(calculatorData.length - 2);

      const beforeLastChatIsOperator =
        operators.includes(beforeLastChat) || beforeLastChat === "*";

      const lastChat = calculatorData.charAt(calculatorData.length - 1);
      
      const lastChatIsOperator = operators.includes(lastChat) || lastChat === "*";
      /*en la siguiente linea de codigo reemplazamos la x por el signo * */ 
      const validOp = value === "x" ? "*" : value;
      if (
        /*la siguiente linea de codigo haceque al introducir dos o mas 
        operadores se ejecute la funcion del ultimo colocado
        y que si hay dos operadores y el ultimo es - se tome 
        como si el numero que viene depues es negativo*/ 
        (lastChatIsOperator && value !== "-") ||
        (beforeLastChatIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${value}`;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData(`${calculatorData.substring(0, calculatorData.length - 1)}${validOp}`);
        }
      } else {
        setCalculatorData(`${calculatorData}${validOp}`);
      }
    }
  };

  /*La funcion dotOperator es la que permite colocar el punto decimal 
  a la calculadora estableciendo  ciertas condiciones en el interior de esta
  para no generar errores de calculo como el hecho de no permitir colocar mas de un decimal
  o que el decimal se coloque sin algun numero antes de el*/ 
  const dotOperator = () => {
    const lastChat = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      /*en las proximas dos lineas de codigo cumplen la funcion
      de no permitir colocar el punto decimal sin antes colocar el cero
      cuando no hay ningun numero en el input*/ 
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(
          /*esta unica linea de codigo que sigue es importantisima, existe para 
          no permitir que el punto decimal se pueda teclear mas de una vez*/ 
          lastChat === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChat === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  }

  const handleInput = (value) => {
    const number = numbers.find((num) => num===value)
    const operator= operators.find((op) => op=== value)

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperator(value);
        break;
      default:
        break;
    }
  } 

  const handleOutput= () => {
    setOutput(calculatorData)
  }

  useEffect(() => {
    handleOutput()
  }, [calculatorData])

    console.log(calculatorData)
   return (
    <div className="container">
      <div className="title">
      <img src={reactJs} alt="react logo" 
        className="react-logo"/>
        <h1>
        React calculator by Malgein
        </h1>
      </div>
      <div className="calculator">
        <Display input={input} output={output}/>
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
}

export default App;



