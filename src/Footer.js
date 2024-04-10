const Footer = (props) => {
  return (
    <footer className="App-footer">
      <span>{props.copyright} {props.year}</span>
    </footer>
  )
}

Footer.defaultProps = {
  title:"Your Default Footer Text Goes Here!"
}

export default Footer;