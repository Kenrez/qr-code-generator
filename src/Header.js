const Header = (props) => {
  return (
    <header className="App-header">
      <h1>{props.title}</h1>        
    </header>
  )
}

Header.defaultProps = {
  title:"Your Default Header Text Goes Here!"
}

export default Header;