//Componente Square
export const Square = ({ children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
    //Función del click que invoca a la función de aactualizar el board y ver quien posee el turno
    const handleClick = () => {
      updateBoard(index)
    }
    return (
      //Se pasa la funcion mas no se inicializa porque solo debe funcionar cuando se haga click
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }
  